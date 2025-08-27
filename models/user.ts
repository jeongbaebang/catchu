// 좋아요

import { Timestamp } from 'firebase/firestore'

export interface User {
  userId: string
  name: string
  email: string
  avatarImage: string
  createdAt: Timestamp
}
