// mapSlice.js
import {createSlice} from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    routeCoordinates: [],
    DestinationLat: null,
    DestinationLng:null,
    startLocation:"",
    endLocation :"",
    distance:null

    
  },
  reducers: {
    setRouteCoordinates: (state, action) => {
      state.routeCoordinates = action.payload;
    },
    setDestinationLat: (state, action) => {
      state.DestinationLat = action.payload;
    },
    setDestinationLng: (state, action) => {
      state.DestinationLng = action.payload;
    },
    setStartLocation: (state, action) => {
      state.startLocation = action.payload;
    },
    setEndLocation: (state, action) => {
      state.endLocation = action.payload;
    },
    setDistance : (state, action) => {
      state.distance = action.payload;
    },
  },
});

export const {setRouteCoordinates, setDestinationLat,setDestinationLng,setStartLocation,setDistance,setEndLocation} = mapSlice.actions;

export default mapSlice.reducer;
