import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import GalleryItem from '@/components/Profile/Gallery/GalleryItem'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import styles from '@/components/Profile/Gallery/Gallery.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'

const Gallery: FC = () => {
  const { photoes, isEditable } = useTypedSelector(state => state.profile)
  
  return (
    <div className={styles.gallery}>
      <Swiper
        className={styles.slider}
        modules={ [Navigation] }
        spaceBetween={22}
        slidesPerView={4}
        speed={500}
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
        { photoes.map(photo => (
          <SwiperSlide key={photo.id}>
            <GalleryItem 
              info={photo} 
              isEditable={isEditable}
            />
          </SwiperSlide>
        )) }
      </Swiper>
    </div>
  )
}

export default Gallery