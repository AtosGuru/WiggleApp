import axios, { AxiosError } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageKey } from '../types/enum'
import Toast from 'react-native-toast-message'
import { API_URL } from '../constants/config'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    Referer: '::1'
  }
})

axiosInstance.interceptors.request.use(async config => {
  const unprotectedRoutes = [
    'api/v1/auth/login',
    'api/v1/auth/register',
    'api/v1/auth/open/apple',
    'api/v1/auth/open/google',
    'api/v1/auth/open/facebook'
  ]

  if (unprotectedRoutes.includes(config?.url)) {
    config.headers['X-CSRF-TOKEN'] = null
    config.headers['X-SESSION-ID'] = null
    return config
  }

  config.headers['X-CSRF-TOKEN'] = await AsyncStorage.getItem(
    StorageKey.CSRFToken
  )

  config.headers['X-SESSION-ID'] = await AsyncStorage.getItem(
    StorageKey.XSession
  )
  return config
}) 

axiosInstance.interceptors.response.use(
  async response => {
    const csrf =
      response.data['X-CSRF-TOKEN'] ||
      response.headers['X-CSRF-TOKEN'] ||
      response.headers['x-csrf-token']

    if (csrf) {
      await AsyncStorage.setItem(StorageKey.CSRFToken, csrf)
    }

    const xSession =
      response.data['X-SESSION-ID'] ||
      response.headers['X-SESSION-ID'] ||
      response.headers['x-session-id']

    if (xSession) {
      await AsyncStorage.setItem(StorageKey.XSession, xSession)
    }

    return response
  },
  err => {
    throw err
  }
)

export function handleRequestError(err: AxiosError) {
  const message =
    (err?.response?.data as { message: string })?.message || err?.message
  if (!message) return

  Toast.show({
    type: 'error',
    text1: (err?.response?.data as { message: string })?.message || err?.message
  })
}
