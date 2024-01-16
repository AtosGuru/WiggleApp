import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Event from '@/components/Event/Event'
import styles from '@/components/Dashboard/Upcoming/Upcoming.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'

const UpcomingSlider: FC = () => {
  return (
    <Swiper
      className={styles.slider}
      modules={ [Navigation] }
      spaceBetween={22}
      slidesPerView={4}
      speed={500}
      navigation={{
        prevEl: `.${styles.navItemPrev}`,
        nextEl: `.${styles.navItemNext}`,
      }}
      breakpoints={{
        1367: {
          spaceBetween: 22,
          slidesPerView: 4
        },
        1025: {
          spaceBetween: 10,
          slidesPerView: 4
        },
        992: {
          spaceBetween: 20,
          slidesPerView: 3
        },
        769: {
          spaceBetween: 20,
          slidesPerView: 2
        },
        481: {
          spaceBetween: 20,
          slidesPerView: 2
        },
        0: {
          spaceBetween: 20,
          slidesPerView: 1.2
        }
      }}
    >
      <SwiperSlide>
        <Event />
      </SwiperSlide>
      <SwiperSlide>
        <Event />
      </SwiperSlide>
      <SwiperSlide>
        <Event />
      </SwiperSlide>
      <SwiperSlide>
        <Event />
      </SwiperSlide>
      <SwiperSlide>
        <Event />
      </SwiperSlide>
    </Swiper>
  )
}

export default UpcomingSlider