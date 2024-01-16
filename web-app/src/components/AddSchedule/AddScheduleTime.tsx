import { FC } from 'react'
import Input from '@/components/UI/Field/Input'
import { InputMasks } from '@/types/commonTypes'
import { AddScheuleTimeProps } from '@/types/profileTypes'
import styles from '@/components/AddSchedule/AddSchedule.module.scss'

const AddScheduleTime: FC<AddScheuleTimeProps> = ({ register, errors, control }) => {
  return (
    <div className={styles.time}>
      <Input
        mask={InputMasks.Time}
        register={register}
        errors={errors}
        control={control}
        type='text' 
        name='start'
        placeholder='Opening'
      />
      <Input 
        mask={InputMasks.Time}
        register={register}
        errors={errors}
        control={control}
        type='text' 
        name='end'
        placeholder='Closing'
      />
    </div>
  )
}

export default AddScheduleTime