import { FC } from 'react'
import Logo from '@/components/Logo/Logo'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import { SuccessModalProps } from '@/types/commonTypes'
import styles from '@/components/Success/Success.module.scss'

const Success: FC<SuccessModalProps> = ({ title }) => {
  return (
    <div className={styles.success}>
      <SectionTitle leavel={3}>{title}</SectionTitle>
      <Logo />
    </div>
  )
}

export default Success