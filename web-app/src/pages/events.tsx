import { FC, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { authorizedAxios } from '@/config/axios'
import Controls from '@/components/Events/Controls/Controls'
import EventsCalendar from '@/components/Events/EventsCalendar/EventsCalendar'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import MetaData from '@/layout/Metadata'
import { setEvents } from '@/store/reducers/eventsReducer'
import { setInfo } from '@/store/reducers/profileReducer'
import styles from '@/styles/Events.module.scss'

const Events: FC = ({ events, user }: any) => {  
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(setEvents(events))
    dispatch(setInfo(user))
  }, [])

  return (
    <div className={styles.events}>
      <MetaData title='Events' />
      <SectionTitle leavel={1}>Calender</SectionTitle>
      <div className={styles.inner}>
        <Controls />
        <EventsCalendar />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)
  
  //@ts-ignore
  const csrfToken = session.user['CSRF-TOKEN']
  //@ts-ignore
  const sessionId = session.user['X-SESSION-ID']
  //@ts-ignore
  const userId = session?.user.user.id

  authorizedAxios.defaults.headers['X-CSRF-TOKEN'] = csrfToken
  authorizedAxios.defaults.headers['X-SESSION-ID'] = sessionId

  const [ userData ] = await Promise.all([
    authorizedAxios.get(`/user/${userId}`)
  ])

  return {
    props: {
      events: userData.data.user[0].locations[0]?.events,
      user: userData.data.user[0]
    }
  };
}

export default Events