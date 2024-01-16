import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.interface'

export interface AuthState {
  user: User | null
  updateChat: string | number | null
  updateNotification: boolean
}

const initialState: AuthState = {
  user: null,
  updateChat: null,
  updateNotification: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setChatIdToUpdate: (
      state,
      action: PayloadAction<string | number | null>
    ) => {
      state.updateChat = action.payload
    },
    setUpdateNotification: (state, action: PayloadAction<boolean>) => {
      state.updateNotification = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserData, setChatIdToUpdate, setUpdateNotification } =
  authSlice.actions

export default authSlice.reducer
