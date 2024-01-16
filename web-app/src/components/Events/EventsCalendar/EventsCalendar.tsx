import { FC } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styles from '@/components/Events/EventsCalendar/EventsCalendar.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { dateSelect, eventClick, eventDrag, eventResize } from '@/store/reducers/eventsReducer'

const EventsCalendar: FC = () => {
  const dispatch = useTypedDispatch()
  const events = useTypedSelector(state => state.events.events)
  
  const eventDragHandler = (info: any) => dispatch(eventDrag(info))
  const eventClickHandler = (info: any) => dispatch(eventClick(info))
  const dateSelectHandler = (info: any) => {
    dispatch(dateSelect(info))
  }
  const eventResizeHandler = (info: any) => dispatch(eventResize(info))

  return (
    <div className={styles.calendar}>
      <FullCalendar
        editable={true}
        selectable={true}
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView={'dayGridMonth'}
        eventOrder={'title'}
        eventOrderStrict={true}
        longPressDelay={0}
        navLinks={false}
        weekends={true}
        events={events}
        height={'auto'}
        eventDrop={eventDragHandler}
        eventClick={eventClickHandler}
        select={dateSelectHandler}
        eventResize={eventResizeHandler}
        // datesSet={datesSet}
      />
    </div>
  )
}

export default EventsCalendar