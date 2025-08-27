import { Timestamp } from 'firebase/firestore'

import { User } from './user'

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

type Author = Pick<User, 'userId' | 'avatarImage' | 'name'>

export interface Comment {
  postId: string
  author: Author
  content: string
  rating: number
  createdAt: Timestamp
}
