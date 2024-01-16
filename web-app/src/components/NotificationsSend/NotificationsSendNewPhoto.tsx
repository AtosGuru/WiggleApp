import { FC } from 'react'
import Image from 'next/image'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import styles from '@/components/NotificationsSend/NotificationsSend.module.scss'

const NotificationsSendNewPhoto: FC = () => {
  return (
    <div className={styles.photo}>
      <SectionTitle leavel={3}>Preview</SectionTitle>
      <div className={styles.photoInner}>
        <Image
          src='/assets/images/notif-new.png'
          width={309}
          height={341}
          loading='lazy'
          alt='Notification'
        />
      </div>
      <div className={styles.photoTitle}>Out Of Notifications</div>
    </div>
  )
}

export default NotificationsSendNewPhoto