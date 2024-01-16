import { axiosInstance, handleRequestError } from './axiosInstance'
// import * as FileSystem from 'expo-file-system'
import RNFS from 'react-native-fs'
import mime from 'mime'
import RNFetchBlob from 'rn-fetch-blob'
import { AxiosError } from 'axios'
import { Platform } from 'react-native'

export async function imageUpload(fileUri: string, returnId: boolean = true) {
  const fileInfo = await RNFS.stat(fileUri)
  if (!fileInfo.isFile()) return null

  try {
    const imageData = { type: 'img' };
    const resCloud = await axiosInstance({
      url: 'api/v1/image/storage',
      method: 'POST',  // Change the method to POST
      headers: {
        'Content-Type': 'application/json',
      },
      data: imageData,  
    });


    const { uploadURL, id: requestId } = resCloud.data?.cloudflare || {}

    if (!uploadURL) return null
    const headers = new Headers()

    headers.append('Content-Type', '')

    const type = mime.getType(fileUri)

    const fileFormat = mime.getExtension(type ?? 'image/png')

    const res = await RNFetchBlob.fetch(
      'POST',
      uploadURL,
      {
        'Content-Type': 'multipart/form-data'
      },
      [
        {
          name: 'file',
          filename: fileInfo?.name ?? `file.${fileFormat}`,
          type: type || 'image/png',
          data: RNFetchBlob.wrap(
            Platform.OS === 'ios'
              ? fileInfo.path.replace('file://', '')
              : fileInfo.path
          )
        }
      ]
    )

    const fileUploadResult = res.json()
    if (returnId) {
      return fileUploadResult.result?.id as string
    }

    const imageURL = fileUploadResult.result?.variants?.find((item:any) =>
      item.includes('public')
    ) ?? fileUploadResult.result?.variants?.[0]

    if (imageURL) return imageURL as string
  } catch (err) {
    console.error(err)
    handleRequestError(err as AxiosError)
    return null
  }
}
