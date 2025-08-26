import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'

import {
  ImageBox,
  PostDetailHeader,
  StarRating,
  ThemedText,
  ThemedView,
} from '@/components'
import { mainColor, tintColorDark } from '@/constants/colors'
import { IconSymbol } from '@/components/ui/IconSymbol'
import ReviewInput from '@/components/ui/ReviewInput'
import { avatarImages } from '@/constants/mock'
import { usePostDetail } from '@/hooks/usePosts'
import { calcAverageRating } from '@/utils/calcAverageRating'

const PostDetailScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const { id } = useLocalSearchParams()
  const post = usePostDetail(id)

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  }, [navigation])

  if (!post) {
    return (
      <ThemedView style={styles.mainContainer}>
        <View style={[styles.statusBarBlur, { height: insets.top + 64 }]}>
          <BlurView
            intensity={10}
            tint='default'
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <PostDetailHeader offset={insets.top} />
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>
            Loading...
          </ThemedText>
        </View>
      </ThemedView>
    )
  }

  return (
    <ThemedView style={styles.mainContainer}>
      <View style={[styles.statusBarBlur, { height: insets.top + 64 }]}>
        <BlurView
          intensity={10}
          tint='default'
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <PostDetailHeader offset={insets.top} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView>
          {/* 상세 아이템 섹션 */}
          <ImageBox
            safeArea
            productImage={post.images}
            isLiked
            onLike={() => {}}
            offset={64}
            height={390 + insets.top}
          />
          <View style={styles.container}>
            <View style={styles.priceSection}>
              <ThemedText style={styles.priceText}>{post.price} 원</ThemedText>
              <StarRating
                rating={calcAverageRating(
                  post.comments.map(comment => comment.rating),
                )}
                count={post.comments.length}
                showRating
              />
            </View>
            <View style={styles.productInfoSection}>
              <ThemedText style={styles.productTitle}>{post.title}</ThemedText>
              <ThemedText style={styles.productDescription}>
                {post.description}
              </ThemedText>
            </View>
          </View>
          {/* 판매자 정보 섹션 */}
          <View style={styles.sellerSection}>
            <View style={styles.sellerInfo}>
              <Image source={avatarImages[0]} style={styles.avatar} />
              <View style={styles.sellerDetails}>
                <ThemedText style={styles.sellerName}>
                  TechStore Official
                </ThemedText>
                <View style={styles.ratingRow}>
                  <StarRating rating={5} showRating={false} />
                  <ThemedText style={styles.ratingText}>
                    4.8 • 2.3k {width >= 428 ? 'reviews' : ''}
                  </ThemedText>
                </View>
              </View>
            </View>
            <Pressable style={styles.followButton}>
              <ThemedText>Follow</ThemedText>
            </Pressable>
          </View>
          {/* 리뷰 섹션 */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <ThemedText style={styles.reviewsTitle}>
                Reviews ({post.comments.length})
              </ThemedText>
              <ThemedText style={styles.seeAllText}>See All</ThemedText>
            </View>
            {/* 리뷰 유저 #1 */}
            <View style={styles.reviewContainer}>
              <View style={styles.reviewerInfo}>
                <Image source={avatarImages[2]} style={styles.reviewerAvatar} />
                <View style={styles.reviewerDetails}>
                  <View style={styles.reviewerNameRow}>
                    <ThemedText style={styles.reviewerName}>
                      Sarah Johnson
                    </ThemedText>
                    <StarRating rating={5} showRating={false} />
                  </View>
                  <ThemedText style={styles.reviewDate}>2 days ago</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.reviewText}>
                Amazing sound quality! The noise cancellation works perfectly
                and the battery life is exactly as advertised. Highly
                recommended for anyone looking for premium headphones.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
        {/* 상호작용 섹션 (리뷰 작성) */}
        <View
          style={[
            styles.bottomInputSection,
            { marginBottom: insets.bottom / 2 },
          ]}
        >
          <Image source={avatarImages[0]} style={styles.inputAvatar} />
          <ReviewInput />
          <Pressable style={styles.sendButton}>
            <IconSymbol name='paperplane.fill' color={tintColorDark} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  statusBarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  container: {
    marginVertical: 24,
    gap: 16,
  },
  priceSection: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 32,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productInfoSection: {
    paddingHorizontal: 16,
    gap: 16,
    minHeight: 150,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'semibold',
    lineHeight: 25,
  },
  productDescription: {
    fontSize: 16,
    fontWeight: 'semibold',
    lineHeight: 26,
  },
  sellerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#4A5568',
  },
  sellerInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  sellerDetails: {
    gap: 4,
  },
  sellerName: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'medium',
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  followButton: {
    width: 77,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  reviewsSection: {
    padding: 16,
    gap: 16,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewsTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 'semibold',
  },
  seeAllText: {
    fontSize: 14,
    color: mainColor,
  },
  reviewContainer: {
    gap: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  reviewerDetails: {
    gap: 4,
  },
  reviewerNameRow: {
    flexDirection: 'row',
    gap: 7,
  },
  reviewerName: {
    fontSize: 14,
    lineHeight: 20,
  },
  reviewDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#9CA3AF',
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 23,
  },
  bottomInputSection: {
    padding: 16,
    minHeight: 73,
    borderTopWidth: 1,
    borderColor: '#4A5568',
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 200,
    justifyContent: 'space-between',
    gap: 12,
  },
  inputAvatar: {
    width: 40,
    height: 44,
    borderRadius: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
})

export { PostDetailScreen }
