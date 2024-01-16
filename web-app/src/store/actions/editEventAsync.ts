import { AppDispatch } from '@/store'
import { delay } from '@/utils/delay'
import { setEditable, setInfoModalOpen, setCreateEventNewModal } from '@/store/reducers/eventsReducer'

export const openEditModalAsync = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setInfoModalOpen(false))
    dispatch(setEditable(true))

    await delay(300)

    dispatch(setCreateEventNewModal(true))
  }
}