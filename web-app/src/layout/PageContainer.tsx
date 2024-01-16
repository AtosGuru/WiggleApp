import { FC } from 'react'
import { ChildProp } from '@/types/commonTypes'

const PageContainer: FC<ChildProp> = ({ children }) => {
  return (
    <main className='main'>
      {children}
    </main>
  )
}

export default PageContainer