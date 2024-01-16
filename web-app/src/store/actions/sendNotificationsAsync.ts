import { AppDispatch } from '@/store'
import { setNotificationNewModalOpen, setSelectModalOpen, setSuccessModalOpen } from '@/store/reducers/notificationsReducer'
import { delay } from '@/utils/delay'

export const openSelectModalAsync = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setNotificationNewModalOpen(false))

    await delay(300)

    dispatch(setSelectModalOpen(true))
  }
}

export const sendNonificationsAsync = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setSelectModalOpen(false))

    await delay(300)

    dispatch(setSuccessModalOpen(true))
  }
}