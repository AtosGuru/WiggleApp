import { FC } from 'react'
import UpcomingHeader from '@/components/Dashboard/Upcoming/UpcomingHeader'
import UpcomingSlider from '@/components/Dashboard/Upcoming/UpcomingSlider'
import styles from '@/components/Dashboard/Upcoming/Upcoming.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'

const Upcoming: FC = () => {
  return (
    <div className={styles.upcoming}>
      <UpcomingHeader />
      <UpcomingSlider />
    </div>
  )
}

export default Upcoming