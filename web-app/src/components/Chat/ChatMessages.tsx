import { FC } from 'react'
import dynamic from 'next/dynamic'
import ChatMessage from '@/components/Chat/ChatMessage'
import { MessageType } from '@/types/chatTypes'
import { ScrollViewOffset } from '@/types/commonTypes'
const ScrollView = dynamic(() => import('@/layout/ScrollView'), { ssr: false, })
import styles from '@/components/Chat/Chat.module.scss'

const ChatMessages: FC = () => {
  return (
    <ScrollView
      classNames={[ styles.messages ]}
      offset={ScrollViewOffset.Bot}     
    >
      <ChatMessage
        id={1}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello! How are you? I plan to go to the club today, where I was last time. How are you? Will you form a company?'
      />
      <ChatMessage
        id={2}
        type={MessageType.OWNEW}
        path='/assets/images/message-ownew.png'
        message='Hello! I`m ok! Thank you for not forgetting. I`ll gladly join you'
      />
      <ChatMessage
        id={3}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello! How are you? I plan to go to the club today, where I was last time. How are you? Will you form a company?'
      />
      <ChatMessage
        id={4}
        type={MessageType.OWNEW}
        path='/assets/images/message-ownew.png'
        message='Hello! I`m ok! Thank you for not forgetting. I`ll gladly join you'
      />
      <ChatMessage
        id={5}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello! How are you? I plan to go to the club today, where I was last time. How are you? Will you form a company?'
      />
      <ChatMessage
        id={6}
        type={MessageType.OWNEW}
        path='/assets/images/message-ownew.png'
        message='Hello! I`m ok! Thank you for not forgetting. I`ll gladly join you'
      />
      <ChatMessage
        id={7}
        type={MessageType.OWNEW}
        path='/assets/images/message-ownew.png'
        message='Hello! I`m ok! Thank you for not forgetting. I`ll gladly join you'
      />
      <ChatMessage
        id={8}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello! How are you? I plan to go to the club today, where I was last time. How are you? Will you form a company?'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello! How are you? I plan to go to the club today, where I was last time. How are you? Will you form a company?'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='12121'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello! How are you? I plan to go to the club today, where I was last time. How are you? Will you form a company?'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='12121'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello! How are you? I plan to go to the club today, where I was last time. How are you? Will you form a company?'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='12121'
      />
      <ChatMessage
        id={9}
        type={MessageType.SENDER}
        path='/assets/images/message-sender.png'
        message='Hello'
      />
    </ScrollView>
  )
}

export default ChatMessages