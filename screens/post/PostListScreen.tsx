import React from 'react'

import { PostListHeader, ThemedView } from '@/components'

const PostListScreen = () => {
  return (
    <ThemedView
      safeArea
      style={{
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
      }}
    >
      {/* 포스트 리스트 헤더 */}
      <PostListHeader />
    </ThemedView>
  )
}

export { PostListScreen }
