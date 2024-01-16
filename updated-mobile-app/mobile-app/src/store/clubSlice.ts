// clubSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchClubs } from './actionThunk' // Import the thunk action
import { getClubsPlaces } from '../api/map.methods'

import { Cache } from 'react-native-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ClubProps = {
  coordinates: [number, number]
  id: number
  name: string
  ratings: number
  data: {
    business_status: string
    icon: string
    icon_background_color: string
    icon_mask_base_uri: string
    opening_hours: {
      open_now: boolean
    }
    place_id: string
    plus_code: {
      compound_code: string
      global_code: string
    }
    reference: string
    scope: string
    types: string[]
    user_ratings_total: number
    vicinity: string
  }
  photos: {
    height: number
    html_attributions: string[]
    photo_reference: string
    width: number
  }[]
}

type InitialProps = {
  clubs: ClubProps[]
  locationWiseClubs: ClubProps[]
  isLoading: boolean
  error: any
}

const initialState: InitialProps = {
  clubs: [],
  locationWiseClubs: [],
  isLoading: false,
  error: null
}

const cache = new Cache({
  namespace: 'myapp',
  policy: {
    maxEntries: 50000, // if unspecified, it can have unlimited entries
    stdTTL: 0, // the standard TTL as a number in seconds, default: 0 (unlimited)
  },
  backend: AsyncStorage,
});

const fetchClubPlacesByLocation = async (coords: any) => { 
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
    
    console.log("Length is:::::::")
    console.log(response?.data?.results.length)
      
      const key = coords.searchInput;
      const latitude = coords.lat;
      const longitude = coords.long;
      
      // const cacheKey = `${key}_${latitude}_${longitude}`;
      const cacheKey = "Key"+key+"_"+latitude+"_"+longitude;

    console.log("========================");
    // const tempData = {
    //   latitude: 42.232,
    //   longitude: 42.30,
    //   apartment:"Mos"
    // }
    const str = JSON.stringify(clubData || {});
    // await cache.set(cacheKey, clubData); 
    await AsyncStorage.setItem(cacheKey, str);
    const res = await AsyncStorage.getItem(cacheKey);
    console.log(cacheKey, str,JSON.parse(res || "{}"), res);
    console.log("========================");
      return clubData // Return the data you fetched
    } catch (error) {
      console.log('fetchClubError', error) // Let Redux Toolkit handle the error
      throw error
    }
}

export const getClubsPlacesByLocation = createAsyncThunk(
  'clubs/getClubsPlacesByLocation',
  async (coords: any) => {
    const key = coords.searchInput;
    const latitude = coords.lat;
    const longitude = coords.long;
    
    // const cacheKey = `${key}_${latitude}_${longitude}`;
    const cacheKey = "Key" + key + "_" + latitude + "_" + longitude;
    // const cachedData = await cache.get(cacheKey);
    const d = await AsyncStorage.getItem(cacheKey);

    const cachedData = JSON.parse(d || "{}");

    console.log('cacheKey', cacheKey);
    console.log('cacheData', cachedData);

    if (cachedData && cachedData.length >0 ) {
      console.log('========================Using cached data======================');
      return cachedData;
    }

    console.log('==========================Fetching new data=======================');
    return fetchClubPlacesByLocation(coords);
  }
)


// export const getClubsPlacesByLocation = createAsyncThunk(
//   'clubs/getClubsPlacesByLocation',
//   async (coords: any  ) => {
//     try {
//       const response = await getClubsPlaces(coords)

//       const clubData = response?.data?.results.map(
//         ({ name, rating, photos, geometry, ...rest }: any) => ({
//           name: name,
//           id: Math.random(),
//           ratings: rating,
//           photos: photos,
//           coordinates: [geometry?.location?.lng, geometry?.location?.lat],
//           data: {
//             ...rest
//           }
//         })
//       )

//       return clubData // Return the data you fetched
//     } catch (error) {
//       console.log('fetchClubError', error) // Let Redux Toolkit handle the error
//       throw error
//     }
//   }
// )

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    resetClubState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchClubs.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.isLoading = false
        state.clubs = action.payload
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(getClubsPlacesByLocation.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getClubsPlacesByLocation.fulfilled, (state, action) => {
        state.isLoading = false
        state.locationWiseClubs = action.payload
      })
      .addCase(getClubsPlacesByLocation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { resetClubState } = clubSlice.actions
export default clubSlice.reducer
