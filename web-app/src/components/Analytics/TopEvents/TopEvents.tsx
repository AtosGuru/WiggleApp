import { FC } from 'react'
import TopEventsTable from '@/components/Analytics/TopEvents/TopEventsTable'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import styles from '@/components/Analytics/TopEvents/TopEvents.module.scss'

const TopEvents: FC = () => {
  return (
    <div className={styles.block}>
      <SectionTitle leavel={3}>Top events</SectionTitle>
      <TopEventsTable />
    </div>
  )
}

export default TopEvents