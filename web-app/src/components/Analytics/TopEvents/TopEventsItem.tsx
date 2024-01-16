import { FC } from 'react'
import styles from '@/components/Analytics/TopEvents/TopEvents.module.scss'

const TopEventsItem: FC = () => {
  return (
    <div className={styles.item}>
      <div className={styles.bodyCell}>
        <div className={styles.name}>John De Son</div>
        <div className={styles.date}>22 DEC 7:20 PM</div>
      </div>
      <div className={styles.bodyCell}>
        <div className={styles.count}>480</div>
      </div>
      <div className={styles.bodyCell}>
        <div className={styles.count}>470</div>
      </div>
      <div className={styles.bodyCell}>
        <div className={styles.count}>0%</div>
      </div>
    </div>
  )
}

export default TopEventsItem