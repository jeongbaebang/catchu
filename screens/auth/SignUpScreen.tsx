import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'

import { AuthScreen } from '@/components'

const SignUpScreen = () => {
  const navigation = useNavigation()

  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')

      return
    }

    console.log('Sign Up:', { email, password })
  }

  const handleSignIn = () => {}

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
      primaryButtonText='Sign Up'
      primaryButtonAction={handleSignUp}
      isPrimaryButtonDisabled={!isFormValid}
      secondaryText='Already have an account?'
      secondaryLinkText='Sign In'
      secondaryLinkAction={handleSignIn}
    />
  )
}

export { SignUpScreen }
