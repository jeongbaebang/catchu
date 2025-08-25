import { Platform } from 'react-native'

import { PhotoUpload as PhotoUploadIOS } from './PhotoUpload.ios'
import { PhotoUpload as PhotoUploadAndroid } from './PhotoUpload.android'

const PhotoUpload = Platform.OS === 'ios' ? PhotoUploadIOS : PhotoUploadAndroid

export { PhotoUpload }
