import React, { useState } from 'react'
import { TextInput, View, StyleSheet, Pressable, Modal } from 'react-native'
import { IconSymbol } from './IconSymbol'
import { ThemedText } from '../ThemedText'
import { StarReviewButton } from './StarRating'

// ReviewInput 컴포넌트 - 내부 상태 최소화
interface ReviewInputProps {
  value: { reviewText: string; rating: number }
  onChange: (payload: { reviewText: string; rating: number }) => void
  onSubmit?: (payload: { reviewText: string; rating: number }) => void
  placeholder?: string
  maxLength?: number
  backgroundColor?: string
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Write a review...',
  maxLength = 200,
  backgroundColor = '#ADAEBC',
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const handleStarClick = () => {
    setIsModalVisible(true)
  }

  const handleSubmit = () => {
    if (value.reviewText.trim().length > 0) {
      onSubmit?.(value)
    }
  }

  const handleChangeText = (reviewText: string) => {
    onChange({ ...value, reviewText })
  }

  const handleChangeRating = (rating: number) => {
    onChange({ ...value, rating })
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isFocused ? '#B8BAC9' : backgroundColor },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='#6B7280'
        value={value.reviewText}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.textInput}
        multiline
        textAlignVertical='center'
        maxLength={maxLength}
        onSubmitEditing={handleSubmit}
      />

      <Pressable
        onPress={handleStarClick}
        style={styles.iconButton}
        disabled={value.reviewText.trim().length === 0}
      >
        <IconSymbol
          name='star.fill'
          color={value.reviewText.trim().length > 0 ? '#F59E0B' : '#9CA3AF'}
        />
      </Pressable>

      <Modal animationType='slide' transparent={true} visible={isModalVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>상품 평가</ThemedText>
            <Pressable onPress={onModalClose}>
              <IconSymbol name='xmark' size={22} color={'#9CA3AF'} />
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <StarReviewButton
              size={56}
              rating={value.rating}
              onRatingChange={handleChangeRating}
            />
          </View>
        </View>
      </Modal>
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
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
})

export default ReviewInput
