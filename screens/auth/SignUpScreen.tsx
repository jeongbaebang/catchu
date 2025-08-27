import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'

import { AuthScreen } from '@/components'
import { useSession } from '@/context/auth'
import { Alert } from 'react-native'

const SignUpScreen = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const { signUp } = useSession()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')

      return
    }

    setLoading(true)

    try {
      await signUp(email, password, name)
      Alert.alert('가입 완료!', '회원가입이 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            router.dismissAll()
            router.replace('/')
          },
        },
      ])
    } catch (error: any) {
      Alert.alert('회원가입 실패', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  const inputFields = [
    {
      placeholder: 'Name',
      value: name,
      onChangeText: setName,
      returnKeyType: 'next' as const,
    },
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
      returnKeyType: 'next' as const,
    },
    {
      placeholder: 'Confirm Password',
      value: confirmPassword,
      onChangeText: setConfirmPassword,
      secureTextEntry: false,
      returnKeyType: 'done' as const,
    },
  ]

  const isFormValid = email.trim() && password.trim() && confirmPassword.trim()

  return (
    <AuthScreen
      title='Join CATCH U'
      subtitle='새로운 쇼핑의 경험을 시작하세요'
      inputFields={inputFields}
      primaryButtonText={loading ? '처리중...' : 'Sign Up'}
      primaryButtonAction={handleSignUp}
      isPrimaryButtonDisabled={!isFormValid}
      secondaryText='Already have an account?'
      secondaryLinkText='Sign In'
      secondaryLinkAction={handleSignIn}
    />
  )
}

export { SignUpScreen }
