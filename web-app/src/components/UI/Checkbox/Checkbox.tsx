import { FC } from 'react'
import { CheckboxProps } from '@/types/commonTypes'
import styles from '@/components/UI/Checkbox/Checkbox.module.scss'

const Checkbox: FC<CheckboxProps> = ({ label }) => {
  return (
    <div className={styles.checkbox}>
      <label className={styles.label}>
        <input 
          className={styles.input}
          type='checkbox'
        />
        <span className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14.0002 4.66668L6.00016 12.6667L2.3335 9.00002L3.2735 8.06002L6.00016 10.78L13.0602 3.72668L14.0002 4.66668Z" fill="white"/>
          </svg>
        </span>
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  )
}

export default Checkbox