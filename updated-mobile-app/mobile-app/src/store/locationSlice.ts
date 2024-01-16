// mapSlice.js
import { GeolocationResponse } from '@react-native-community/geolocation'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type LocationReducer = {
  position: GeolocationResponse | null
  currentLocation: string
}

const initialState: LocationReducer = {
  position: null,
  currentLocation: ''
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setPosition: (state, action: PayloadAction<GeolocationResponse | null>) => {
      state.position = action.payload
    },
    setLocation: (state, action: PayloadAction<GeolocationResponse | null>) => {
      state.currentLocation = action.payload
    }
  }
})

export const { setPosition, setLocation } = locationSlice.actions

export default locationSlice.reducer
