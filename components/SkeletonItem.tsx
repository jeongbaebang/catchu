import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

interface PostItemSkeletonProps {
  count?: number
}

const PostItemSkeleton: React.FC<PostItemSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonItem key={index} />
      ))}
    </>
  )
}

const SkeletonItem = () => {
  const shimmerValue = useSharedValue(0)

  React.useEffect(() => {
    // 컴포넌트가 마운트될 때 shimmer 애니메이션 시작
    // withRepeat: 애니메이션을 무한 반복 (-1)하고 reverse(true)로 왕복
    // withTiming: 1.5초 동안 0에서 1까지 부드럽게 변화
    shimmerValue.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // shimmer 효과를 위한 애니메이션 스타일 정의
  const shimmerStyle = useAnimatedStyle(() => {
    // opacity를 0.3~0.7 사이에서 변화시켜 깜빡이는 효과 생성
    // shimmerValue가 0일 때: 0.3 (어두움)
    // shimmerValue가 1일 때: 0.7 (밝음)
    const opacity = 0.3 + shimmerValue.value * 0.4
    return { opacity }
  })
  return (
    <View style={styles.container}>
      {/* 헤더 섹션 스켈레톤 */}
      <View style={styles.itemHeader}>
        <View style={styles.userInfo}>
          <Animated.View style={[styles.avatarSkeleton, shimmerStyle]} />
          <View style={styles.userTextContainer}>
            <Animated.View style={[styles.userNameSkeleton, shimmerStyle]} />
            <Animated.View style={[styles.timeAgoSkeleton, shimmerStyle]} />
          </View>
        </View>
        <Animated.View style={[styles.priceSkeleton, shimmerStyle]} />
      </View>
      {/* 이미지 섹션 스켈레톤 */}
      <Animated.View style={[styles.imageSkeleton, shimmerStyle]} />
      {/* 하단 섹션 스켈레톤 */}
      <View style={styles.bottomSection}>
        {/* 액션 버튼들 스켈레톤 */}
        <View style={styles.actionRow}>
          {[1, 2, 3].map(item => (
            <View key={item} style={styles.actionButton}>
              <Animated.View
                style={[styles.actionIconSkeleton, shimmerStyle]}
              />
              <Animated.View
                style={[styles.actionTextSkeleton, shimmerStyle]}
              />
            </View>
          ))}
        </View>
        {/* 설명 텍스트 스켈레톤 */}
        <View style={styles.descriptionContainer}>
          <Animated.View style={[styles.descriptionLine1, shimmerStyle]} />
          <Animated.View style={[styles.descriptionLine2, shimmerStyle]} />
          <Animated.View style={[styles.descriptionLine3, shimmerStyle]} />
        </View>
        {/* View in Store 버튼 스켈레톤 */}
        <Animated.View style={[styles.viewStoreSkeleton, shimmerStyle]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
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
  avatarSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
  },
  userTextContainer: {
    gap: 4,
  },
  userNameSkeleton: {
    width: 80,
    height: 14,
    backgroundColor: '#374151',
    borderRadius: 7,
  },
  timeAgoSkeleton: {
    width: 60,
    height: 12,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
  priceSkeleton: {
    width: 70,
    height: 28,
    backgroundColor: '#374151',
    borderRadius: 10,
  },
  imageSkeleton: {
    width: '100%',
    height: 300,
    backgroundColor: '#374151',
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionIconSkeleton: {
    width: 16,
    height: 16,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  actionTextSkeleton: {
    width: 24,
    height: 14,
    backgroundColor: '#374151',
    borderRadius: 7,
  },
  descriptionContainer: {
    gap: 4,
  },
  descriptionLine1: {
    width: '100%',
    height: 16,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  descriptionLine2: {
    width: '85%',
    height: 16,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  descriptionLine3: {
    width: '70%',
    height: 16,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  viewStoreSkeleton: {
    width: 90,
    height: 18,
    backgroundColor: '#374151',
    borderRadius: 9,
    marginTop: 4,
  },
})

export { PostItemSkeleton }
