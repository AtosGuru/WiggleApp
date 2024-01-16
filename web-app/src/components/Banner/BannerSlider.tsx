import { FC } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
import styles from '@/components/Banner/Banner.module.scss'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const BannerSlider: FC = () => {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        className={styles.slider}
        modules={ [EffectFade, Pagination, Autoplay] }
        spaceBetween={0}
        slidesPerView={1}
        speed={500}
        effect='fade'
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          el: `.${styles.pagination}`,
          bulletClass: `${styles.paginationItem}`,
          bulletActiveClass: `${styles.paginationActive}`,
          renderBullet: (index, className) => {
            return (`<div class="${className}"></div>`)
          }
        }}
      >
        <SwiperSlide className={styles.sliderItem}>
          <Image
            src='/assets/images/dashboard-banner-1.png'
            width={563}
            height={406}
            loading='eager'
            alt='Dashboard banner 1'
            priority
          />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderItem}>
          <Image
            src='/assets/images/dashboard-banner-1.png'
            width={563}
            height={406}
            loading='lazy'
            alt='Dashboard banner 2'
          />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderItem}>
          <Image
            src='/assets/images/dashboard-banner-1.png'
            width={563}
            height={406}
            loading='lazy'
            alt='Dashboard banner 3'
          />
        </SwiperSlide>
        <SwiperSlide className={styles.sliderItem}>
          <Image
            src='/assets/images/dashboard-banner-1.png'
            width={563}
            height={406}
            loading='lazy'
            alt='Dashboard banner 4'
          />
        </SwiperSlide>
      </Swiper>
      <div className={styles.pagination} />
    </div>
  )
}

export default BannerSlider