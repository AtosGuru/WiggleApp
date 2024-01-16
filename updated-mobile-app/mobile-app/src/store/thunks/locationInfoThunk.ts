import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateLocationData } from '../locationNameSlice'; // Import the action creators from your updated slice
import { REVERSEGEOCODING_URL, MAPBOX_APIKEY } from '../../constants/config';
import { useSelector } from 'react-redux';
import { getPostsThunk } from './getPostsThunk';


export const fetchLocationDataThunk = createAsyncThunk("fetchLocationDataThunk", async (payload: any, thunkAPi) => {
    try {
        const apiUrl = `${REVERSEGEOCODING_URL}/${payload?.coords?.longitude},${payload?.coords?.latitude}.json?types=place&access_token=${MAPBOX_APIKEY}`;
        const response = await axios.get(apiUrl);
        const locationName = response?.data?.features[0]?.place_name || "Fetching Location"
        thunkAPi.dispatch(updateLocationData(locationName));
        thunkAPi.dispatch(getPostsThunk(locationName));
    } catch (error) {
        console.error(error);
    }
})

