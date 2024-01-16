import { User } from '../types/user.interface'
import { axiosInstance, handleRequestError } from './axiosInstance'
import { AxiosError } from 'axios'
import { ConnectionType } from '../types/enum'

export interface NotificationResponseItem {
  active: 0 | 1
  created_at: string
  id: number
  message: {
    model: string
    model_id: number
    partner_id: number
    title: string
    type: ConnectionType
  }
  partner?: User
  token: string
  updated_at: string
  user_id: number
  sender?: User
}
interface NotificationResponse {
  'CSRF-TOKEN': string
  'X-SESSION-ID': string
  debug_token: string
  notifications: NotificationResponseItem[]
}

export async function getNotifications() {
  try {
    const res = await axiosInstance.get<NotificationResponse>(
      `api/v1/notify/personal`
    )

    if (!res.data.notifications) {
      return []
    }
    return res.data.notifications
  } catch (err) {
    handleRequestError(err as AxiosError)
  }
}

export async function readNotification(id: number | string) {
  const res = await axiosInstance.put(`api/v1/notify/personal/${id}`)

  return res.data
}

export async function readAllNotifications(token: string) {
  const res = await axiosInstance.put(`api/v1/notify/personal/${token}`)

  return res.data
}

export async function deleteNotification(id: number) {
  const res = await axiosInstance.delete(`api/v1/notify/personal/${id}`)

  return res.data
}
