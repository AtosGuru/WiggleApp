import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import CreateEventNewForm from '@/components/CreateEvent/CreateEventNewForm'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const CreateEventNew: FC = () => {
  const { isEditable } = useTypedSelector(state => state.events)
  
  return (
    <div className={styles.createNew}>
      <SectionTitle leavel={3}>
        { isEditable ? 'Edit Event' : 'Create New Event' }
      </SectionTitle>
      <CreateEventNewForm isEditable={isEditable} />
    </div>
  )
}

export default CreateEventNew