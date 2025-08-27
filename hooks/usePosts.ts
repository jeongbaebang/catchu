import { useEffect, useState } from 'react'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'

import { Post } from '@/models/post'
import { db } from '@/firebaseConfig'
import { postConverter } from '@/models/postConverter'
import { User } from '@/models/user'
import { delay } from '@/utils/delay'

export type PostWithAuthor = Post & {
  author: Pick<User, 'name' | 'avatarImage'>
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>()

  useEffect(() => {
    const ref = collection(db, 'posts').withConverter(postConverter)
    const unsubscribe = onSnapshot(
      query(ref, orderBy('createdAt', 'desc')),

      async snapshot => {
        const rawPosts = snapshot.docs.map(doc => ({
          ...doc.data(),
        }))

        const postsWithAuthors = await Promise.all(
          rawPosts.map(async post => {
            const userDoc = await getDoc(doc(db, 'users', post.authorId))

            if (userDoc.exists()) {
              const userData = userDoc.data({
                serverTimestamps: 'estimate',
              }) as User

              return {
                ...post,
                author: {
                  name: userData.name,
                  avatarImage: userData.avatarImage,
                },
              }
            } else {
              // 사용자 정보가 없을 경우 기본값
              return {
                ...post,
                author: {
                  name: '알 수 없는 사용자',
                  avatarImage: '',
                },
              }
            }
          }),
        )

        // UX 지연 효과 처리 1.5초
        await delay(1500)
        setPosts(postsWithAuthors)
      },
    )

    return () => unsubscribe()
  }, [])

  return posts
}

export const usePostDetail = (id: string | string[] | null) => {
  const [post, setPost] = useState<PostWithAuthor | null>(null)

  useEffect(() => {
    if (!id) {
      setPost(null)
      return
    }

    const postId = Array.isArray(id) ? id[0] : id
    const docRef = doc(db, 'posts', postId).withConverter(postConverter)

    const unsubscribe = onSnapshot(docRef, async snapshot => {
      if (snapshot.exists()) {
        const rawPost = snapshot.data()

        try {
          const userDoc = await getDoc(doc(db, 'users', rawPost.authorId))

          if (userDoc.exists()) {
            const userData = userDoc.data()

            setPost({
              ...rawPost,
              author: {
                name: userData.name,
                avatarImage: userData.avatarImage,
              },
            })
          } else {
            // 사용자 정보가 없을 경우 기본값
            setPost({
              ...rawPost,
              author: {
                name: '알 수 없는 사용자',
                avatarImage: '',
              },
            })
          }
        } catch {
          setPost({
            ...rawPost,
            author: {
              name: '로드 실패',
              avatarImage: '',
            },
          })
        }
      } else {
        setPost(null)
      }
    })

    return () => unsubscribe()
  }, [id])

  return post
}
