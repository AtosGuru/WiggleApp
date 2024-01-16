import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import AddScheduleDays from '@/components/AddSchedule/AddScheduleDays'
import AddScheduleTime from '@/components/AddSchedule/AddScheduleTime'
import Button from '@/components/UI/Button/Button'
import Form from '@/components/UI/Form/Form'
import { ButtonSizes, ButtonTypes } from '@/types/commonTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { addNewScheduleAsync } from '@/store/actions/addNewScheduleAsync'
import { FormValues } from '@/types/commonTypes'
import styles from '@/components/AddSchedule/AddSchedule.module.scss'

const AddScheduleForm: FC = () => {
  const dispatch = useTypedDispatch()

  const { 
    register, 
    handleSubmit,
    reset, 
    control,
    clearErrors,
    formState: { errors } 
  } = useForm<FormValues>()
  
  const submitHandler: SubmitHandler<FormValues> = data => {
    dispatch(addNewScheduleAsync(data))
    reset()
  }
  
  return (
    <Form 
      className={styles.form}
      onSubmit={handleSubmit(submitHandler)}
    >
      <AddScheduleDays
        register={register}
        errors={errors}
        clearErrors={clearErrors}
      />
      <AddScheduleTime
        register={register}
        errors={errors}
        control={control}
      />
      <Button
        text='Add'
        size={ButtonSizes.LG}
        colored
        type={ButtonTypes.Submit}
        id='add-schedule'
      />
    </Form>
  )
}

export default AddScheduleForm