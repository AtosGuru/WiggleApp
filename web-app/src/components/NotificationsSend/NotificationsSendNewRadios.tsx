import { FC } from 'react'
import styles from '@/components/NotificationsSend/NotificationsSend.module.scss'

const NotificationsSendNewRadios: FC = () => {
  return (
    <div className={styles.radios}>
      <span className={styles.label}>Send to</span>
      <div className={styles.radiosInner}>
        <label className={styles.radio}>
          <input type='radio' name='send' />
          <span className={styles.radioText}>Online users</span>
        </label>
        <label className={styles.radio}>
          <input type='radio' name='send' />
          <span className={styles.radioText}>Previous Guests</span>
        </label>
      </div>
    </div>
  )
}

export default NotificationsSendNewRadios