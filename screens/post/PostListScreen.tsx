import React from 'react'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated'

import {
  POST_LIST_HEADER_HEIGHT,
  PostItem,
  PostListHeader,
  ThemedView,
} from '@/components'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { BlurView } from 'expo-blur'

const PostListScreen = () => {
  const insets = useSafeAreaInsets()

  const avatarImages = [
    require('@/assets/images/uifaces-popular-avatar (0).jpg'),
    require('@/assets/images/uifaces-popular-avatar (1).jpg'),
    require('@/assets/images/uifaces-popular-avatar (2).jpg'),
    require('@/assets/images/uifaces-popular-avatar (3).jpg'),
    require('@/assets/images/uifaces-popular-avatar (4).jpg'),
    require('@/assets/images/uifaces-popular-avatar (5).jpg'),
    require('@/assets/images/uifaces-popular-avatar (6).jpg'),
    require('@/assets/images/uifaces-popular-avatar (7).jpg'),
    require('@/assets/images/uifaces-popular-avatar (8).jpg'),
    require('@/assets/images/uifaces-popular-avatar (9).jpg'),
    require('@/assets/images/uifaces-popular-avatar (10).jpg'),
  ]

  const productImages = [
    require('@/assets/images/product (0).png'),
    require('@/assets/images/product (1).png'),
    require('@/assets/images/product (2).png'),
    require('@/assets/images/product (3).png'),
    require('@/assets/images/product (4).png'),
    require('@/assets/images/product (5).png'),
    require('@/assets/images/product (6).png'),
    require('@/assets/images/product (7).png'),
    require('@/assets/images/product (8).png'),
    require('@/assets/images/product (9).png'),
    require('@/assets/images/product (10).png'),
  ]

  // 0-10까지의 mock 데이터 생성
  const mockDataList = Array.from({ length: 11 }, (_, index) => ({
    id: index,
    user: {
      name: `StyleCraft${index}`,
      avatar: avatarImages[index % avatarImages.length],
      timeAgo: `${index + 1} hours ago`,
    },
    price: `${(Math.floor(Math.random() * 180 + 20) * 10000).toLocaleString()} 원`,
    productImage: productImages[index % productImages.length],
    description: [
      '드디어 새 미니멀 컬렉션 나왔어요! 깔끔하면서도 실용적이라 진짜 좋음 ✨ 요즘 집에 완전 잘 어울려요',
      '친환경 소재로 만든 럭셔리 아이템이에요. 지구도 살리고 편안함도 챙기고 🌱',
      '다 수작업으로 만들어서 하나하나가 진짜 특별해요. 장인의 손길이 느껴진다고 할까요',
      '요즘 라이프스타일에 딱 맞는 아이템들이에요. 예쁘면서도 쓸모 있어서 좋아요',
      '한정판이라서 전세계에 100개밖에 없어요! 진짜 빨리 품절될 것 같음 🔥',
      '클래식한데 세련되게 업데이트한 디자인이에요. 오래 써도 질리지 않을 스타일',
      '소재 진짜 좋은 거로만 골라서 만들었어요. 전세계 최고급 업체에서 가져온 거라서',
      '최신 디자인에 전통 기법까지 더해서 완전 완벽한 조합이에요',
      '이번 주말에 독점 런칭해요! 놓치면 후회할걸요?',
      '국제 디자인상 받은 작품이에요. 인정받은 디자인이라 믿고 보세요',
      '시그니처 컬렉션 마지막 피스예요. 진짜 소장각 아이템',
    ][index],
    likes: 124 + index * 15,
    comments: 18 + index * 3,
    isLiked: index % 3 === 0,
  }))

  const handleLike = (id: number) => {
    console.log(`좋아요 클릭 - 아이템 ${id}`)
  }

  const handleComment = (id: number) => {
    console.log(`댓글 클릭 - 아이템 ${id}`)
  }

  const handleShare = (id: number) => {
    console.log(`공유 클릭 - 아이템 ${id}`)
  }

  const handleViewStore = (id: number) => {
    console.log(`스토어 보기 클릭 - 아이템 ${id}`)
  }

  //  FIXME: any 타입 수정하기
  const renderPostItem = ({ item }: { item: any }) => (
    <PostItem
      user={item.user}
      price={item.price}
      productImage={item.productImage}
      description={item.description}
      likes={item.likes}
      comments={item.comments}
      isLiked={item.isLiked}
      onLike={() => handleLike(item.id)}
      onComment={() => handleComment(item.id)}
      onShare={() => handleShare(item.id)}
      onViewStore={() => handleViewStore(item.id)}
    />
  )

  const scrollY = useSharedValue(0)

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
    <>
      <StatusBar
        style='auto'
        translucent={true}
        backgroundColor='transparent'
      />
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
          data={mockDataList}
          renderItem={renderPostItem}
          keyExtractor={item => item.id.toString()}
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
    </>
  )
}

const styles = StyleSheet.create({
  statusBarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
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
