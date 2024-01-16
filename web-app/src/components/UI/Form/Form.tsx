import { FC } from 'react'
import styles from '@/components/UI/Form/Form.module.scss'

const Form: FC<any> = ({ children, className, ...props }) => {
  return (
    <form 
      autoComplete='off'
      className={`${className} ${styles.form}`}
      {...props}
    >
      {children}
    </form>
  )
}

export default Form