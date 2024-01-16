import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import UpcomingNav from '@/components/Dashboard/Upcoming/UpcomingNav'
import styles from '@/components/Dashboard/Upcoming/Upcoming.module.scss'

const UpcomingHeader: FC = () => {
  return (
    <div className={styles.header}>
      <SectionTitle leavel={3}>Upcoming Events</SectionTitle>
      <UpcomingNav />
    </div>
  )
}

export default UpcomingHeader