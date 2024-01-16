import { FC } from 'react'
import ScheduleItem from '@/components/Profile/Schedule/ScheduleItem'
import Button from '@/components/UI/Button/Button'
import { ButtonSizes, ButtonTypes } from '@/types/commonTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setAddModalOpen } from '@/store/reducers/profileReducer'
import { ScheduleListProps } from '@/types/profileTypes'
import styles from '@/components/Profile/Schedule/Schedule.module.scss'

const ScheduleList: FC<ScheduleListProps> = ({ register, errors, control }) => {
  const dispatch = useTypedDispatch()
  const { isEditable, schedule, missingSchedule } = useTypedSelector(state => state.profile)

  const openAddModalHandler = () => {
    dispatch(setAddModalOpen(true))
  }
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        { schedule.map(item => (
          <ScheduleItem 
            info={item}
            isEditable={isEditable} 
            register={register}
            errors={errors}
            control={control}
            key={item.id}
          />
        )) }
      </div>
      <Button
        text='Add Schedule'
        size={ButtonSizes.MD}
        type={ButtonTypes.Button}
        id='add-schedule'
        style={{ 
          opacity: (missingSchedule[0]?.day.length && isEditable) ? '1' : '0', 
          pointerEvents: (missingSchedule[0]?.day.length && isEditable) ? 'auto' : 'none' 
        }}
        onClick={openAddModalHandler}
      />
    </div>
  )
}

export default ScheduleList