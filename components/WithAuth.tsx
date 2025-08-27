import { useEffect, ComponentType } from 'react'

import { useSession } from '@/context/auth'
import { ThemedText } from './ThemedText'
import { router } from 'expo-router'

interface WithAuthProps {
  [key: string]: unknown
}

export const WithAuth = <P extends WithAuthProps>(
  Component: ComponentType<P>,
) => {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useSession()

    useEffect(() => {
      if (!isLoading && !user) {
        router.navigate('/sign-in')
      }
    }, [user, isLoading])

    if (isLoading) {
      return <ThemedText>Loading...</ThemedText>
    }

    if (!user) {
      // redirect 중이면 임시 로딩 표시
      return <ThemedText>Redirecting...</ThemedText>
    }

    return <Component {...props} />
  }
}
