import { FC } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { ButtonProps, ButtonSizes } from '@/types/commonTypes'
import styles from '@/components/UI/Button/Button.module.scss'
import Loader from '@/components/Loader/Loader'

const Button: FC<ButtonProps> = ({ icon, text, size, colored, error, isLoading, isDisabled, ...props }) => {
  const sizeClass = size === ButtonSizes.LG ? styles.btnLg : size === ButtonSizes.MD ? styles.btnMd : styles.btnSm
  const colorClass = colored && styles.btnColored
  const errorClass = error && styles.btnError
  const loadingClass = isLoading && styles.btnLoading
  const disabledClass = isDisabled && styles.btnDisabled

  const buttonClasses = classNames(styles.btn, sizeClass, colorClass, errorClass, loadingClass, disabledClass)
  
  return (
    <button 
      className={buttonClasses}
      disabled={isDisabled || isLoading}
      {...props}
    >
      { icon && (
        <Image
          className={styles.icon}
          src={icon}
          width={14}
          height={14}
          alt='Icon'
        />
      ) }
      <span className={styles.text}>{text}</span>
      { isLoading && <Loader /> }
    </button>
  )
}

export default Button