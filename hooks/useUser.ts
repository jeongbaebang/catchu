import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import { User } from '@/models/user'
import { db } from '@/firebaseConfig'

interface UseUserResult {
  user: User | null
  loading: boolean
  error: string | null
}

export const useUser = (userId: string): UseUserResult => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setUser(null)
      setLoading(false)
      setError(null)
      return
    }

    const fetchUser = async () => {
      setLoading(true)
      setError(null)

      try {
        const userDoc = await getDoc(doc(db, 'users', userId))

        if (userDoc.exists()) {
          setUser(userDoc.data() as User)
        } else {
          setUser(null)
          setError('사용자를 찾을 수 없습니다.')
        }
      } catch {
        setError('사용자 정보를 가져오는데 실패했습니다.')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  return { user, loading, error }
}
