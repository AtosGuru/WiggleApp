import { FC } from 'react'
import Input from '@/components/UI/Field/Input'
import TextArea from '@/components/UI/Field/TextArea'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import styles from '@/components/Profile/Info/Info.module.scss'

const Info: FC<any> = ({ register, errors }) => {
  const { name } = useTypedSelector(state => state.profile.info)
  
  return (
    <div className={styles.info}>
      <div className={styles.name}>{name}</div>
      <div className={styles.inner}>
        <Input
          register={register}
          errors={errors}
          name='address'
          label='Address'
          id='profile-address'
          type='text'
        />
        <Input
          register={register}
          errors={errors}
          name='guests'
          label='Maximum number of guests'
          id='profile-guests'
          type='text'
        />
        <TextArea
          register={register}
          errors={errors}
          name='bio'
          label='Bio'
          id='profile-bio'
        />
      </div>
    </div>
  )
}

export default Info