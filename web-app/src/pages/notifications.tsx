import { FC } from 'react'
import MetaData from '@/layout/Metadata'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import CreateEventGeneral from '@/components/CreateEvent/CreateEventGeneral'
import NotificationsCard from '@/components/Notifications/Card/NotificationsCard'
import NotificationsList from '@/components/Notifications/List/NotificationsList'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { setNotificationNewModalOpen } from '@/store/reducers/notificationsReducer'
import styles from '@/styles/Notifications.module.scss'

const Notifications: FC = () => {
  const dispatch = useTypedDispatch()
  
  
  const openNewModalHandler = () => {
    dispatch(setNotificationNewModalOpen(true)) 
  }

  const openTemplateModalHandler = () => {
    console.log('Template')
  }

  return (
    <div className={styles.notifications}>
      <MetaData title='Notifications' />
      <SectionTitle leavel={1}>Notifications</SectionTitle>
      <div className={styles.inner}>
        <CreateEventGeneral 
          createNewHandler={openNewModalHandler} 
          createTemplateHandler={openTemplateModalHandler}
        />
        <NotificationsCard />
        <NotificationsList />
      </div>
    </div>
  )
}

export default Notifications