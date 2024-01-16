import { FC } from 'react'
import { ChildProp } from '@/types/commonTypes'
import styles from '@/components/UI/Text/Text.module.scss'

const Text: FC<ChildProp> = ({ children }) => {
  return (
    <p className={styles.text}>{children}</p>
  )
}

export default Text