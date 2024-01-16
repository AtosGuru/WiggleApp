// actions.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Define the thunk action
export const fetchRoute = createAsyncThunk(
  'route/fetchRoute',
  async ({endCoords}: {endCoords: object}) => {
    const startCoords = [18.0686, 59.3293];
    const geometries = 'geojson';
    const routeProfile = 'driving';

    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/${routeProfile}/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=pk.eyJ1IjoiZGV0c3VtaSIsImEiOiJjbGxnaXZta3QwZGg5M2RtcGNkaWk5a242In0.FHD8TFpuSK8qJxmqNjfSww`,
      );

      const destinationCoordinates =
        response?.data?.routes[0]?.geometry?.coordinates;
      const distance = response?.data?.routes[0]?.distance;
      return distance;
    } catch (error) {
      console.log('error', error); // Let Redux Toolkit handle the error
    }
  },
);
