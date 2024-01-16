import { FC, createElement } from 'react'
import { SectionTitleProps } from '@/types/commonTypes'
import styles from '@/components/UI/SectionTitle/SectionTitle.module.scss'

const SectionTitle: FC<SectionTitleProps> = ({ children, leavel }) => {
  const headingLevel = `h${Math.min(Math.max(leavel, 1), 6)}`
  
  return (
    createElement(headingLevel, { className: styles.title }, children)
  )
}

export default SectionTitle