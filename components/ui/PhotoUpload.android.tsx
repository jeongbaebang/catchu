import React, { useState } from 'react'
import { View, StyleSheet, Pressable, Alert, ToastAndroid } from 'react-native'
import { Image } from 'expo-image'
import * as ImagePicker from 'expo-image-picker'

import { IconSymbol } from './IconSymbol'
import { ThemedText } from '../ThemedText'
import { mainColor } from '@/constants/colors'

interface PhotoUploadProps {
  onImageSelected?: (imageUri: string) => void
  onImageRemoved?: () => void
  initialImage?: string
  width?: number
  height?: number
  borderRadius?: number
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onImageSelected,
  onImageRemoved,
  initialImage,
  width = 120,
  height = 120,
  borderRadius = 8,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialImage || null,
  )

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        '사진 접근 권한 필요',
        '사진 라이브러리에 액세스 권한을 허용해 주시기 바랍니다. \n 이미지를 업로드하기 위해 필요합니다.',
        [
          { text: '취소', style: 'cancel' },
          { text: '권한 요청', onPress: () => requestPermission() },
        ],
      )
      return false
    }
    return true
  }

  const pickImageFromLibrary = async () => {
    const hasPermission = await requestPermission()
    if (!hasPermission) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri
      setSelectedImage(imageUri)
      onImageSelected?.(imageUri)
      ToastAndroid.show('Photo added successfully', ToastAndroid.SHORT)
    }
  }

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        '카메라 액세스 필요',
        '사진을 촬영하기 위해 카메라 액세스를 허용해 주시기 바랍니다.',
        [{ text: '취소', style: 'cancel' }, { text: '권한 요청' }],
      )
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri
      setSelectedImage(imageUri)
      onImageSelected?.(imageUri)
      ToastAndroid.show('사진이 촬영되었습니다.', ToastAndroid.SHORT)
    }
  }

  const showImageOptions = () => {
    Alert.alert(
      'Photo',
      '사진 옵션을 선택해주세요.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '사진 촬영',
          onPress: takePhoto,
          style: 'default',
        },
        {
          text: '앨범에서 선택',
          onPress: pickImageFromLibrary,
          style: 'default',
        },
      ],
      { cancelable: true },
    )
  }

  const showImageActions = () => {
    Alert.alert(
      'Photo Options',
      '사진 옵션을 선택해주세요.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '사진 재촬영',
          onPress: showImageOptions,
          style: 'default',
        },
        {
          text: '사진 제거',
          onPress: removeImage,
          style: 'destructive',
        },
      ],
      { cancelable: true },
    )
  }

  const removeImage = () => {
    setSelectedImage(null)
    onImageRemoved?.()
    ToastAndroid.show('사진이 삭제되었습니다.', ToastAndroid.SHORT)
  }

  if (selectedImage) {
    return (
      <Pressable
        style={[
          styles.imageContainer,
          {
            width,
            height,
            borderRadius,
          },
        ]}
        onPress={showImageActions}
        android_ripple={{
          color: 'rgba(0, 0, 0, 0.1)',
          borderless: false,
          radius: Math.max(width, height) / 2,
        }}
      >
        <Image
          source={{ uri: selectedImage }}
          style={[
            styles.selectedImage,
            {
              width,
              height,
              borderRadius,
            },
          ]}
          contentFit='cover'
        />
        <View style={styles.overlay}>
          <View style={styles.editButton}>
            <IconSymbol name='pencil' size={16} color='#FFFFFF' />
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <Pressable
      style={[
        styles.addPhotoContainer,
        {
          width,
          height,
          borderRadius,
        },
      ]}
      onPress={showImageOptions}
      android_ripple={{
        color: 'rgba(33, 150, 243, 0.1)',
        borderless: false,
        radius: Math.max(width, height) / 2,
      }}
    >
      <View style={styles.iconContainer}>
        <IconSymbol name='plus.circle' size={28} color={mainColor} />
      </View>
      <ThemedText style={styles.addPhotoText}>ADD PHOTO</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  addPhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#454A52',
    borderWidth: 2,
    borderColor: '#5D636A',
    borderStyle: 'dashed',
    gap: 6,
    elevation: 1,
  },
  iconContainer: {
    marginBottom: 2,
  },
  addPhotoText: {
    fontSize: 12,
    color: mainColor,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  imageContainer: {
    position: 'relative',
    elevation: 3,
    backgroundColor: '#454A52',
  },
  selectedImage: {
    backgroundColor: '#454A52',
  },
  overlay: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
})

export { PhotoUpload }
