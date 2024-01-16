import { FC } from 'react'
import { AddScheduleDayProps } from '@/types/profileTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { selectMissingSchedule } from '@/store/reducers/profileReducer'
import styles from '@/components/AddSchedule/AddSchedule.module.scss'

const AddScheduleDay: FC<AddScheduleDayProps> = ({ info, register, errors, clearErrors }) => {
  const dispatch = useTypedDispatch()
  
  const selectMissingScheduleHandler = () => {
    dispatch(selectMissingSchedule(info.id))
    clearErrors('days')
  }
  
  return (
    <div className={styles.day}>
      <input 
        className={styles.input} 
        id={`day-${info.day.toLocaleLowerCase()}`} 
        type='radio'
        {...register('days', {
          required: true,
        })}
        onChange={selectMissingScheduleHandler}
      />
      <label 
        className={`${styles.label} ${errors.days ? styles.error : ''}`} 
        htmlFor={`day-${info.day.toLocaleLowerCase()}`}
      >
        {info.day}
      </label>
    </div>
  )
}

export default AddScheduleDay