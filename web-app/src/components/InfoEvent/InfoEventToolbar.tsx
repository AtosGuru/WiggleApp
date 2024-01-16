import { FC } from 'react'
import Image from 'next/image'
import { peoplePath, timePath } from '@/constants/imagePaths'
import styles from '@/components/InfoEvent/InfoEvent.module.scss'
import Button from '../UI/Button/Button'
import { ButtonSizes, ButtonTypes } from '@/types/commonTypes'

const InfoEventToolbar: FC = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.inner}>
        <div className={styles.item}>
          <div className={styles.icon}>
            <Image
              src={peoplePath}
              width={24}
              height={24}
              alt='People'
            />
          </div>
          <div className={styles.label}>Pre-Checks</div>
          <div className={styles.value}>255</div>
        </div>
        <div className={styles.item}>
          <div className={styles.icon}>
            <Image
              src={timePath}
              width={24}
              height={24}
              alt='People'
            />
          </div>
          <div className={styles.label}>Time until event</div>
          <div className={styles.value}>2 days and 3 hours</div>
        </div>
      </div>
      <Button
        text='Share event'
        size={ButtonSizes.MD}
        colored
        type={ButtonTypes.Button}
        id='share-modal-event'
      />
    </div>
  )
}

export default InfoEventToolbar