import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'
import { StorageKey } from '../types/enum'
import { axiosInstance, handleRequestError } from './axiosInstance'
import { emailRegex, phoneRegex } from '../constants/regex'
import Toast from 'react-native-toast-message'
import { API_URL } from '../constants/config'
import { User } from '../types/user.interface'

type RegisterLoginResponse = {
  'CSRF-TOKEN': string
  'X-SESSION-ID': string
  notify_device: any
  pin: string
  status: string
  user: User
}

export type AuthTypes = {
  social: 'facebook' | 'apple' | 'google'
  userSocialId: string
  socialAccessToken: string
  email?: string
  name?: string
}

export async function refreshCsrfToken() {
  try {
    const session = await AsyncStorage.getItem(StorageKey.XSession)

    const res = await axios({
      baseURL: API_URL,
      url: '/api/v1/csrf',
      headers: {
        Referer: '::1',
        ...(session ? { 'X-SESSION-ID': session } : {})
      }
    })

    if (!res.data['CSRF-TOKEN'] || !res.data['X-SESSION-ID']) {
      throw new Error('Failed to refresh CSRF token')
    }

    await AsyncStorage.setItem(StorageKey.CSRFToken, res.data['CSRF-TOKEN'])
    await AsyncStorage.setItem(StorageKey.XSession, res.data['X-SESSION-ID'])

    return res.data['CSRF-TOKEN']
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function register({
  login,
  password,
  password_confirmation
}: {
  login: string
  password: string
  password_confirmation: string
}) {
  const isEmail = true
  const isPhone = phoneRegex.test(`+${login}`.replace('++', '+'))

  if (!isEmail && !isPhone) {
    Toast.show({
      type: 'error',
      text1: 'Invalid login'
    })
    throw new Error('Register invalid login')
  }

  if (password !== password_confirmation) {
    Toast.show({
      type: 'error',
      text1: 'Passwords do not match'
    })
    throw new Error('Passwords do not match')
  }

  const data: {
    password: string
    password_confirmation: string
    email?: string
    phone?: string
  } = {
    password,
    password_confirmation
  }

  if (isEmail) {
    data.email = login
  } else if (isPhone) {
    data.phone = login
  }

  try {
    const res = await axiosInstance.postForm('api/v1/auth/register', data)

    Toast.show({
      type: 'info',
      text1: res.data.pin,
      visibilityTime: 20000
    })

    return res.data as RegisterLoginResponse
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function login({
  login,
  password
}: {
  login: string
  password: string
}) {
  const isEmail = true
  const isPhone = phoneRegex.test(`+${login}`.replace('++', '+'))

  if (!isEmail && !isPhone) {
    Toast.show({
      type: 'error',
      text1: 'Invalid login'
    })
    throw new Error('Invalid login')
  }

  const data: {
    password: string
    email?: string
    phone?: string
  } = {
    password
  }

  if (isEmail) {
    data.email = login
  } else if (isPhone) {
    data.phone = login
  }

  try {
    const res = await axiosInstance.postForm('api/v1/auth/login', data)

    return res.data as RegisterLoginResponse
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function sendRecoveryPin({ login }: { login: string }) {
  const isEmail = emailRegex.test(login)
  const isPhone = phoneRegex.test(`+${login}`.replace('++', '+'))

  if (!isEmail && !isPhone) {
    Toast.show({
      type: 'error',
      text1: 'Invalid login'
    })
    throw new Error('sendRecoveryPin Invalid login')
  }

  const data: {
    email?: string
    phone?: string
  } = {}

  if (isEmail) {
    data.email = login
  } else if (isPhone) {
    data.phone = login
  }

  try {
    const res = await axiosInstance.get('api/v1/auth/verify', {
      params: data
    })

    Toast.show({
      type: 'info',
      text1: res.data.pin,
      visibilityTime: 10000
    })

    return res.data
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function verifyPin({ pin }: { pin: string }) {
  try {
    const res = await axiosInstance.get(`api/v1/auth/verify/${pin}`)
    return res.data
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function resendPin() {
  try {
    const res = await axiosInstance.get(`api/v1/auth/verify`)

    Toast.show({
      type: 'info',
      text1: res.data.pin,
      visibilityTime: 10000
    })

    return res.data
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function verifyRecoveryPin({
  pin,
  login
}: {
  pin: string
  login: string
}) {
  const isEmail = emailRegex.test(login)
  const isPhone = phoneRegex.test(`+${login}`.replace('++', '+'))

  const data = {
    ...(isPhone ? { phone: login } : {}),
    ...(isEmail ? { email: login } : {})
  }

  try {
    const res = await axiosInstance.get(`api/v1/auth/verify/${pin}`, {
      params: data
    })
    return res.data
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function logout() {
  try {
    const res = await axiosInstance.postForm('api/v1/auth/logout')
    return res.data
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}
export async function resetPassword({
  login,
  password,
  password_confirmation,
  remember_token
}: {
  login: string
  password: string
  password_confirmation: string
  remember_token: string
}) {
  const isEmail = emailRegex.test(login)
  const isPhone = phoneRegex.test(`+${login}`.replace('++', '+'))

  if (!isEmail && !isPhone) {
    Toast.show({
      type: 'error',
      text1: 'Invalid login'
    })
    throw new Error('resetPassword Invalid login')
  }

  const data: {
    password: string
    password_confirmation: string
    email?: string
    phone?: string
    remember_token: string
  } = {
    password,
    password_confirmation,
    remember_token
  }

  if (isEmail) {
    data.email = login
  } else if (isPhone) {
    data.phone = login
  }

  try {
    const res = await axiosInstance.postForm('api/v1/auth/password/reset', data)

    return res.data
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function socialAuth({
  social,
  userSocialId,
  socialAccessToken,
  email,
  name
}: AuthTypes) {
  try {
    const res = await axiosInstance.post(`api/v1/auth/open/${social}`, {
      open_id: userSocialId,
      refresh_token: socialAccessToken,
      email,
      name
    })

    return res.data as User
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}

export async function socialSignIn({
  social,
  userSocialId,
  socialAccessToken
}: AuthTypes) {
  try {
    const res = await axiosInstance.put<RegisterLoginResponse>(
      `api/v1/auth/open/${social}`,
      null,
      {
        params: {
          open_id: userSocialId,
          refresh_token: socialAccessToken
        }
      }
    )

    return res.data
  } catch (err) {
    handleRequestError(err as AxiosError)
    throw err
  }
}
