import { AppDispatch } from '@/store'
import { signIn } from 'next-auth/react'
import { setAuthError, setAuthErrorText } from '@/store/reducers/profileReducer'
import { FormValues } from '@/types/commonTypes'
import { PAGE_ROUTES } from '@/constants/pageRoutes'
import { selectAuthError } from '@/utils/selectAuthError'

export const signInAsync = (data: FormValues) => {
  return async (dispatch: AppDispatch) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res?.ok) {
      return PAGE_ROUTES.dashboard.route
    } else {
      dispatch(setAuthError(true))

      if (res?.status) {
        dispatch(setAuthErrorText(selectAuthError(res?.status)))
      }

      return null
    }
  }
}