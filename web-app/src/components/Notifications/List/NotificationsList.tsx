import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import NotificationsHeader from '@/components/Notifications/List/NotificationsHeader'
import NotificationsBody from '@/components/Notifications/List/NotificationsBody'
import styles from '@/components/Notifications/List/NotificationsList.module.scss'

const NotificationsList: FC = () => {
  return (
    <div className={styles.list}>
      <SectionTitle leavel={3}>Notifications</SectionTitle>
      <div className={styles.inner}>
        <NotificationsHeader />
        <NotificationsBody />
      </div>
    </div>
  )
}

export default NotificationsList