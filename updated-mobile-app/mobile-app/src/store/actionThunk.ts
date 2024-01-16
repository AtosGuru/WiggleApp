// actions.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/axiosInstance'
import { getClubsPlaces } from '../api/map.methods'

export const MAPS_API_KEY = 'AIzaSyAwCAPkKVA-BDy029U9EKdsfLzSlTa2qkU'
// Define the thunk action
type CoordsProps = {
  lat: number
  long: number
  searchInput?: string 
}
export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (coords: CoordsProps | undefined  ) => {
    try {
      const response = await getClubsPlaces(coords)

      const clubData = response?.data?.results.map(
        ({ name, rating, photos, geometry, ...rest }: any) => ({
          name: name,
          id: Math.random(),
          ratings: rating,
          photos: photos,
          coordinates: [geometry?.location?.lng, geometry?.location?.lat],
          data: {
            ...rest
          }
        })
      )

      return clubData // Return the data you fetched
    } catch (error) {
      console.log('fetchClubError', error) // Let Redux Toolkit handle the error
      throw error
    }
  }
)
