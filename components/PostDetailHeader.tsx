import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import IconButton from './ui/IconButton'

const POST_DETAIL_HEADER_HEIGHT = 64
const mainColor = '#F8F9FA'

export const PostDetailHeader = ({ offset }: { offset: number }) => {
  const router = useRouter()

  return (
    <View style={[styles.container, { top: offset }]}>
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
          icon='square.and.arrow.up.fill'
          iconColor={mainColor}
          size={24}
          onPress={() => {}}
        />
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
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    minHeight: POST_DETAIL_HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
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
