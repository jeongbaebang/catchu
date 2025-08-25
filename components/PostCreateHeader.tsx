import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import IconButton from './ui/IconButton'

const POST_DETAIL_HEADER_HEIGHT = 64
const mainColor = '#F8F9FA'

export const PostCreateHeader = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <IconButton
          icon='arrow.left'
          iconColor={mainColor}
          size={24}
          onPress={() => router.back()}
        />
      </View>
      <View style={styles.rightSection}>
        <IconButton
          icon='ellipsis'
          iconColor={mainColor}
          size={24}
          onPress={() => {}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: POST_DETAIL_HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#4A5568',
  },
  leftSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
})
