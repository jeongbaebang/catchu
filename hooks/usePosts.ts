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

//  TODO: 타입 분리하기
export type PostWithAuthor = Post & {
  author: {
    name: string
  }
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])

  useEffect(() => {
    const ref = collection(db, 'posts').withConverter(postConverter)
    const unsubscribe = onSnapshot(
      query(ref, orderBy('createdAt', 'desc')),
      async snapshot => {
        const rawPosts = snapshot.docs.map(doc => ({
          ...doc.data(),
        }))

        // TODO: 각 post.authorId 기준으로 users에서 추가 데이터 가져오기
        const postsWithAuthors = rawPosts.map(post => ({
          ...post,
          author: {
            name: 'Lily',
          },
        }))

        setPosts(postsWithAuthors)
      },
    )

    return () => unsubscribe()
  }, [])

  return posts
}

export const usePostDetail = (id: string | string[] | null) => {
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (!id) {
      setPost(null)

      return
    }

    const postId = Array.isArray(id) ? id[0] : id
    const docRef = doc(db, 'posts', postId).withConverter(postConverter)

    const unsubscribe = onSnapshot(docRef, snapshot => {
      if (snapshot.exists()) {
        setPost(snapshot.data())
      } else {
        setPost(null)
      }
    })

    return () => unsubscribe()
  }, [id])

  return post
}
