import { FC } from 'react'
import styles from '@/components/InfoEvent/InfoEvent.module.scss'

interface InfoEventTextProps {
  desc: string
}

const InfoEventText: FC<InfoEventTextProps> = ({ desc }) => {
  return (
    <p className={styles.text} dangerouslySetInnerHTML={{ __html: desc }} />
  )
}

export default InfoEventText