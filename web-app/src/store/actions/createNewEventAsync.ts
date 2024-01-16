import { authorizedAxios } from '@/config/axios'
import { AppDispatch } from '@/store'
import { FormValues } from '@/types/commonTypes'
import { setCreateEventNewModal } from '@/store/reducers/eventsReducer'

export const createNewEventAsync = (data: FormValues, id: number, locationId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await authorizedAxios.post('/event', {
        title: data.name,
        image_id: 'd55047a8-eda5-4bb6-5473-591304ceaf00',
        connection_id: locationId,
        description: data.desc,
        location_id: locationId,
        url: null,
        // begin: '2023-12-13T00:00',
        user_id: id
      })

      dispatch(setCreateEventNewModal(false))
  
      console.log(res)
    } catch (e: unknown) {
      console.log((e as Error).message)
    }
  }
}