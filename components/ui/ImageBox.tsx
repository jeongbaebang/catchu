import React from 'react'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import { IconSymbol } from '@/components/ui/IconSymbol'

interface ImageBoxProps {
  isLiked: boolean
  productImage: any
  onLike?: () => void
  height?: number
  safeArea?: boolean
  showAnimate?: boolean
  offset?: number
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  productImage,
  onLike,
  showAnimate,
  isLiked,
  height = 320,
  safeArea,
  offset = 0,
}) => {
  const insets = useSafeAreaInsets()
  const buttonOffset = 12 + offset

  // 애니메이션 상태값
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  const handleLike = () => {
    onLike?.()

    if (showAnimate && !isLiked) {
      scale.value = 0
      opacity.value = 1

      scale.value = withSpring(1.2, { damping: 6 }, () => {
        scale.value = withSpring(1)
        opacity.value = withTiming(0, { duration: 250 })
      })
    }
  }

  return (
    <View style={styles.contentContainer}>
      <Image
        source={productImage}
        style={[{ minHeight: height }, styles.productImage]}
      />

      {/* 중앙 하트 애니메이션 */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: '20%',
            left: '20%',
          },
          animatedStyle,
        ]}
      >
        <IconSymbol name='heart.fill' size={300} color={'#FF6B6B'} />
      </Animated.View>

      {/* 작은 버튼 */}
      <Pressable
        style={[
          { top: safeArea ? buttonOffset + insets.top : buttonOffset },
          styles.heartButton,
        ]}
        onPress={handleLike}
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
