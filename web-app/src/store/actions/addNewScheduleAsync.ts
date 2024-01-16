import { AppDispatch } from '@/store'
import { addMissingShedule, setAddModalOpen, setMissingSchedule } from '@/store/reducers/profileReducer'
import { FormValues } from '@/types/commonTypes'
import { delay } from '@/utils/delay'

export const addNewScheduleAsync = (data: FormValues) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAddModalOpen(false))

    await delay(300)

    dispatch(addMissingShedule(data))
    dispatch(setMissingSchedule())
  }
}