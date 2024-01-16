import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ChatItemProps, ChatStatuses } from '@/types/chatTypes'
import { PAGE_ROUTES } from '@/constants/pageRoutes'
import styles from '@/components/Chat/Chat.module.scss'

const ChatItem: FC<ChatItemProps> = ({ id, isUnreadable, path, name, excerpt, status, count }) => {
  const { query } = useRouter()

  return (
    <div 
      className={
        `${styles.item} ${isUnreadable ? styles.unreadable : ''} ${id == query.id ? styles.active : ''}`
      }>
      <Link className={styles.link} href={`${PAGE_ROUTES.messages.route}/${id}`} />
      <div className={styles.controls}>
        { !!count && <span className={styles.count}>{count}</span> }
        { status === ChatStatuses.ONLINE && <span className={styles.status} /> }
        <div className={styles.photo}>
          <Image
            src={path}
            width={50}
            height={50}
            alt={name}
          />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div 
          className={styles.excerpt}
          data-text={excerpt}
        >
          {excerpt}
        </div>
      </div>
    </div>
  )
}

export default ChatItem