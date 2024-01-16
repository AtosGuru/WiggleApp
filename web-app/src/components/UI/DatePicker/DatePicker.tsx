import { DatePickerProps } from '@/types/commonTypes'
import { FC } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerWrapper: FC<DatePickerProps> = ({ selected, changeDate }) => {
  return (
    <DatePicker 
      selected={selected}
      onChange={changeDate}
      inline
    />
  )
}

export default DatePickerWrapper