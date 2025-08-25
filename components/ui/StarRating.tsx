import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { IconSymbol } from './IconSymbol'

interface StarRatingProps {
  rating: number
  count?: number
  size?: number
  color?: string
  showRating: boolean
  textColor?: string
}

const MAT_STARS = 5

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  count = 0,
  size = 20,
  color = '#EAB308',
  showRating = true,
  textColor = '#9CA3AF',
}) => {
  const renderStars = () => {
    const stars = []

    for (let i = 1; i <= MAT_STARS; i++) {
      // 현재 별(i번째)이 완전히 채워져야 하는지 확인
      // 예: rating이 4.2일 때, i가 1,2,3,4이면 true (완전히 채워짐)
      const isFilled = i <= Math.floor(rating) // Math.floor(4.2) = 4

      // 현재 별이 반만 채워져야 하는지 확인
      // 예: rating이 4.2일 때, i가 5이면서 소수점이 있으면 true (반만 채워짐)
      const isHalf = i === Math.ceil(rating) && rating % 1 !== 0 // Math.ceil(4.2) = 5, 4.2 % 1 = 0.2 (≠ 0)

      stars.push(
        <IconSymbol
          key={i}
          size={size}
          name={
            isFilled ? 'star.fill' : isHalf ? 'star.leadinghalf.filled' : 'star'
          }
          color={color}
        />,
      )
    }

    return stars
  }

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>{renderStars()}</View>
      {showRating && (
        <ThemedText style={{ fontSize: 14, color: textColor }}>
          ({count})
        </ThemedText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
})
