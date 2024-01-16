import { FC } from 'react'
import InfoEventPreview from '@/components/InfoEvent/InfoEventPreview'
import InfoEventToolbar from '@/components/InfoEvent/InfoEventToolbar'
import InfoEventText from '@/components/InfoEvent/InfoEventText'
import styles from '@/components/InfoEvent/InfoEvent.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const InfoEvent: FC = () => {
  const { oldEventId, events } = useTypedSelector(state => state.events)
  const currentEvent = events.find(event => event.id === oldEventId)

  if (!currentEvent) return

  return (
    <div className={styles.info}>
      <InfoEventPreview
        image={currentEvent.image}
        title={currentEvent.title}
        start={currentEvent.start}
        end={currentEvent.end}
      />
      <InfoEventToolbar />
      <InfoEventText 
        desc={currentEvent.description}
      />
    </div>
  )
}

export default InfoEvent