import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'

import {
  PhotoUpload,
  PostCreateHeader,
  ThemedText,
  ThemedView,
} from '@/components'
import { tintColorDark } from '@/constants/colors'
import { db } from '@/firebaseConfig'
import { Post } from '@/models/post'
import { postConverter } from '@/models/postConverter'

interface FormData {
  images: string[]
  title: string
  description: string
  price: string
}

const CreatePostScreen = () => {
  const insets = useSafeAreaInsets()
  const [formData, setFormData] = useState<FormData>({
    images: [],
    title: '',
    description: '',
    price: '',
  })
  const [isSubmit, setSubmitStatus] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleImageSelected = (imageUri: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, imageUri],
    }))
  }

  const handleImageRemoved = () => {
    setFormData(prev => ({
      ...prev,
      images: [],
    }))
  }

  const handleSubmit = async () => {
    if (isSubmit) return

    try {
      setSubmitStatus(true)

      const ref = collection(db, 'posts').withConverter(postConverter)
      const newPost: Omit<Post, 'postId'> = {
        images: formData.images[0],
        title: formData.title,
        description: formData.description,
        price: formData.price,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
        authorId: 'empty',
        likes: [],
        comments: [],
      }

      await addDoc(ref, newPost)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      setSubmitStatus(false)
    }
  }

  const isFormValid =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.price.trim() &&
    formData.images.length > 0

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom:
            Platform.OS === 'ios'
              ? insets.bottom + (insets.top + (insets.bottom > 0 ? 0 : 16))
              : -insets.bottom,
        },
      ]}
    >
      <PostCreateHeader />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Product Images Section */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>
                Product Images
              </ThemedText>
              <View style={styles.imageUploadContainer}>
                <PhotoUpload
                  width={390}
                  height={320}
                  onImageSelected={handleImageSelected}
                  onImageRemoved={handleImageRemoved}
                />
              </View>
            </View>
            {/* Title Section */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Title</ThemedText>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'title' && styles.inputContainerFocused,
                ]}
              >
                <TextInput
                  placeholder='Enter product title'
                  placeholderTextColor='#6B7280'
                  value={formData.title}
                  onChangeText={text =>
                    setFormData(prev => ({ ...prev, title: text }))
                  }
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.textInput}
                  maxLength={100}
                  returnKeyType='next'
                />
              </View>
            </View>
            {/* Description Section */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Description</ThemedText>
              <View
                style={[
                  styles.inputContainer,
                  styles.descriptionContainer,
                  focusedField === 'description' &&
                    styles.inputContainerFocused,
                ]}
              >
                <TextInput
                  placeholder='Describe your product...'
                  placeholderTextColor='#6B7280'
                  value={formData.description}
                  onChangeText={text =>
                    setFormData(prev => ({ ...prev, description: text }))
                  }
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  style={[styles.textInput, styles.descriptionInput]}
                  multiline
                  textAlignVertical='top'
                  maxLength={500}
                  numberOfLines={4}
                />
              </View>
            </View>

            {/* Price Section */}
            <View style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Price</ThemedText>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'price' && styles.inputContainerFocused,
                ]}
              >
                <TextInput
                  placeholder='0'
                  placeholderTextColor='#6B7280'
                  value={formData.price}
                  onChangeText={text => {
                    // 숫자와 쉼표만 허용
                    const numericValue = text.replace(/[^0-9]/g, '')
                    const formattedValue = numericValue.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    )
                    setFormData(prev => ({ ...prev, price: formattedValue }))
                  }}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField(null)}
                  style={styles.textInput}
                  keyboardType='numeric'
                  returnKeyType='done'
                />
                <ThemedText style={styles.currencyText}>원</ThemedText>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* Submit Button */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={[
            styles.submitButton,
            isFormValid
              ? styles.submitButtonActive
              : styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || isSubmit}
        >
          <ThemedText
            style={[
              styles.submitButtonText,
              isFormValid
                ? styles.submitButtonTextActive
                : styles.submitButtonTextDisabled,
            ]}
          >
            {isSubmit ? '게시물 생성중...' : '게시물 생성'}
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  imageUploadContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputContainerFocused: {
    backgroundColor: '#F3F4F6',
    borderColor: tintColorDark,
  },
  descriptionContainer: {
    minHeight: 120,
    alignItems: 'flex-start',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  descriptionInput: {
    textAlignVertical: 'top',
    paddingTop: 0,
    height: '100%',
  },
  currencyText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 8,
  },
  bottomContainer: {
    minHeight: 89,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    borderRadius: 12,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonActive: {
    backgroundColor: tintColorDark,
  },
  submitButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextActive: {
    color: '#FFFFFF',
  },
  submitButtonTextDisabled: {
    color: '#9CA3AF',
  },
})

export { CreatePostScreen }
