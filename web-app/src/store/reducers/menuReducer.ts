import { createSlice } from '@reduxjs/toolkit'

const menuReducer = createSlice({
  name: 'menu',
  initialState: {
    isMenuOpen: false
  },
  reducers: {
    setMenuOpen(state, action) {
      state.isMenuOpen = action.payload
    },
  }
})

export default menuReducer.reducer
export const { setMenuOpen } = menuReducer.actions