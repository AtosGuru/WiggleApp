import {createSlice} from '@reduxjs/toolkit';
import {fetchRoute} from './routeThunk';

interface IRouteSlice {
  destinationCoordinates: object[];
  isLoading: boolean;
  error: string | undefined;
}

const routeSlice = createSlice<IRouteSlice>({
  name: 'route',
  initialState: {
    destinationCoordinates: [],
    isLoading: false,
    error: '',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRoute.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchRoute.fulfilled, (state, action) => {
        state.isLoading = false;
        state.destinationCoordinates = action.payload;
      })
      .addCase(fetchRoute.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const routeAction = routeSlice.actions;

export default routeSlice.reducer;
