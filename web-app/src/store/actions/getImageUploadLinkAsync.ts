import { AppDispatch } from '@/store'
import { authorizedAxios } from '@/config/axios'

export const getImageUploadLinkAsync = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await authorizedAxios('/image/storage')

      return data
    } catch (e: unknown) {
      console.error((e as Error).message)
    }
  }
}