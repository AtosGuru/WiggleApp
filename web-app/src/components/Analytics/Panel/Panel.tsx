import { FC } from 'react'
import styles from '@/components/Analytics/Panel/Panel.module.scss'
import ActiveTimes from '@/components/Analytics/ActiveTimes/ActiveTimes'
import TopEvents from '@/components/Analytics/TopEvents/TopEvents'
import Card from '@/components/Analytics/Card/Card'

const Panel: FC = () => {
  return (
    <div className={styles.panel}>
      <Card 
        title='Daily Average' 
        totalCount='76' 
        maleCount='40' 
        femaleCount='36'
      />
      <Card 
        title='Online Users' 
        totalCount='332' 
        desc='<span>+23%</span> since last month'
      />
      <ActiveTimes />
      <TopEvents />
    </div>
  )
}

export default Panel