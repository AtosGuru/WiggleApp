import { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { imageUpload } from '../api/images.methods'

export type Photo = {
  id: number
  isUploading: boolean
  uri: string
}

export function usePhotoUploader(params: {
  limit: number
  defaultPhotos: string[]
}) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const { limit = 4, defaultPhotos = [] } = params || {}

  useEffect(() => {
    if (!defaultPhotos.length) return
    setPhotos(
      defaultPhotos.map((el, i) => ({
        id: i,
        isUploading: false,
        uri: el
      }))
    )
  }, [])

  const handlePhotoSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.assets || result.canceled) return

    const assets = result.assets.slice(0, limit - photos.length)

    const selectedPhotos = assets.map((el, i) => {
      return {
        id: 1 + Math.max(photos.map(el => el.id)),
        isUploading: true,
        uri: el.uri
      }
    })

    setPhotos([...photos, ...selectedPhotos])
  }

  const handlePhotosUpload = async () => {
    const uploadedPhotos: Photo[] = (await Promise.all(
      photos.map(el => {
        return new Promise(async resolve => {
          if (!el.isUploading) {
            return resolve(el)
          }

          const uris = await imageUpload(el.uri)

          resolve({
            ...el,
            isUploading: false,
            uri: uris.find((el: string) => el.includes('public'))
          })
        })
      })
    )) as Photo[]

    setPhotos(uploadedPhotos)
  }

  useEffect(() => {
    if (photos.find(el => el.isUploading)) {
      handlePhotosUpload()
    }
  }, [photos])

  const handlePhotoDelete = (id: number) => () => {
    setPhotos(photos.filter(el => el.id !== id))
  }

  return {
    photos,
    handlePhotoSelect,
    handlePhotoDelete
  }
}
