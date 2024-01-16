import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import AddScheduleForm from '@/components/AddSchedule/AddScheduleForm'
import styles from '@/components/AddSchedule/AddSchedule.module.scss'

const AddSchedule: FC = () => {
  return (
    <div className={styles.add}>
      <SectionTitle leavel={3}>Add Schedule</SectionTitle>
      <AddScheduleForm />
    </div>
  )
}

export default AddSchedule