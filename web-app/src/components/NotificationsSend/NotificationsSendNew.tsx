import { FC } from 'react'
import NotificationsSendNewPhoto from '@/components/NotificationsSend/NotificationsSendNewPhoto'
import NotificationsSendNewForm from '@/components/NotificationsSend/NotificationsSendNewForm'
import styles from '@/components/NotificationsSend/NotificationsSend.module.scss'

const NotificationsSendNew: FC = () => {
  return (
    <div className={styles.new}>
      <div className={styles.inner}>
        <NotificationsSendNewForm />
        <NotificationsSendNewPhoto />
      </div>
    </div>
  )
}

export default NotificationsSendNew