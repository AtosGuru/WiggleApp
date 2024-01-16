import { FC } from 'react'
import SelectBtns from '@/components/Select/SelectBtns'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import { SelectModalProps } from '@/types/commonTypes'
import styles from '@/components/Select/Select.module.scss'

const Select: FC<SelectModalProps> = ({ title, positiveHandle, negativeHandle }) => {
  return (
    <div className={styles.select}>
      <SectionTitle leavel={3}>{title}</SectionTitle>
      <SelectBtns positiveHandle={positiveHandle} negativeHandle={negativeHandle} />
    </div>
  )
}

export default Select