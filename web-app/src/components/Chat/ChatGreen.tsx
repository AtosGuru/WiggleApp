import { FC } from 'react'
import styles from '@/components/Chat/Chat.module.scss'

const ChatGreen: FC = () => {
  return (
    <div className={styles.greet}>Tap on a profile to see chats</div>
  )
}

export default ChatGreen