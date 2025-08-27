import { Button, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

import { ThemedText, ThemedView } from '@/components'
import { useSession } from '@/context/auth'
import { mainColor } from '@/constants/colors'

export const UserProfile = () => {
  const router = useRouter()
  const { user, logOut } = useSession()

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>비로그인 상태</ThemedText>
        <Button title='로그인' onPress={() => router.push('/sign-in')} />
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>사용자 정보</ThemedText>
      <Image source={user.photoURL} style={styles.avatar} />
      <ThemedText style={styles.name}>{user.displayName}</ThemedText>
      <ThemedText style={styles.email}>{user.email}</ThemedText>
      <Button title='로그아웃' onPress={logOut} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 250,
    borderWidth: 2,
    borderColor: mainColor,
  },
  name: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 16,
  },
})
