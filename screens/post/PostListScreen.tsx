import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import { StyleSheet, View, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'

import {
  POST_LIST_HEADER_HEIGHT,
  PostItem,
  PostListHeader,
  ThemedView,
} from '@/components'

import { PostWithAuthor, usePosts } from '@/hooks/usePosts'
import { useLikes } from '@/hooks/useLikes'
import { useSession } from '@/context/auth'
import { timeAgo } from '@/utils/timeAgo'

const PostListScreen = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const posts = usePosts()
  const scrollY = useSharedValue(0)

  const handleComment = (id: string) => {
    router.push(`/post/${id}`) // 댓글은 상세 페이지에서
  }

  const handleShare = (id: string) => {
    // 공유 기능 구현
  }

  const handleViewStore = (id: string) => {
    router.push(`/post/${id}`)
  }

  const renderPostItem = ({ item }: { item: PostWithAuthor }) => {
    return (
      <PostItemWithLikes
        post={item}
        onComment={() => handleComment(item.postId)}
        onShare={() => handleShare(item.postId)}
        onViewStore={() => handleViewStore(item.postId)}
      />
    )
  }

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const blurViewAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 50, 100],
      [1, 0.7, 0],
      Extrapolation.CLAMP,
    )

    const translateY = interpolate(
      scrollY.value,
      [0, 50, 100],
      [0, -7, -15],
      Extrapolation.CLAMP,
    )

    return {
      opacity,
      transform: [{ translateY }],
    }
  })

  return (
    <ThemedView>
      {/* 상태바 블러 오버레이 */}
      <View style={[styles.statusBarBlur, { height: insets.top }]}>
        <BlurView
          intensity={10}
          tint='default'
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <Animated.View
        style={[
          styles.listHeader,
          blurViewAnimatedStyle,
          { minHeight: insets.top, marginTop: insets.top },
        ]}
      >
        <PostListHeader />
      </Animated.View>
      <Animated.FlatList
        onScroll={scrollHandler}
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={item => item.postId.toString()}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={3}
        initialNumToRender={3}
        contentContainerStyle={[
          styles.listContainer,
          {
            paddingTop: POST_LIST_HEADER_HEIGHT + insets.top,
            paddingBottom: POST_LIST_HEADER_HEIGHT + insets.bottom,
          },
        ]}
      />
    </ThemedView>
  )
}

interface PostItemWithLikesProps {
  post: PostWithAuthor
  onComment: () => void
  onShare: () => void
  onViewStore: () => void
}

const PostItemWithLikes = ({
  post,
  onComment,
  onShare,
  onViewStore,
}: PostItemWithLikesProps) => {
  const { user } = useSession()
  const { isLiked, likesCount, toggleLike } = useLikes(post.postId, post.likes)

  const handleLike = async () => {
    if (!user) {
      Alert.alert('로그인 필요', '좋아요를 누르려면 로그인이 필요합니다.')
      return
    }

    try {
      await toggleLike()
    } catch (error: any) {
      Alert.alert('오류', error.message)
    }
  }

  return (
    <PostItem
      user={{
        name: post.author.name,
        avatar: post.author.avatarImage,
        timeAgo: timeAgo(post.createdAt),
      }}
      price={post.price}
      productImage={post.images}
      description={post.description}
      likes={likesCount}
      comments={post.comments.length}
      isLiked={isLiked}
      onLike={handleLike}
      onComment={onComment}
      onShare={onShare}
      onViewStore={onViewStore}
    />
  )
}

const styles = StyleSheet.create({
  statusBarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  listHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  listContainer: {
    zIndex: 0,
  },
})

export { PostListScreen }
