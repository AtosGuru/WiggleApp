import { AppDispatch } from '@/store'
import { setOpenGreet } from '@/store/reducers/profileReducer'
import { setCreateEventNewModal } from '@/store/reducers/eventsReducer'
import { delay } from '@/utils/delay'

export const openCreateNewEventAsync = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setOpenGreet(false))

    await delay(200)

    dispatch(setCreateEventNewModal(true))
  }
}