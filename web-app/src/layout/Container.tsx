import { FC } from 'react'
import { ChildProp } from '@/types/commonTypes'

const Container: FC<ChildProp> = ({ children }) => {
  return (
    <div className='container'>{children}</div>
  )
}

export default Container