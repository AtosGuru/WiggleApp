import { authorizedAxios } from '@/config/axios'
import { AppDispatch } from '@/store'
import { deleteEvent, setCreateEventNewModal } from '@/store/reducers/eventsReducer'

export const deleteEventAsync = (id: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await authorizedAxios.delete(`/event/${id}`)

      dispatch(setCreateEventNewModal(false))
      dispatch(deleteEvent(id))
      
      console.log(res)
    } catch (e: unknown) {
      console.error((e as Error).message)
    } 
  }
}