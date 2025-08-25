import React from 'react'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { IconSymbol } from '@/components/ui/IconSymbol'

interface ImageBoxProps {
  isLiked: boolean
  productImage: any
  onLike?: () => void
  height?: number
  safeArea?: boolean
  offset?: number
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  productImage,
  onLike,
  isLiked,
  height = 320,
  safeArea,
  offset = 0,
}) => {
  const insets = useSafeAreaInsets()
  const buttonOffset = 12 + offset

  return (
    <View style={styles.contentContainer}>
      <Image
        source={productImage}
        style={[{ minHeight: height }, styles.productImage]}
      />
      <Pressable
        style={[
          { top: safeArea ? buttonOffset + insets.top : buttonOffset },
          styles.heartButton,
        ]}
        onPress={onLike}
      >
        <IconSymbol
          name={isLiked ? 'heart.fill' : 'heart'}
          size={20}
          color={isLiked ? '#FF6B6B' : '#7F62E6'}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
  },
  heartButton: {
    position: 'absolute',
    right: 12,
    backgroundColor: '#ffffffcc',
    padding: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
})
