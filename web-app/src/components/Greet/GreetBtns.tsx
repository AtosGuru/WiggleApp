import { FC } from 'react'
import { useRouter } from 'next/router'
import Button from '@/components/UI/Button/Button'
import { ButtonSizes, ButtonTypes } from '@/types/commonTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { setOpenGreet } from '@/store/reducers/profileReducer'
import { openCreateNewEventAsync } from '@/store/actions/openCreateNewEventAsync'
import { PAGE_ROUTES } from '@/constants/pageRoutes'
import styles from '@/components/Greet/Greet.module.scss'

const GreetBtns: FC = () => {
  const dispatch = useTypedDispatch()
  const router = useRouter()

  const redirectToProfileHandler = () => {
    router.push(PAGE_ROUTES.profile.route).then(() => dispatch(setOpenGreet(false)))
  }

  const openCreateNewEventHandler = () => {
    dispatch(openCreateNewEventAsync())
  }
  
  return (
    <div className={styles.btns}>
      <Button
        text='Create New Event'
        size={ButtonSizes.LG}
        colored
        type={ButtonTypes.Submit}
        id='greet-create-event'
        onClick={openCreateNewEventHandler}
      />
      <Button
        text='Finish club profile'
        size={ButtonSizes.LG}
        type={ButtonTypes.Submit}
        id='greet-finish-profile'
        onClick={redirectToProfileHandler}
      />
    </div>
  )
}

export default GreetBtns