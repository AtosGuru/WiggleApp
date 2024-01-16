import { FC } from 'react'
import styles from '@/components/EventBtns/EventBtns.module.scss'
import { EventBtnProps } from '@/types/eventsTypes'

const EventBtn: FC<EventBtnProps> = ({ text, isDisabled, ...props }) => {
  return (
    <button 
      className={`${styles.button} ${isDisabled ? styles.buttonDisabled : ''}`}
      {...props}
    >
      <span className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </button>
  )
}

export default EventBtn