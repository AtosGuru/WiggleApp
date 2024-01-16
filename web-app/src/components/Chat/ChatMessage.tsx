import { FC } from 'react'
import Image from 'next/image'
import { MessageItemProps, MessageType } from '@/types/chatTypes'
import styles from '@/components/Chat/Chat.module.scss'

const ChatMessage: FC<MessageItemProps> = ({ id, type, path, message }) => {
  return (
    <div className={`${styles.message} ${type === MessageType.SENDER ? styles.sender : styles.owner}`}>
      <div className={styles.messagePhoto}>
        <div className={styles.messagePhotoInner}>
          <Image
            src={path}
            width={26}
            height={26}
            alt='Photo'
          />
        </div>
      </div>
      <p 
        className={styles.messageText}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  )
}

export default ChatMessage