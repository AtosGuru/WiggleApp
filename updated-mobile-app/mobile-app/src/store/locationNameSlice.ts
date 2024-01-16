import { createSlice } from '@reduxjs/toolkit';

const locationNameSlice = createSlice({
    name: 'locationName',
    initialState: {
        currentLocation: 'Fetching Location',
        error: null,
    },
    reducers: {
        setLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateLocationData: (state, action) => {
            state.currentLocation = action.payload;
        },
    },
});

export const { setLocation, setError, updateLocationData } = locationNameSlice.actions;
export default locationNameSlice.reducer;
