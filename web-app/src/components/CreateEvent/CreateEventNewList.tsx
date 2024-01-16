import { FC } from 'react'
import CreateEventNewPhoto from '@/components/CreateEvent/CreateEventNewPhoto'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'

const CreateEventNewList: FC = () => {
  const photoes = useTypedSelector(state => state.profile.uploadPhotoes)
  
  return (
    <div className={styles.createNewList}>
      { photoes.map(photo => (
        <CreateEventNewPhoto info={photo} key={photo.id} />
      )) }
    </div>
  )
}

export default CreateEventNewList