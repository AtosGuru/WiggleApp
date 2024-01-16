import { FC } from 'react'
import BannerContent from '@/components/Banner/BannerContent'
import BannerSlider from '@/components/Banner/BannerSlider'
import styles from '@/components/Banner/Banner.module.scss'

const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <BannerContent />
      <BannerSlider />
    </div>
  )
}

export default Banner