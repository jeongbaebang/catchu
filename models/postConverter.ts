import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
} from 'firebase/firestore'

import { Post } from './post'

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(post: Post): DocumentData {
    return { ...post }
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Post {
    const data = snapshot.data(options)

    return {
      postId: snapshot.id,
      ...data,
    } as Post
  },
}
