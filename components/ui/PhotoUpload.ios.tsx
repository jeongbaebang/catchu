import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  ActionSheetIOS,
} from 'react-native'
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
  borderRadius = 16,
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
        [{ text: '알겠습니다.' }],
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
      selectionLimit: 1,
    })

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri
      setSelectedImage(imageUri)
      onImageSelected?.(imageUri)
    }
  }

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        '카메라 액세스 필요',
        '사진을 촬영하기 위해 카메라 액세스를 허용해 주시기 바랍니다.',
        [{ text: '알겠습니다.' }],
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
    }
  }

  const showImageOptions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['취소', '사진 촬영', '앨범에서 선택'],
        cancelButtonIndex: 0,
        title: '이미지 추가',
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          takePhoto()
        } else if (buttonIndex === 2) {
          pickImageFromLibrary()
        }
      },
    )
  }

  const showImageActions = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['취소', '사진 재촬영', '사진 제거'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
        title: 'Photo Options',
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          showImageOptions()
        } else if (buttonIndex === 2) {
          removeImage()
        }
      },
    )
  }

  const removeImage = () => {
    setSelectedImage(null)
    onImageRemoved?.()
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
            <IconSymbol name='pencil' size={14} color='#FFFFFF' />
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
    >
      <View style={styles.iconContainer}>
        <IconSymbol name='plus.circle' size={32} color={mainColor} />
      </View>
      <ThemedText style={styles.addPhotoText}>Add Photo</ThemedText>
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
    borderStyle: 'dotted',
    gap: 8,
  },
  iconContainer: {
    marginBottom: 4,
  },
  addPhotoText: {
    fontSize: 15,
    color: mainColor,
    fontWeight: '500',
    letterSpacing: -0.24,
  },
  imageContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedImage: {
    backgroundColor: '#454A52',
  },
  overlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  editButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
})

export { PhotoUpload }
