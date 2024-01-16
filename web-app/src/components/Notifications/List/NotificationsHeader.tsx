import { FC } from 'react'
import styles from '@/components/Notifications/List/NotificationsList.module.scss'

const NotificationsHeader: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerItem}>Subject</div>
      <div className={styles.headerItem}>Sent To</div>
      <div className={styles.headerItem}>Reach</div>
    </div>
  )
}

export default NotificationsHeader