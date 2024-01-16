import { FC } from 'react'
import styles from '@/components/Analytics/TopEvents/TopEvents.module.scss'

const TopEventsHeader: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerCell}>Name</div>
      <div className={styles.headerCell}>Pre-checks</div>
      <div className={styles.headerCell}>Check ins</div>
      <div className={styles.headerCell}>Bounce rate</div>
    </div>
  )
}

export default TopEventsHeader