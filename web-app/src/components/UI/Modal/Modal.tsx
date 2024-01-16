import { FC } from 'react'
import { ModalProps } from '@/types/commonTypes'
import ModalClose from '@/components/UI/Modal/ModalClose'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useLockModalScroll } from '@/hooks/useLockModalScroll'
import styles from '@/components/UI/Modal/Modal.module.scss'

const Modal: FC<ModalProps> = ({ children, isOpen, setOpen, centered, fullscreen }) => {
  const dispatch = useTypedDispatch()

  useLockModalScroll(isOpen)
  
  const closeModalHandler = () => {
    dispatch(setOpen(false))
  }
  
  return (
    <div 
      className={
        `${styles.modal} ${isOpen ? styles.open : ''} ${centered ? styles.centered : ''} ${fullscreen ? styles.fullscreen : ''}`
      }
      onClick={closeModalHandler}
    >
      <div 
        className={styles.content}
        onClick={e => e.stopPropagation()}
      >
        <ModalClose closeModalHandler={closeModalHandler} />
        {children}
      </div>
    </div>
  )
}

export default Modal