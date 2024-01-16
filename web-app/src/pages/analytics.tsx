import { FC } from 'react'
import Header from '@/components/Analytics/Header/Header'
import styles from '@/styles/Analytics.module.scss'
import Panel from '@/components/Analytics/Panel/Panel'
import Select from '@/components/Analytics/Select/Select'
import Info from '@/components/Analytics/Info/Info'
import Statistic from '@/components/Analytics/Statistic/Statistic'
import MetaData from '@/layout/Metadata'

const Analytics: FC = () => {
  return (
    <div className={styles.analytics}>
      <MetaData title='Analytics' />
      <Header />
      <Panel />
      <Select />
      <Info />
      <Statistic />
    </div>
  )
}

export default Analytics