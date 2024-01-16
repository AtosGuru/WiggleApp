import { FC } from 'react'
import ActiveTimesChart from '@/components/Analytics/ActiveTimes/ActiveTimesChart'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import styles from '@/components/Analytics/ActiveTimes/ActiveTimes.module.scss'

const ActiveTimes: FC = () => {
  return (
    <div className={styles.block}>
      <SectionTitle leavel={3}>Active times</SectionTitle>
      <ActiveTimesChart />
    </div>
  )
}

export default ActiveTimes