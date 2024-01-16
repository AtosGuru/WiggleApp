import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import styles from '@/components/Analytics/Header/Header.module.scss'

const HeaderText: FC = () => {
  return (
    <div className={styles.text}>
      <SectionTitle leavel={1}>Analytics</SectionTitle>
      <div className={styles.name}>Trädgår'n</div>
    </div>
  )
}

export default HeaderText