import { FC, useEffect } from 'react'
import Button from '@/components/UI/Button/Button'
import DatePicker from '@/components/UI/DatePicker/DatePicker'
import { ButtonTypes, ButtonSizes } from '@/types/commonTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setCreateEventModal } from '@/store/reducers/eventsReducer'
import { changeDate } from '@/store/reducers/eventsReducer'
import { plusPath } from '@/constants/imagePaths'
import styles from '@/components/Events/Controls/Controls.module.scss'

const Controls: FC = () => {
  const dispatch = useTypedDispatch()
  const startDate = useTypedSelector(state => state.events.startDate)

  const createEventHandler = () => {
    dispatch(setCreateEventModal(true))
  }

  const changeDateHandler = (date: Date | null) => {
    if (!date) {
      return
    }
    
    dispatch(changeDate(date.toISOString()))
  }

  // useEffect(() => {
  //   const date = startDate?.toLocaleDateString('en-GB').split('/').reverse().join('-')
    
  //   console.log(date)
  // }, [startDate])
  
  return (
    <div className={styles.controls}>
      <Button
        icon={plusPath}
        text='Create Event'
        size={ButtonSizes.MD}
        colored
        type={ButtonTypes.Button}
        id='create-event'
        onClick={createEventHandler}
      />
      <DatePicker
        selected={new Date(startDate)}
        changeDate={changeDateHandler}
      />
    </div>
  )
}

export default Controls