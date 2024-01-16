import { FC, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { getSession } from 'next-auth/react'
import { authorizedAxios } from '@/config/axios'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import MetaData from '@/layout/Metadata'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
const Search = dynamic(() => import('@/components/UI/Search/Search'), { ssr: false })
import ChatInfo from '@/components/Chat/Chat'
import { setInfo } from '@/store/reducers/profileReducer'
import styles from '@/styles/Messages.module.scss'

const Messages: FC<any> = ({ user }) => {
  const dispatch = useTypedDispatch()
  
  useEffect(() => {
    dispatch(setInfo(user))
  }, [])
  
  return (
    <div className={styles.messages}>
      <MetaData title='Messages' />
      <SectionTitle leavel={1}>Messages</SectionTitle>
      <Search />
      <ChatInfo isDefault />
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

export default Messages