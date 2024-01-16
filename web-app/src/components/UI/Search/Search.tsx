import { FC } from 'react'
import Image from 'next/image'
import { searchPath } from '@/constants/imagePaths'
import styles from '@/components/UI/Search/Search.module.scss'

const Search: FC = () => {
  return (
    <div className={styles.search}>
      <span className={`${styles.icon} icon`}>
        <Image
          src={searchPath}
          width={102}
          height={113}
          alt='Search'
        />
      </span>
      <input className={styles.inp} type="text" placeholder='Search' />
    </div>
  )
}

export default Search