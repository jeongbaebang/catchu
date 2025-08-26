import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import { Post } from '@/models/post'
import { db } from '@/firebaseConfig'
import { postConverter } from '@/models/postConverter'

//  TODO: 타입 분리하기
export type PostWithAuthor = Post & {
  author: {
    name: string
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<PostWithAuthor[]>([])

  useEffect(() => {
    const ref = collection(db, 'posts').withConverter(postConverter)
    const q = query(ref, orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, async snapshot => {
      const rawPosts = snapshot.docs.map(doc => ({
        ...doc.data(),
        postId: doc.id,
      }))

      // TODO: 각 post.authorId 기준으로 users에서 추가 데이터 가져오기
      const postsWithAuthors = rawPosts.map(post => ({
        ...post,
        author: {
          name: 'Lily',
        },
      }))

      setPosts(postsWithAuthors)
    })

    return () => unsubscribe()
  }, [])

  return posts
}
