import { createSlice } from '@reduxjs/toolkit'

const notificationsReducer = createSlice({
  name: 'notifications',
  initialState: {
    isNotificationNewModalOpen: false,
    isSelectModalOpen: false,
    isSuccessModalOpen: false,
  },
  reducers: {
    setNotificationNewModalOpen(state, action) {
      state.isNotificationNewModalOpen = action.payload
    },
    setSelectModalOpen(state, action) {
      state.isSelectModalOpen = action.payload
    },
    setSuccessModalOpen(state, action) {
      state.isSuccessModalOpen = action.payload
    }
  }
})

export default notificationsReducer.reducer
export const { 
  setNotificationNewModalOpen,
  setSelectModalOpen,
  setSuccessModalOpen
 } = notificationsReducer.actions