import { useSession } from '@/context/auth'
import { useRouter } from 'expo-router'

export const useAuthAction = () => {
  const router = useRouter()
  const { user } = useSession()

  const executeWithAuth = (action: () => void) => {
    if (!user) {
      router.push('/sign-in')
      return false
    }
    action()
    return true
  }

  return { executeWithAuth, isAuthenticated: !!user }
}
