import React from 'react'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { ThemedText } from './ThemedText'
import { mainColor } from '@/constants/colors'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { ImageBox } from './ui/ImageBox'

interface PostItemProps {
  // 사용자 정보
  user: {
    name: string
    avatar: string
    timeAgo: string
  }
  // 제품 정보
  price: string
  productImage: any
  description: string
  storeUrl?: string
  // 상호작용 데이터
  likes: number
  comments: number
  isLiked?: boolean
  // 핸들러
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  onViewStore?: () => void
}

const PostItem: React.FC<PostItemProps> = ({
  user,
  price,
  productImage,
  description,
  likes,
  comments,
  isLiked = false,
  onLike,
  onComment,
  onShare,
  onViewStore,
}) => {
  return (
    <View>
      {/* 아이템 헤더 */}
      <View style={styles.itemHeader}>
        <View style={styles.userInfo}>
          <Image source={user.avatar} style={styles.avatar} />
          <View>
            <ThemedText style={styles.userName}>{user.name}</ThemedText>
            <ThemedText style={styles.timeAgo}>{user.timeAgo}</ThemedText>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
      {/* 아이템 콘텐츠 */}
      <ImageBox productImage={productImage} isLiked={isLiked} onLike={onLike} />
      {/* 아이템 하단 */}
      <View style={styles.bottomSection}>
        <View style={styles.actionRow}>
          <Pressable style={styles.actionButton} onPress={onLike}>
            <IconSymbol
              size={16}
              name='heart.fill'
              color={isLiked ? '#FF6B6B' : '#F8F9FA'}
            />
            <ThemedText style={styles.actionText}>{likes}</ThemedText>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={onComment}>
            <IconSymbol size={16} name='message.fill' color={'#F8F9FA'} />
            <ThemedText style={styles.actionText}>{comments}</ThemedText>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={onShare}>
            <IconSymbol
              size={16}
              name='square.and.arrow.up.fill'
              color={'#F8F9FA'}
            />
            <ThemedText style={styles.actionText}>share</ThemedText>
          </Pressable>
        </View>
        <View>
          <ThemedText style={styles.descriptionText}>{description}</ThemedText>
        </View>
        <Pressable style={styles.viewStoreButton} onPress={onViewStore}>
          <ThemedText style={styles.viewStoreText}>View in Store</ThemedText>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemHeader: {
    flexDirection: 'row',
    minHeight: 64,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#4A5568',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: mainColor,
    borderRadius: 20,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  timeAgo: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  priceContainer: {
    backgroundColor: '#7F62E6',
    padding: 6,
    borderRadius: 10,
  },
  priceText: {
    color: '#FFFFFFE6',
    fontSize: 12,
  },

  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 23,
  },
  viewStoreButton: {
    alignSelf: 'flex-start',
  },
  viewStoreText: {
    fontWeight: '500',
    color: '#9C88F0',
  },
})

export { PostItem }
