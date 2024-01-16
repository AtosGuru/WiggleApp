import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import Form from '@/components/UI/Form/Form'
import Input from '@/components/UI/Field/Input'
import Checkbox from '@/components/UI/Checkbox/Checkbox'
import Button from '@/components/UI/Button/Button'
import Radios from '@/components/NotificationsSend/NotificationsSendNewRadios'
import { ButtonSizes, ButtonTypes, FormValues } from '@/types/commonTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { openSelectModalAsync } from '@/store/actions/sendNotificationsAsync'
import styles from '@/components/NotificationsSend/NotificationsSend.module.scss'

const NotificationsSendNewForm: FC = () => {
  const dispatch = useTypedDispatch()
  
  const { 
    register, 
    handleSubmit,
    reset, 
    control,
    clearErrors,
    setValue,
    formState: { errors } 
  } = useForm<FormValues>()

  const submitHandler: SubmitHandler<FormValues> = data => {
    dispatch(openSelectModalAsync())
    
    reset()
  }
  
  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit(submitHandler)}
    >
      <SectionTitle leavel={3}>Send Notifications</SectionTitle>
      <Input
        register={register}
        errors={errors}
        name='head'
        label='Head (Max 10 Characters)'
        id='create-new-head'
        type='text'
      />
      <Input
        register={register}
        errors={errors}
        name='info'
        label='Info (Max 30 Characters)'
        id='create-new-info'
        type='text'
      />
      <Radios />
      <Checkbox 
        label='Save this template for later'
      />
      <Button
        text='Send'
        colored
        size={ButtonSizes.LG}
        type={ButtonTypes.Submit}
        id='nonif-submit'
      />
    </Form>
  )
}

export default NotificationsSendNewForm