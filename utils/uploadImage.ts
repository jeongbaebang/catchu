import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '../firebaseConfig'

type Path = 'posts' | 'avatar'

export const uploadImage = async (path: Path, uri: string) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  const storageRef = ref(storage, `${path}/${Date.now()}.jpg`)
  await uploadBytes(storageRef, blob)
  return await getDownloadURL(storageRef)
}
