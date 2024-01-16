import { FC } from 'react'
import Image from 'next/image'
import { editPath } from '@/constants/imagePaths'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { openEditModalAsync } from '@/store/actions/editEventAsync'
import styles from '@/components/InfoEvent/InfoEvent.module.scss'

interface InfoEventPreviewProps {
  image: string
  title: string
  start: string
  end: string
}

const InfoEventPreview: FC<InfoEventPreviewProps> = ({ image, title, start, end }) => {
  const dispatch = useTypedDispatch()
  
  const openEditModalHandler = () => {
    dispatch(openEditModalAsync())
  }
  
  return (
    <div className={styles.preview}>
      <Image
        src={image}
        width={662}
        height={362}
        loading='lazy'
        alt={title}
      />
      <div className={styles.content}>
        <span 
          className={styles.edit}
          onClick={openEditModalHandler}
        >
          <Image
            src={editPath}
            width={15}
            height={15}
            alt='Edit'
          />
        </span>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>
          { start !== end ? `${start} - ${end}` : start }
        </div>
      </div>
    </div>
  )
}

export default InfoEventPreview