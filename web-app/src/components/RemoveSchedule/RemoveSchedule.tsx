import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import RemoveScheduleBtns from '@/components/RemoveSchedule/RemoveScheduleBtns'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { removeSchedule, setMissingSchedule, setRemoveModalOpen } from '@/store/reducers/profileReducer'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import styles from '@/components/RemoveSchedule/RemoveSchedule.module.scss'

const RemoveSchedule: FC = () => {
  const dispatch = useTypedDispatch()
  const selectedSchedule = useTypedSelector(state => state.profile.selectedSchedule)

  const positiveHandle = () => {
    dispatch(setRemoveModalOpen(false))
    dispatch(removeSchedule(selectedSchedule.id))
    dispatch(setMissingSchedule())
  }

  const negativeHandle = () => {
    dispatch(setRemoveModalOpen(false))
  }

  return (
    <div className={styles.remove}>
      <SectionTitle leavel={3}>Are you sure you want to delete <br /> {selectedSchedule.name} from your Schedule?</SectionTitle>
      <RemoveScheduleBtns 
        positiveHandle={positiveHandle} 
        negativeHandle={negativeHandle}
      />
    </div>
  )
}

export default RemoveSchedule