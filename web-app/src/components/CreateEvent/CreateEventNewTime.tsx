import { FC } from 'react'
import Input from '@/components/UI/Field/Input'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'
import { InputMasks } from '@/types/commonTypes'

const CreateEventNewTime: FC<any> = ({ register, errors, control }) => {
  return (
    <div className={styles.createNewTime}>
      <Input
        mask={InputMasks.Time}
        register={register}
        errors={errors}
        control={control}
        name='start'
        label='Time'
        id='create-new-start'
        type='text'
      />
      <Input
        mask={InputMasks.Time}
        register={register}
        errors={errors}
        control={control}
        name='end'
        id='create-new-end'
        type='text'
      />
      <span className={styles.createNewSeparator}>To</span>
    </div>
  )
}

export default CreateEventNewTime