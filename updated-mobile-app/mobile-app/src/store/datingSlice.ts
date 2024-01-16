import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/user.interface'

const initialState = {
  user: null,
}

export const datingSlice = createSlice({
  name: 'dating',
  initialState,
  reducers: {
    setDatingUser: (state, action: PayloadAction) => {
      state.user = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setDatingUser } = datingSlice.actions

export default datingSlice.reducer