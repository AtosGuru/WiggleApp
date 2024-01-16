import { FC } from 'react'
import { OverlayProps } from '@/types/commonTypes'
import styles from '@/components/Overlay/Overlay.module.scss'

const Overlay: FC<OverlayProps> = ({ isOpen, setOpen }) => {
  return (
    <div 
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={() => setOpen(false)}
    />
  )
}

export default Overlay