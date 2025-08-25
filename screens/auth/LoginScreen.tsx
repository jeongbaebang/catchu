import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'

import { AuthScreen } from '@/components'

const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const handleSignIn = () => {
    console.log('Sign In:', { email, password })
    // 로그인 로직 구현
  }

  const handleSignUp = () => {}

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
      secureTextEntry: true,
      returnKeyType: 'done' as const,
    },
  ]

  const isFormValid = email.trim() && password.trim()

  return (
    <AuthScreen
      title='Welcome to CATCH U'
      subtitle='쇼핑을 Play하다! 신개념 명품 플랫폼'
      inputFields={inputFields}
      primaryButtonText='Sign In'
      primaryButtonAction={handleSignIn}
      isPrimaryButtonDisabled={!isFormValid}
      secondaryText="Don't have an account?"
      secondaryLinkText='Sign Up'
      secondaryLinkAction={handleSignUp}
    />
  )
}

export { LoginScreen }
