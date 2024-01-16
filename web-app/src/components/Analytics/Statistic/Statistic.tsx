import { FC } from 'react'
import Card from '@/components/Analytics/Card/Card'
import styles from '@/components/Analytics/Statistic/Statistic.module.scss'

const Statistic: FC = () => {
  return (
    <div className={styles.statistic}>
      <Card 
        title='Analytics' 
        totalCount='0'
        progressChart
      />
      <Card 
        title='Analytics' 
        totalCount='20' 
        progressChart
      />
    </div>
  )
}

export default Statistic