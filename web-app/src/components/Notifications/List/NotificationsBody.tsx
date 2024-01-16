import { FC } from 'react'
import dynamic from 'next/dynamic'
import NotificationsItem from '@/components/Notifications/List/NotificationsItem'
const ScrollView = dynamic(() => import('@/layout/ScrollView'), { ssr: false })
import styles from '@/components/Notifications/List/NotificationsList.module.scss'

const NotificationsBody: FC = () => {
  return (
    <ScrollView 
      classNames={[ styles.body ]}
    >
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
      <NotificationsItem />
    </ScrollView>
  )
}

export default NotificationsBody