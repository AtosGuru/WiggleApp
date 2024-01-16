
import { FC } from 'react'
import Image from 'next/image'
import Toolbar from '@/components/UI/Toolbar/Toolbar'
import { backArrowPath } from '@/constants/imagePaths'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { setChatListOpen } from '@/store/reducers/messagesReducer'
import styles from '@/components/Chat/Chat.module.scss'

const ChatHeader: FC = () => {
  const dispatch = useTypedDispatch()
  
  const openChatListHandler = () => {
    dispatch(setChatListOpen(true))
  }
  
  return (
    <div className={styles.header}>
      <div 
        className={`${styles.back} icon`}
        onClick={openChatListHandler}
      >
        <Image
          src={backArrowPath}
          width={22}
          height={22}
          alt='Back'
        />
      </div>
      <div className={styles.title}>Samant</div>
      <Toolbar />
    </div>
  )
}

export default ChatHeader