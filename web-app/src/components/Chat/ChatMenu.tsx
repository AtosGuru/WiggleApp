import { FC, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { ChatStatuses } from '@/types/chatTypes'
import { useTypedSelector } from '@/hooks/useTypedSelector'
const Search = dynamic(() => import('@/components/UI/Search/Search'), { ssr: false })
const Overlay = dynamic(() => import('@/components/Overlay/Overlay'), { ssr: false })
const ScrollView = dynamic(() => import('@/layout/ScrollView'), { ssr: false })
import ChatItem from '@/components/Chat/ChatItem'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { setChatListOpen } from '@/store/reducers/messagesReducer'
import { useScreenSize } from '@/hooks/useScreenSize'
import { ScreenBreakpoints } from '@/types/commonTypes'
import styles from '@/components/Chat/Chat.module.scss'

const ChatMenu: FC = () => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const { isChatListOpen } = useTypedSelector(state => state.messages)
  const screenSize = useScreenSize()

  const closeMenuHandler = () => {
    dispatch(setChatListOpen(false))
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () =>  dispatch(setChatListOpen(false)))
  }, [])
  
  return (
    <>
      <div className={`${styles.menu} ${isChatListOpen ? styles.open : ''}`}>
        { screenSize && screenSize?.width <= ScreenBreakpoints.Tablet && ( <Search /> ) }
        <ScrollView
          classNames={[ styles.list ]}
        >
          <ChatItem
            id={1}
            isUnreadable={true}
            path='/assets/images/chat-1.png'
            name='Jim'
            excerpt='Hey Jim? How you doin’'
            status={ChatStatuses.OFFLINE}
            count={2}
          />
          <ChatItem
            id={2}
            isUnreadable={true}
            path='/assets/images/chat-2.png'
            name='Shan'
            excerpt='Omg! Did you see her on the Omg! Did you see her on the...'
            status={ChatStatuses.OFFLINE}
            count={2}
          />
          <ChatItem
            id={3}
            isUnreadable={true}
            path='/assets/images/chat-3.png'
            name='Sophia'
            excerpt='Omg! Did you see her on the Omg! Did you see her on the...'
            status={ChatStatuses.ONLINE}
            count={1}
          />
          <ChatItem
            id={4}
            isUnreadable={false}
            path='/assets/images/chat-4.png'
            name='Jenna'
            excerpt='I hope you’re fine'
            status={ChatStatuses.ONLINE}
            count={0}
          />
          <ChatItem
            id={5}
            isUnreadable={false}
            path='/assets/images/chat-5.png'
            name='John'
            excerpt='You looked really nice tonight'
            status={ChatStatuses.OFFLINE}
            count={0}
          />
          <ChatItem
            id={6}
            isUnreadable={false}
            path='/assets/images/chat-6.png'
            name='Kim'
            excerpt='Hey Kim? How you doin’'
            status={ChatStatuses.OFFLINE}
            count={0}
          />
          <ChatItem
            id={7}
            isUnreadable={false}
            path='/assets/images/chat-7.png'
            name='Samant'
            excerpt='Hey Jim? How you doin’'
            status={ChatStatuses.OFFLINE}
            count={2}
          />
          <ChatItem
            id={8}
            isUnreadable={false}
            path='/assets/images/chat-2.png'
            name='Shan'
            excerpt='I’m Outside'
            status={ChatStatuses.OFFLINE}
            count={2}
          />
          <ChatItem
            id={9}
            isUnreadable={true}
            path='/assets/images/chat-3.png'
            name='Sophia'
            excerpt='Omg! Did you see her on the Omg! Did you see her on the'
            status={ChatStatuses.ONLINE}
            count={1}
          />
          <ChatItem
            id={10}
            isUnreadable={false}
            path='/assets/images/chat-4.png'
            name='Jenna'
            excerpt='I hope you’re fine'
            status={ChatStatuses.ONLINE}
            count={0}
          />
          <ChatItem
            id={11}
            isUnreadable={false}
            path='/assets/images/chat-5.png'
            name='John'
            excerpt='You looked really nice tonight'
            status={ChatStatuses.OFFLINE}
            count={0}
          />
          <ChatItem
            id={12}
            isUnreadable={false}
            path='/assets/images/chat-6.png'
            name='Kim'
            excerpt='Hey Kim? How you doin’'
            status={ChatStatuses.OFFLINE}
            count={0}
          />
        </ScrollView>
      </div>
      { screenSize && screenSize?.width <= ScreenBreakpoints.Tablet && (
        <Overlay 
          isOpen={isChatListOpen} 
          setOpen={closeMenuHandler}
        />
      ) }
    </>
  )
}

export default ChatMenu