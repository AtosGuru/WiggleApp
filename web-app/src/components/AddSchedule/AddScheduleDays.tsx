import { FC } from 'react'
import AddScheduleDay from '@/components/AddSchedule/AddScheduleDay'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { AddScheuleDaysProps } from '@/types/profileTypes'
import styles from '@/components/AddSchedule/AddSchedule.module.scss'

const AddScheduleDays: FC<AddScheuleDaysProps> = ({ register, errors, clearErrors }) => {
  const missingSchedule = useTypedSelector(state => state.profile.missingSchedule)

  return (
    <div className={styles.days}>
      { missingSchedule.map(schedule => (
        <AddScheduleDay 
          info={schedule}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          key={schedule.id}
        />
      )) }
    </div>
  )
}

export default AddScheduleDays