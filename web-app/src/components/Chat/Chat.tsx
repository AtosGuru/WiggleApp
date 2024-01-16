import { FC } from 'react'
import ChatBlock from '@/components/Chat/ChatBlock'
import ChatMenu from '@/components/Chat/ChatMenu'
import ChatGreen from '@/components/Chat/ChatGreen'
import { ChatInfoProps } from '@/types/messagesTypes'
import styles from '@/components/Chat/Chat.module.scss'

const Chat: FC<ChatInfoProps> = ({ isDefault }) => {
  return (
    <div className={styles.chat}>
      <ChatMenu />
      { isDefault ? <ChatGreen /> : <ChatBlock /> }
    </div>
  )
}

export default Chat