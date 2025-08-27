import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import { StyleSheet, View, Alert, ScrollView } from 'react-native'
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
import { timeAgo } from '@/utils/timeAgo'
import { PostItemSkeleton } from '@/components/SkeletonItem'
import { useSession } from '@/context/auth'

const PostListScreen = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const posts = usePosts()
  const scrollY = useSharedValue(0)
  const { user } = useSession()

  const handleComment = (id: string) => {
    router.push(`/post/${id}`)
  }

  // 공유 기능 구현
  const handleShare = (id: string) => {}

  const handleViewStore = (id: string) => {
    router.push(`/post/${id}`)
  }

  const renderPostItem = ({ item }: { item: PostWithAuthor }) => {
    return (
      <PostItemWithLikes
        post={item}
        isLogin={!!user}
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
      {posts ? (
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
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.listContainer,
            {
              paddingTop: POST_LIST_HEADER_HEIGHT + insets.top,
              paddingBottom: POST_LIST_HEADER_HEIGHT + insets.bottom,
            },
          ]}
        >
          <PostItemSkeleton count={5} />
        </ScrollView>
      )}
    </ThemedView>
  )
}

interface PostItemWithLikesProps {
  isLogin: boolean
  post: PostWithAuthor
  onComment: () => void
  onShare: () => void
  onViewStore: () => void
}

const PostItemWithLikes = ({
  isLogin,
  post,
  onComment,
  onShare,
  onViewStore,
}: PostItemWithLikesProps) => {
  const { isLiked, likesCount, toggleLike } = useLikes(post.postId, post.likes)

  const handleLike = async () => {
    try {
      await toggleLike()
    } catch (error: any) {
      Alert.alert('오류', error.message)
    }
  }

  return (
    <PostItem
      isLogin={isLogin}
      author={{
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
