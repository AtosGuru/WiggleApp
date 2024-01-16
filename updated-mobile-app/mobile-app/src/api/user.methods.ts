import moment from 'moment'
import { AxiosError } from 'axios'
import { QueryFunctionContext } from 'react-query'

import { IObject } from '../types/utils'
import { User } from '../types/user.interface'
import { Connection } from '../types/connection.interfaces'
import { axiosInstance, handleRequestError } from './axiosInstance'

export async function updateUserLocation(longitude, latitude) {
  try {
    const res = await axiosInstance.post('api/v1/user/location', {
      longitude,
      latitude
    })

    // console.log('update location: ', res)

    return res
  } catch (err) {
    console.log(err)
  }
}

export async function updateUserProfile(profile: Partial<User['profile']>) {
  try {
    const res = await axiosInstance.post('api/v1/user/profile', {
      profile: JSON.stringify(profile)
    })

    console.log({
      profile: JSON.stringify(profile)
    })

    return res.data as User
  } catch (err) {
    console.log(err)
  }
}

export async function updateUser(userdata: Partial<User>) {
  try {
    const res = await axiosInstance.post('api/v1/user', userdata)

    return res?.data as User
  } catch (err) {
    console.log(err)
  }
}

export async function updateUserFCM(fcm_token) {
  try {
    const res = await axiosInstance.post('api/v1/user', {
      fcm_token: fcm_token
    })

    return res?.data as User
  } catch (err) {
    console.log(err)
  }
}

export async function getUser() {
  try {
    const { data } = await axiosInstance.get('api/v1/user')
    return data?.user as User
  } catch (err) {
    console.log(err)
  }
}

export async function twilioAccessToken() {
  try {
    console.log(123123123123123123123)
    const { data } = await axiosInstance.get('api/v1/twilioAccessToken')
    return data?.twilio_access_token
    // return data
  } catch (err) {
    console.log(err)
  }
}

export async function updateSetting(payload: IObject) {
  try {
    const res = await axiosInstance.post('/api/v1/setting/update', {
      settings: {
        ...payload
      }
    })
    return res
  } catch (error) {
    handleRequestError(error as AxiosError)
    throw error
  }
}

export async function getUserById({ queryKey: [_, id] }: QueryFunctionContext) {
  try {
    const { data } = await axiosInstance.get(`api/v1/user/${id}`)
    if (Array.isArray(data.user)) {
      return data.user[0] as User
    }
    return data.user as User
  } catch (err) {}
}

export async function searchUsers({
  queryKey: [_, query]
}: QueryFunctionContext) {
  try {
    const { data } = await axiosInstance.get<ActiveUsersResponse>(
      'api/v1/users',
      {
        params: {
          search: query
        }
      }
    )

    return data
  } catch (err) {
    console.log(err)
  }
}

interface ActiveUsersResponse {
  'CSRF-TOKEN': string
  'X-SESSION-ID': string
  customers: User[]
  // add later
  links: any
  meta: any
}

export async function searchActiveUsers() {
  try {
    const currentDate = moment(new Date()).format('YYYY-MM-DD hh-mm-ss')
    const { data } = await axiosInstance.get<ActiveUsersResponse>(
      'api/v1/users',
      {
        params: {
          search: currentDate,
          field: 'updated_at',
          operator: 'greater'
        }
      }
    )

    return data
  } catch (err) {
    console.log(err)
  }
}

interface ConnectedUsersResponse {
  'CSRF-TOKEN': string
  'X-SESSION-ID': string
  connections: Connection[]
}

export async function getAllConnectedUsers() {
  try {
    const { data } = await axiosInstance.get<ConnectedUsersResponse>(
      'api/v1/chat'
    )
    return data
  } catch (err) {}
}

export async function searchUsersById() {
  try {
    const { data } = await axiosInstance.get<ActiveUsersResponse>(
      'api/v1/users',
      {
        params: {
          search: '768',
          field: 'id',
          operator: '='
        }
      }
    )

    return data
  } catch (err) {
    console.log(err)
  }
}

type searchFollowUsersProps = {
  search: string
}

export async function getSearchFollowUsers({ search }: searchFollowUsersProps) {
  try {
    const res = await axiosInstance.get('api/v1/users/connected', {
      params: {
        search
      }
    })
    return res.data
  } catch (err) {
    throw err
  }
}
