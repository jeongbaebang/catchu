import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'

import {
  POST_LIST_HEADER_HEIGHT,
  PostItem,
  PostListHeader,
  ThemedView,
} from '@/components'

import { avatarImages } from '@/constants/mock'
import { PostWithAuthor, usePosts } from '@/hooks/usePosts'
import { timeAgo } from '@/utils/timeAgo'

const PostListScreen = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const posts = usePosts()
  const scrollY = useSharedValue(0)

  const handleLike = (id: string) => {}

  const handleComment = (id: string) => {}

  const handleShare = (id: string) => {}

  const handleViewStore = (id: string) => {
    router.push(`/post/${id}`)
  }

  const renderPostItem = ({ item }: { item: PostWithAuthor }) => (
    <PostItem
      user={{
        name: item.author?.name,
        avatar: avatarImages[0],
        timeAgo: timeAgo(item.createdAt),
      }}
      price={item.price}
      productImage={item.images}
      description={item.description}
      likes={item.likes.length}
      comments={item.comments.length}
      isLiked={false}
      onLike={() => handleLike(item.postId)}
      onComment={() => handleComment(item.postId)}
      onShare={() => handleShare(item.postId)}
      onViewStore={() => handleViewStore(item.postId)}
    />
  )

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
