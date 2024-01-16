import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  currentLang: string
}

const initialState: AuthState = {
  currentLang: 'en'
}

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.currentLang = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLang } = langSlice.actions

export default langSlice.reducer
