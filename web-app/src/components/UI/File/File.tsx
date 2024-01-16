import { FC } from 'react'
import { FileProps } from '@/types/commonTypes'
import { allowFormats } from '@/constants/allowUplodFormats'
import styles from '@/components/UI/File/File.module.scss'

const File: FC<FileProps> = ({ id, label, ...props }) => {
  return (
    <div className={styles.file}>
      <input 
        type='file'
        accept={allowFormats.toString()}
        id={id}
        {...props}
      />
      <label className={styles.label} htmlFor={id}>
        <span className={styles.icon} />
        <span className={styles.text}>{label}</span>
      </label>
    </div>
  )
}

export default File