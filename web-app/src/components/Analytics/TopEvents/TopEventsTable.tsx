import { FC } from 'react'
import TopEventsHeader from '@/components/Analytics/TopEvents/TopEventsHeader'
import TopEventsBody from '@/components/Analytics/TopEvents/TopEventsBody'
import styles from '@/components/Analytics/TopEvents/TopEvents.module.scss'

const TopEventsTable: FC = () => {
  return (
    <div className={styles.table}>
      <TopEventsHeader />
      <TopEventsBody />
    </div>
  )
}

export default TopEventsTable