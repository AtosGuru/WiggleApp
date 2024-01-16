import { FC } from 'react'
import CreateEventNewList from '@/components/CreateEvent/CreateEventNewList'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'

const CreateEventNewImages: FC = () => {
  return (
    <div className={styles.createNewPhotoes}>
      <span className={styles.createNewLabel}>Images</span>
      <CreateEventNewList />
    </div>
  )
}

export default CreateEventNewImages