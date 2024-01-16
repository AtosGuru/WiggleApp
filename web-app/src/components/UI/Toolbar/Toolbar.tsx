import { FC, useState } from 'react'
import Image from 'next/image'
import Overlay from '@/components/Overlay/Overlay'
import { dotsPath, userBadgePath, thrashPath } from '@/constants/imagePaths'
import styles from '@/components/UI/Toolbar/Toolbar.module.scss'

const Toolbar: FC = () => {
  const [ isOpen, setOpen ] = useState(false)
  
  return (
    <>
      <div 
        className={`${styles.toolbar} ${isOpen ? styles.open : ''}`}
      >
        <div 
          className={styles.current}
          onClick={() => setOpen(prev => !prev)}
        >
          <Image
            src={dotsPath}
            width={26}
            height={6}
            alt='Icon'
          />
        </div>
        <div className={`${styles.list} ${styles.right}`}>
          <div className={styles.item}>
            <div className={`${styles.icon} icon`}>
              <Image
                src={userBadgePath}
                width={20}
                height={20}
                alt='Icon'
              />
            </div>
            <div className={styles.text}>Block User</div>
          </div>
          <div className={styles.item}>
            <div className={`${styles.icon} icon`}>
              <Image
                src={thrashPath}
                width={20}
                height={20}
                alt='Icon'
              />
            </div>
            <div className={styles.text}>Delete chat</div>
          </div>
        </div>
      </div>
      <Overlay 
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </>
  )
}

export default Toolbar