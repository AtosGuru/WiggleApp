import { FC } from 'react'
import Button from '@/components/UI/Button/Button'
import { ButtonSizes, ButtonTypes, SelectModalBtnsProps } from '@/types/commonTypes'
import styles from '@/components/Select/Select.module.scss'

const SelectBtns: FC<SelectModalBtnsProps> = ({ positiveHandle, negativeHandle }) => {
  return (
    <div className={styles.btns}>
      <Button
        text='Yes'
        size={ButtonSizes.LG}
        colored
        type={ButtonTypes.Button}
        onClick={positiveHandle}
      />
      <Button
        text='No'
        size={ButtonSizes.LG}
        type={ButtonTypes.Button}
        onClick={negativeHandle}
      />
    </div>
  )
}

export default SelectBtns