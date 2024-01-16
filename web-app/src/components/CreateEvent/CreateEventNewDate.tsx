import { FC, useEffect } from 'react'
import Image from 'next/image'
import DatePicker from '@/components/UI/DatePicker/DatePicker'
import Input from '@/components/UI/Field/Input'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { changeCreateNewDate, setOpenCreateNewDatepicker } from '@/store/reducers/eventsReducer'
import { datePath } from '@/constants/imagePaths'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'

const CreateEventNewDate: FC<any> = ({ register, errors, setValue }) => {
  const dispatch = useTypedDispatch()
  const { createNewStartDate: startDate, isOpenCreateNewDatepicker: isOpen } = useTypedSelector(state => state.events)
  
  const changeDateHandler = (date: Date | null) => {
    if (!date) {
      return
    }
    
    dispatch(changeCreateNewDate(date.toISOString()))
  }

  const openDatepickerHandler = () => {
    dispatch(setOpenCreateNewDatepicker(!isOpen))
  }

  const datePickerRef = useClickOutside(() => {
    dispatch(setOpenCreateNewDatepicker(false))
  })

  useEffect(() => {
    setValue('date', `${new Date(startDate).getDate()} ${new Date(startDate).toLocaleString('en-GB', { month: 'long' })}`)
  }, [startDate])
  
  return (
    <div className={styles.createNewDate}>
      <Input
        register={register}
        errors={errors}
        name='date'
        label='Date'
        id='create-new-date'
        type='text'
        readOnly
      />
      <button 
        className={`${styles.createNewDateBtn} ${isOpen ? styles.createNewDateBtnOpen : ''}`}
        type='button'
        onClick={openDatepickerHandler}
      >
        <span className={`${styles.createNewDateIcon} icon`}>
          <Image
            src={datePath}
            width={20}
            height={20}
            alt='Date'
          />
        </span>
        <span className={styles.createNewDateText}>Choose Date</span>
      </button>
      <div 
        className={`${styles.createNewDatepicker} ${isOpen ? styles.createEventDatepickerOpen : ''}`}
        ref={datePickerRef}
      >
        <DatePicker
          selected={new Date(startDate)}
          changeDate={changeDateHandler}
        />
      </div>
    </div>
  )
}

export default CreateEventNewDate