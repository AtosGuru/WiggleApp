import { FC } from 'react'
import Image from 'next/image'
import DatePicker from '@/components/UI/DatePicker/DatePicker'
import { datePath } from '@/constants/imagePaths'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { changeCreateTemplateDate, setOpenCreateTemplateDatepicker } from '@/store/reducers/eventsReducer'
import { useClickOutside } from '@/hooks/useClickOutside'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'

const CreateEventTemplateFilter: FC = () => {
  const dispatch = useTypedDispatch()
  const { createTemplateStartDate: startDate, isOpenCreateTemplateDatepicker: isOpen } = useTypedSelector(state => state.events)

  const datePickerRef = useClickOutside(() => {
    dispatch(setOpenCreateTemplateDatepicker(false))
  })

  const changeDateHandler = (date: Date | null) => {
    if (!date) {
      return
    }
    
    dispatch(changeCreateTemplateDate(date.toISOString()))
  }

  const openDatepickerHandler = () => {
    dispatch(setOpenCreateTemplateDatepicker(!isOpen))
  }

  return (
    <div className={styles.createTemplateFilter}>
      <button 
        className={`${styles.createTemplateBtn} ${isOpen ? styles.createTemplateBtnOpen : ''}`}
        onClick={openDatepickerHandler}
      >
        <span className={`${styles.createTemplateIcon} icon`}>
          <Image
            src={datePath}
            width={20}
            height={20}
            alt='Date'
          />
        </span>
        <span className={styles.createTemplateText}>Choose Date</span>
      </button>
      <div 
        className={`${styles.createTemplateDatepicker} ${isOpen ? styles.createEventDatepickerOpen : ''}`}
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

export default CreateEventTemplateFilter