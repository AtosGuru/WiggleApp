import { FC } from 'react'
import Card from '@/components/Analytics/Card/Card'
import styles from '@/components/Analytics/Info/Info.module.scss'

const Info: FC = () => {
  return (
    <div className={styles.info}>
      <Card
        title='Pre Checks' 
        totalCount='100' 
        maleCount='60' 
        femaleCount='40'
      />
      <Card
        title='Checked In' 
        totalCount='200' 
        maleCount='160' 
        femaleCount='40'
      />
      <Card
        title='Gender' 
        totalCount='200' 
        maleCount='160' 
        femaleCount='40'
        circularChart
      />
    </div>
  )
}

export default Info