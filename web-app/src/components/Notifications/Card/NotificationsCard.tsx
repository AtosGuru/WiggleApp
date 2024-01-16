import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import styles from '@/components/Notifications/Card/NotificationsCard.module.scss'

const NotificationsCard: FC = () => {
  return (
    <div className={styles.card}>
      <SectionTitle leavel={3}>Notification sent last</SectionTitle>
      <div className={styles.count}>332</div>
      <div className={styles.subtitle}>Got the last notification</div>
    </div>
  )
}

export default NotificationsCard