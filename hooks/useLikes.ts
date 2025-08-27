import {
  arrayUnion,
  arrayRemove,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'

import { useSession } from '@/context/auth'
import { db } from '@/firebaseConfig'
import { postConverter } from '@/models/postConverter'
import { Alert } from 'react-native'

interface UseLikesResult {
  isLiked: boolean
  likesCount: number
  loading: boolean
  toggleLike: () => Promise<void>
}

export const useLikes = (
  postId: string | undefined,
  initialLikes: { userId: string }[] | undefined = [],
): UseLikesResult => {
  const { user } = useSession()
  const [loading, setLoading] = useState(false)
  const [likes, setLikes] = useState<{ userId: string }[]>(initialLikes)

  const isLiked = user ? likes.some(like => like.userId === user.uid) : false
  const likesCount = likes.length

  useEffect(() => {
    setLikes(initialLikes)
  }, [initialLikes])

  const toggleLike = async () => {
    if (!user) {
      Alert.alert('로그인 필요', '좋아요를 누르려면 로그인이 필요합니다.')

      return
    }

    if (!postId || loading) return

    setLoading(true)

    try {
      const postRef = doc(db, 'posts', postId).withConverter(postConverter)
      const likeObject = { userId: user.uid }

      if (isLiked) {
        // 좋아요 취소
        await updateDoc(postRef, {
          likes: arrayRemove(likeObject),
          updatedAt: serverTimestamp(),
        })

        setLikes(prev => prev.filter(like => like.userId !== user.uid))
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(likeObject),
          updatedAt: serverTimestamp(),
        })

        // 로컬 상태 즉시 업데이트 (낙관적 업데이트)
        setLikes(prev => [...prev, likeObject])
      }
    } catch {
      throw new Error('좋아요 처리에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return { isLiked, likesCount, loading, toggleLike }
}
