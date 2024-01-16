import { AppDispatch } from '@/store'
import { delay } from '@/utils/delay'
import { 
  setEditable, 
  setCreateEventModal, 
  setCreateEventNewModal, 
  setCreateEventTemplateModal 
} from '@/store/reducers/eventsReducer'

export const openNewEventType = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCreateEventModal(false))
    dispatch(setEditable(false))

    await delay(300)

    dispatch(setCreateEventNewModal(true))
  }
}

export const openTemplateEventType = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setCreateEventModal(false))
    dispatch(setEditable(false))

    await delay(300)

    dispatch(setCreateEventTemplateModal(true))
  }
}