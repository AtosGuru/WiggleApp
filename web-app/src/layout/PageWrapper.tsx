import { FC } from 'react'
import { leagueSpartan } from '@/fonts/fonts'
import { PageWrapperProps } from '@/types/commonTypes'

const PageWrapper: FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <div className={`wrapper ${leagueSpartan.className} ${className}`}>
      {children}
    </div>
  )
}

export default PageWrapper