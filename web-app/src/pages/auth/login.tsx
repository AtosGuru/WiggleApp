import { FC } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ButtonSizes, ButtonTypes, FormValues, InputPatterns } from '@/types/commonTypes'
import Form from '@/components/UI/Form/Form'
import Input from '@/components/UI/Field/Input'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import Button from '@/components/UI/Button/Button'
import { signInAsync } from '@/store/actions/signInAsync'
import { PAGE_ROUTES } from '@/constants/pageRoutes'
import styles from '@/styles/Login.module.scss'

const Login: FC = () => {
  const dispatch = useTypedDispatch()
  const router = useRouter()
  const { isAuth } = useTypedSelector(state => state.profile)

  const { 
    register, 
    handleSubmit,
    control,
    formState: { errors, isSubmitting } 
  } = useForm<FormValues>({
    mode: 'all'
  })

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    const redirectUrl = await dispatch(signInAsync(data))

    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }
  
  return (
    <div className={styles.login}>
      <div className={styles.inner}>
        <SectionTitle leavel={1}>
          Welcome <br /> To <br />
          <span>Wiggle</span>
        </SectionTitle>
        <Form
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            label='Email'
            register={register}
            errors={errors}
            control={control}
            pattern={InputPatterns.Email}
            id='login-email'
            type='text' 
            name='email'
            placeholder='Email'
          />
          <Input
            label='Password'
            register={register}
            errors={errors}
            control={control}
            id='login-password'
            type='password' 
            name='password'
            placeholder='Password'
          />
          <Button
            text='Log in'
            size={ButtonSizes.LG}
            colored
            type={ButtonTypes.Submit}
            id='login'
            isLoading={isSubmitting}
            isDisabled={isAuth}
          />
        </Form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: PAGE_ROUTES.dashboard.route,
        permanent: true,
      },
    }
  }

  return {
    props: {
      type: 'login',
    },
  }
}

export default Login