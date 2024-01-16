import { FC } from 'react'
import styles from '@/components/Loader/Loader.module.scss'

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/>
      </svg>
    </div>
  )
}

export default Loader