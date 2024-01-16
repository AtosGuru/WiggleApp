import { FC } from 'react'
import dynamic from 'next/dynamic'
const ScrollView = dynamic(() => import('@/layout/ScrollView'), { ssr: false })
import TopEventsItem from '@/components/Analytics/TopEvents/TopEventsItem'
import styles from '@/components/Analytics/TopEvents/TopEvents.module.scss'

const TopEventsBody: FC = () => {
  return (
    <ScrollView
      classNames={[ styles.body ]}
    >
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
      <TopEventsItem />
    </ScrollView>
  )
}

export default TopEventsBody