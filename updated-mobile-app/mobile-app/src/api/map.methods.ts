import { axiosInstance } from './axiosInstance'

import { LATTITUDE, LONGITUDE, CLUBTYPE } from '../constants/config'

export const MAPS_API_KEY = 'AIzaSyAwCAPkKVA-BDy029U9EKdsfLzSlTa2qkU'

type CoordsProps = {
  lat: number
  long: number
  searchInput?: string
}

type ClubDetails = {
  editorial_summary?: {
    language: string
    overview: string
  }
  formatted_address: string
  geometry: any
  name: string
  opening_hours: {
    open_now: boolean
    weekday_text: {
      [key: number]: string
    }[]
    periods: any[]
  }
  photos: {
    height: number
    html_attributions: string[]
    photo_reference: string
    width: number
  }[]
  place_id: string
  rating: number
  reference: string
  vicinity: string
}

export const getClubsPlaces = async (coords: CoordsProps | undefined) => {
  try {
  const response = await axiosInstance.get('api/place/nearbysearch/json', {
    baseURL: 'https://maps.googleapis.com/maps',
    params: {
      location: coords ? `${coords.lat},${coords.long}` : `${LATTITUDE},${LONGITUDE}`,
      radius: 2000,
      type: CLUBTYPE,
      keyword: coords?.searchInput ? `${CLUBTYPE}, ${coords.searchInput}` : CLUBTYPE,
      key: MAPS_API_KEY
    }    
  })
  return response
  
} catch (error) {
    console.log(error)
}
}

export const getClubDetails = async (clubId: string) => {
  const response = await axiosInstance.get('api/place/details/json', {
    baseURL: 'https://maps.googleapis.com/maps',
    params: {
      place_id: clubId,
      key: MAPS_API_KEY,
      fields:
        'formatted_address,name,geometry,photo,place_id,vicinity,opening_hours,reference,editorial_summary,rating'
    }
  })

  return response?.data?.result as ClubDetails
}