import { FC } from 'react'
import Image from 'next/image'
import styles from '@/components/Dashboard/Upcoming/Upcoming.module.scss'

const UpcomingNav: FC = () => {
  return (
    <div className={styles.nav}>
      <div className={`${styles.navItem} ${styles.navItemPrev} icon`}>
        <Image
          src='/assets/icons/circle-arrow.svg'
          width={16}
          height={16}
          loading='eager'
          alt='Nav Left'
        />
      </div>
      <div className={`${styles.navItem} ${styles.navItemNext} icon`}>
        <Image
          src='/assets/icons/circle-arrow.svg'
          width={16}
          height={16}
          loading='eager'
          alt='Nav Left'
        />
      </div>
    </div>
  )
}

export default UpcomingNav