import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'

import { User } from '@/models/user'
import { auth, db } from '@/firebaseConfig'
import { defaultUserImage } from '@/constants/mock'

interface AuthContextType {
  user: FirebaseUser | null
  userProfile: User | null
  isLoading: boolean
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useSession() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }
  return context
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      setUser(firebaseUser)

      if (firebaseUser) {
        // Firestore에서 사용자 프로필 로드
        await loadUserProfile(firebaseUser.uid)
      } else {
        setUserProfile(null)
      }

      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))

      if (userDoc.exists()) {
        setUserProfile(userDoc.data() as User)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('프로필 로드 실패:', error)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const firebaseUser = userCredential.user

      await updateProfile(firebaseUser, {
        photoURL: defaultUserImage,
        displayName: name,
      })

      const userProfile: User = {
        userId: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName || '',
        avatarImage: firebaseUser.photoURL || '',
        createdAt: serverTimestamp() as Timestamp,
        likes: [],
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), userProfile)
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code))
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code))
    }
  }

  const logOut = async () => {
    try {
      await signOut(auth)
      setUserProfile(null)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로그아웃 실패:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        signUp,
        signIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function getErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.'
    case 'auth/weak-password':
      return '비밀번호는 최소 6자 이상이어야 합니다.'
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 형식입니다.'
    case 'auth/user-not-found':
      return '존재하지 않는 계정입니다.'
    case 'auth/wrong-password':
      return '비밀번호가 일치하지 않습니다.'
    default:
      return '오류가 발생했습니다. 다시 시도해주세요.'
  }
}
