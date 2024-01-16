import { FC } from 'react'
import { FieldProps } from '@/types/commonTypes'
import styles from '@/components/UI/Field/Field.module.scss'

const TextArea: FC<FieldProps> = ({ 
  label, 
  name,
  register, 
  errors, 
  isRequired = true,
  ...props 
}) => {
  return (
    <div className={styles.fieldWrapper}>
      { label && <label className={styles.label} htmlFor={props.id}>{label}</label> }
      <div className={styles.fieldInner}>
        { register ? (
          <textarea 
            className={`${styles.field} ${errors[name] ? styles.error : ''}`}
            autoComplete='off'
            {...register(name, {
              required: isRequired,
            })}
            {...props}
          />
        ) : (
          <textarea 
            className={styles.field}
            autoComplete='off'
            name={name}
            {...props}
          />
        ) }
      </div>
    </div>
  )
}

export default TextArea