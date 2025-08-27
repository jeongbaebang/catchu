import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { useState } from 'react'

import { useSession } from '@/context/auth'
import { db } from '@/firebaseConfig'
import { Comment } from '@/models/post'
import { postConverter } from '@/models/postConverter'

export const useComments = (postId: string) => {
  const { user } = useSession()
  const [loading, setLoading] = useState(false)

  const addComment = async (content: string, rating: number) => {
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    if (!content.trim()) {
      throw new Error('댓글 내용을 입력해주세요')
    }

    setLoading(true)

    try {
      const newComment: Comment = {
        postId,
        author: {
          userId: user.uid,
          avatarImage: user.photoURL || '',
          name: user.displayName || 'Empty user',
        },
        content,
        rating,
        createdAt: Timestamp.now(),
      }

      const postRef = doc(db, 'posts', postId).withConverter(postConverter)

      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
        updatedAt: serverTimestamp(),
      })
    } catch {
      throw new Error('댓글 작성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return { addComment, loading }
}
