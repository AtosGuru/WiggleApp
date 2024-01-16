import { FC, MouseEvent, useEffect } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { authorizedAxios } from '@/config/axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import Gallery from '@/components/Profile/Gallery/Gallery'
import Info from '@/components/Profile/Info/Info'
import Schedule from '@/components/Profile/Schedule/Schedule'
import Buttons from '@/components/Profile/Buttons/Buttons'
import Form from '@/components/UI/Form/Form'
import { FormValues } from '@/types/commonTypes'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import MetaData from '@/layout/Metadata'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setEditable, setInfo, setSchedule } from '@/store/reducers/profileReducer'
import styles from '@/styles/Profile.module.scss'

const Profile: FC = ({ user }: any) => {
  const dispatch = useTypedDispatch()
  const { isEditable, info } = useTypedSelector(state => state.profile)

  const { 
    register, 
    handleSubmit,
    reset, 
    control,
    clearErrors,
    setValue,
    formState: { errors } 
  } = useForm<FormValues>()

  const editHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(setEditable(true))
  }

  const cancelHandler = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setEditable(false))
  }

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  useEffect(() => {
    dispatch(setInfo(user))
    dispatch(setSchedule(user.locations[0]?.schedule));

    setValue("address", info.address || user.locations[0]?.title);
    setValue("guests", info.maxguests || user.locations[0]?.maxguests);
    setValue("bio", info.bio || user.locations[0]?.bio);
  }, [])
  
  return (
    <Form 
      className={styles.profile}
      onSubmit={handleSubmit(submitHandler)}
    >
      <MetaData title='Profile' />
      <SectionTitle leavel={1}>Edit Profile</SectionTitle>
      <Gallery />
      <Info
        register={register}
        errors={errors}
      />
      <Schedule
        register={register}
        errors={errors}
        control={control}
      />
      <Buttons 
        isEditable={isEditable} 
        editHandler={editHandler} 
        cancelHandler={cancelHandler}
      />
    </Form>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context)
  
  //@ts-ignore
  const csrfToken = session.user['CSRF-TOKEN']
  //@ts-ignore
  const sessionId = session.user['X-SESSION-ID']
  //@ts-ignore
  const userId = session?.user.user.id

  authorizedAxios.defaults.headers['X-CSRF-TOKEN'] = csrfToken
  authorizedAxios.defaults.headers['X-SESSION-ID'] = sessionId

  const [ userData ] = await Promise.all([
    authorizedAxios.get(`/user/${userId}`)
  ])
  
  return {
    props: {
      user: userData.data.user[0],
    },
  }
}

export default Profile