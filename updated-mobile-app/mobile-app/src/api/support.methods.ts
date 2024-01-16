import { axiosInstance, handleRequestError } from './axiosInstance'
import { AxiosError } from 'axios'

type SupportProps = {
  user_id?: number | null
  name: string
  email: string
  description: string
  type?: string
}

export async function sendSupport(data: SupportProps) {
  try {
    const { data: res } = await axiosInstance.post(
      `api/v1/feedback/register`,
      data
    )

    return res
  } catch (error) {
    handleRequestError(error as AxiosError)
    throw error
  }
}
