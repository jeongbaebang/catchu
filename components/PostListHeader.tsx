import { View, StyleSheet } from 'react-native'
import React from 'react'

import IconButton from './ui/IconButton'
import { ThemedText } from './ThemedText'
import { mainColor } from '@/constants/colors'

export const POST_LIST_HEADER_HEIGHT = 64

export const PostListHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <IconButton
          icon='bag.circle.fill'
          iconColor={mainColor}
          size={32}
          onPress={() => {}}
        />
        <ThemedText type='subtitle' style={styles.brandText}>
          CATCH U
        </ThemedText>
      </View>
      <View style={styles.rightSection}>
        <IconButton
          icon='magnifyingglass'
          iconColor={mainColor}
          size={24}
          onPress={() => {}}
        />
        <IconButton
          icon='bell.fill'
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
    minHeight: POST_LIST_HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    // backgroundColor: 'pink',
  },
  leftSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  brandText: {
    fontFamily: 'CormorantGaramondSemiBold',
  },
})
