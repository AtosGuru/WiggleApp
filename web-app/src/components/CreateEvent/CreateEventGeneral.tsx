import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import EventBtns from '@/components/EventBtns/EventBtns'
import { EventBtnsProps } from '@/types/eventsTypes'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'

const CreateEventGeneral: FC<EventBtnsProps> = ({ createNewHandler, createTemplateHandler }) => {
  return (
    <div className={styles.createEventGeneral}>
      <SectionTitle leavel={3}>Create Event</SectionTitle>
      <EventBtns
        createNewHandler={createNewHandler}
        createTemplateHandler={createTemplateHandler}
      />
    </div>
  )
}

export default CreateEventGeneral