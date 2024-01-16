import { FC } from 'react'
import ChatHeader from '@/components/Chat/ChatHeader'
import ChatFooter from '@/components/Chat/ChatFooter'
import ChatMessages from '@/components/Chat/ChatMessages'
import styles from '@/components/Chat/Chat.module.scss'

const ChatBlock: FC = () => {
  return (
    <div className={styles.block}>
      <ChatHeader />
      <ChatMessages />
      <ChatFooter />
    </div>
  )
}

export default ChatBlock