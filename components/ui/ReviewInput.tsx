import React, { useState } from 'react'
import { TextInput, View, StyleSheet, Pressable } from 'react-native'
import { IconSymbol } from './IconSymbol'

interface ReviewInputProps {
  onSubmit?: (text: string) => void
  onStarClick?: () => void
  placeholder?: string
  maxLength?: number
  backgroundColor?: string
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  onSubmit,
  onStarClick,
  placeholder = 'Write a review...',
  maxLength = 200,
  backgroundColor = '#ADAEBC',
}) => {
  const [reviewText, setReviewText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = () => {
    if (reviewText.trim().length > 0) {
      onSubmit?.(reviewText)
      setReviewText('') // 제출 후 초기화
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isFocused ? '#B8BAC9' : backgroundColor,
        },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='#6B7280'
        value={reviewText}
        onChangeText={setReviewText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.textInput}
        multiline
        textAlignVertical='center'
        maxLength={maxLength}
        returnKeyType='send'
        onSubmitEditing={handleSubmit}
      />

      <Pressable
        onPress={onStarClick}
        style={styles.iconButton}
        disabled={reviewText.trim().length === 0}
      >
        <IconSymbol
          name='star.fill'
          size={17}
          color={reviewText.trim().length > 0 ? '#F59E0B' : '#9CA3AF'}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginRight: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  iconButton: {
    padding: 4,
  },
})

export default ReviewInput
