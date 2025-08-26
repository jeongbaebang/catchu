import { Timestamp } from 'firebase/firestore'

export interface Post {
  postId: string
  authorId: string
  images: string
  title: string
  description: string
  price: string
  createdAt: Timestamp
  updatedAt: Timestamp
  rating: number
  likes: { userId: string }[]
  comments: Comment[]
}

export interface Comment {
  postId: string
  authorId: string
  content: string
  rating: number
  createdAt: Timestamp
}
