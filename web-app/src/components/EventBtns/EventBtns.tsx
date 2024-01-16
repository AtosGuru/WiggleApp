import { FC } from 'react'
import styles from '@/components/EventBtns/EventBtns.module.scss'
import EventBtn from '@/components/EventBtns/EventBtn'
import { EventBtnsProps } from '@/types/eventsTypes'
import { ButtonTypes } from '@/types/commonTypes'

const EventBtns: FC<EventBtnsProps> = ({ createNewHandler, createTemplateHandler }) => {
  return (
    <div className={styles.buttons}>
      <EventBtn
        text='Create new event'
        type={ButtonTypes.Button}
        onClick={createNewHandler}
      />
      <EventBtn
        text='Browse saved templates'
        // isDisabled
        type={ButtonTypes.Button}
        onClick={createTemplateHandler}
      />
    </div>
  )
}

export default EventBtns