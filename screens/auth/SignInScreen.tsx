import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'

import { AuthScreen } from '@/components'
import { useSession } from '@/context/auth'

const SignInScreen = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const { signIn } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('오류', '이메일과 비밀번호를 모두 입력해주세요.')
      return
    }

    setLoading(true)

    try {
      await signIn(email, password)
      Alert.alert('환영합니다', '로그인에 성공하였습니다.', [
        {
          text: '확인',
          onPress: () => {
            router.dismissAll()
            router.replace('/')
          },
        },
      ])
    } catch (error: any) {
      Alert.alert('로그인 실패', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = () => {
    router.push('/sign-up')
  }

  const inputFields = [
    {
      placeholder: 'Email',
      value: email,
      onChangeText: setEmail,
      keyboardType: 'email-address' as const,
      returnKeyType: 'next' as const,
    },
    {
      placeholder: 'Password',
      value: password,
      onChangeText: setPassword,
      secureTextEntry: false,
      returnKeyType: 'done' as const,
    },
  ]

  const isFormValid = email.trim() && password.trim()

  return (
    <AuthScreen
      title='Welcome to CATCH U'
      subtitle='쇼핑을 Play하다! 신개념 명품 플랫폼'
      inputFields={inputFields}
      primaryButtonText={loading ? '로그인 중...' : 'Sign In'}
      primaryButtonAction={handleSignIn}
      isPrimaryButtonDisabled={!isFormValid}
      secondaryText="Don't have an account?"
      secondaryLinkText='Sign Up'
      secondaryLinkAction={handleSignUp}
    />
  )
}

export { SignInScreen }
