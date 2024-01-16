import { FC } from 'react'
import Image from 'next/image'
import styles from '@/components/Event/Event.module.scss'
import { peoplePath, sharePath } from '@/constants/imagePaths'

const Event: FC = () => {
  return (
    <div className={styles.event}>
      <div className={styles.preview}>
        <Image
          src='/assets/images/event-1.png'
          width={310}
          height={224}
          loading='lazy'
          alt='Lönefredag'
        />
        <div className={styles.content}>
          <div className={styles.controls}>
            <div className={styles.badge}>18+</div>
            <button className={`${styles.share} icon`}>
              <Image
                src={sharePath}
                width={40}
                height={40}
                alt='Share'
              />
            </button>
          </div>
          <div className={styles.info}>
            <div className={styles.name}>Lönefredag</div>
            <div className={styles.date}>29 September</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.schdule}>
          <span>Friday</span>
          22:00-03:00
        </div>
        <div className={styles.reserve}>
          <div className={styles.count}>
            <div className={`${styles.countIcon} icon`}>
              <Image
                src={peoplePath}
                width={40}
                height={40}
                alt='Share'
              />
            </div>
            <div className={styles.countText}>200</div>
          </div>
          <div className={styles.type}>Pre-Checks</div>
        </div>
      </div>
    </div>
  )
}

export default Event