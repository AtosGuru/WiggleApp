
import { signOut } from 'next-auth/react'
import { AppDispatch } from '@/store'
import { setLogoutModal } from '@/store/reducers/profileReducer'
import { PAGE_ROUTES } from '@/constants/pageRoutes'

export const signOutAsync = () => {
  return async (dispatch: AppDispatch) => {
    await signOut({ redirect: false, callbackUrl: PAGE_ROUTES.login.route })

    dispatch(setLogoutModal(false))

    return PAGE_ROUTES.login.route
  }
}