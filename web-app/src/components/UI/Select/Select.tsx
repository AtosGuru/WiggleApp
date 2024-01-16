import { FC, useState } from 'react'
import styles from '@/components/UI/Select/Select.module.scss'
import { dmSans } from '@/fonts/fonts'
import { SelectProps, SelectSizes } from '@/types/commonTypes'
import Overlay from '@/components/Overlay/Overlay'

const Select: FC<SelectProps> = ({ size, defaultValue, options }) => {
  const [ isOpen, setOpen ] = useState(false)

  return (
    <>
      <div 
        className={
          `${styles.select} ${isOpen ? styles.open : ''} ${size === SelectSizes.LG ? styles.selectLarge : styles.selectSmall}`
        }
      >
        <div 
          className={styles.current}
          onClick={() => setOpen(prev => !prev)}
        >
          <div className={`${styles.text} ${dmSans.className}`}>{defaultValue}</div>
          { size === SelectSizes.LG && (
            <div className={`${styles.icon} icon`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 8">
              <path d="M0.184239 0.184239C0.40756 -0.0390811 0.75702 -0.0593829 1.00327 0.123334L1.07383 0.184239L6.5 5.61013L11.9262 0.184239C12.1495 -0.0390811 12.499 -0.0593829 12.7452 0.123334L12.8158 0.184239C13.0391 0.40756 13.0594 0.75702 12.8767 1.00327L12.8158 1.07383L6.94479 6.94479C6.72147 7.16811 6.37201 7.18842 6.12576 7.0057L6.05521 6.94479L0.184239 1.07383C-0.0614131 0.828173 -0.0614131 0.429892 0.184239 0.184239Z"/>
            </svg>
          </div>
          ) }
        </div>
        <div className={styles.list}>
          { options.map(option => (
            <div 
              className={`${styles.item} ${option.isActive ? styles.active : ''}`} 
              data-text={option.name}
              key={option.id}
            >
              {option.name}
            </div>
          )) }
        </div>
      </div>
      <Overlay 
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </>
  )
}

export default Select