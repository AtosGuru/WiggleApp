import { FC } from 'react'
import { ModalCloseProps } from '@/types/commonTypes'
import styles from '@/components/UI/Modal/Modal.module.scss'

const ModalClose: FC<ModalCloseProps> = ({ closeModalHandler }) => {
  return (
    <div 
      className={styles.close}
      onClick={closeModalHandler}
    />
  )
}

export default ModalClose