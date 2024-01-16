import { FC } from 'react'
import styles from '@/components/Notifications/List/NotificationsList.module.scss'

const NotificationsItem: FC = () => {
  return (
    <div className={styles.bodyItem}>
      <div className={styles.bodyPart}>Want to Party?</div>
      <div className={styles.bodyPart}>Online users</div>
      <div className={styles.bodyPart}>570</div>
    </div>
  )
}

export default NotificationsItem