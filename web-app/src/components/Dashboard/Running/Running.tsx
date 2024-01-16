import { FC } from 'react'
import Image from 'next/image'
import Button from '@/components/UI/Button/Button'
import { ButtonSizes, ButtonTypes } from '@/types/commonTypes'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import { timePath, userBadgePath } from '@/constants/imagePaths'
import styles from '@/components/Dashboard/Running/Running.module.scss'

const Running: FC = () => {
  return (
    <div className={styles.running}>
      <div className={styles.header}>
        <SectionTitle leavel={3}>Running Event</SectionTitle>
        <span className={styles.badge} />
      </div>
      <div className={styles.preview}>
        <Image
          src='/assets/images/running.png'
          width={1455}
          height={303}
          loading='eager'
          alt='Running'
          priority
        />
        <div className={styles.content}>
          <div className={styles.name}>Port Du Soleil</div>
          <div className={styles.date}>26 September</div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarItem}>
            <div className={styles.toolbarLabel}>
              <div className={`${styles.toolbarIcon} icon`}>
                <Image
                  src={userBadgePath}
                  width={24}
                  height={24}
                  alt='Check ins'
                />
              </div>
              <div className={styles.toolbarText}>Check ins</div>
            </div>
            <div className={styles.toolbarValue}>455</div>
          </div>
          <div className={styles.toolbarItem}>
            <div className={styles.toolbarLabel}>
              <div className={`${styles.toolbarIcon} icon`}>
                <Image
                  src={timePath}
                  width={24}
                  height={24}
                  alt='Time'
                />
              </div>
              <div className={styles.toolbarText}>Time</div>
            </div>
            <div className={styles.toolbarValue}>34min remaining</div>
          </div>
        </div>
        <Button
          text='Share event'
          size={ButtonSizes.SM}
          colored
          type={ButtonTypes.Button}
        />
      </div>
    </div>
  )
}

export default Running