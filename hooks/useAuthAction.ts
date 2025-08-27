import { useSession } from '@/context/auth'
import { useRouter } from 'expo-router'

export const useAuthAction = () => {
  const router = useRouter()
  const { user, isLoading } = useSession()

  const executeWithAuth = (action: () => void) => {
    if (!isLoading && !user) {
      router.replace('/sign-in')

      return false
    }
    action()
    return true
  }

  return { executeWithAuth, isAuthenticated: !!user }
}
