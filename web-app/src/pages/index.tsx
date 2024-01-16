import { FC, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { authorizedAxios } from '@/config/axios'
import Banner from '@/components/Banner/Banner'
import Controls from '@/components/Dashboard/Controls/Controls'
import Running from '@/components/Dashboard/Running/Running'
import Upcoming from '@/components/Dashboard/Upcoming/Upcoming'
import MetaData from '@/layout/Metadata'
import { setInfo } from '@/store/reducers/profileReducer'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import styles from '@/styles/Dashboard.module.scss'

const Dashboard: FC = ({ user }: any) => {
  const dispatch = useTypedDispatch()

  console.log(user)

  useEffect(() => {
    dispatch(setInfo(user))
  }, [])

  return (
    <div className={styles.dashboard}>
      <MetaData title='Dashboard' />
      <Banner />
      <Controls />
      <Running />
      <Upcoming />
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
      user: userData.data.user[0],
    },
  }
}

export default Dashboard