import { axiosInstance, handleRequestError } from './axiosInstance'
import { Event, FullEvent } from '../types/event.interface'
import { AxiosError } from 'axios'

type GetEventsProps = {
  type: 'event' | 'festival'
  name: string
}

export async function getEvents({ name, type }: GetEventsProps) {
  const { data } = await axiosInstance.get('api/v1/event', {
    params: {
      field: 'title,meta->type',
      search: `${name},${type}`,
      logic: 'and'
    }
  })
  
  return data.events as Event[]
}

export async function getEventById(id: string | number) {
  try {
    const { data } = await axiosInstance.get<FullEvent>(`api/v1/event/${id}`)
    return data
  } catch (error) {
    handleRequestError(error as AxiosError)
    throw error
  }
}

export async function getEventByClub(locationId: string) {
  try {
    const { data } = await axiosInstance.get(`api/v1/event`, {
      params: {
        search: locationId,
        field: 'location_id'
      }
    })

    return data
  } catch (error) {
    handleRequestError(error as AxiosError)
    throw error
  }
}
