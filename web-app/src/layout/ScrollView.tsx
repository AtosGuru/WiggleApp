import { FC, useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { ScrollViewProps, ScreenBreakpoints, ScrollViewOffset } from '@/types/commonTypes'
import { useScreenSize } from '@/hooks/useScreenSize'

const ScrollView: FC<ScrollViewProps> = ({ classNames, offset, children }) => {
  const screenSize = useScreenSize()
  const blockRef = useRef<any>(null)

  const scrollToBottom = () => {
    if (blockRef.current) {
      console.log(blockRef.current)
      blockRef.current.scrollTop = blockRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (offset && offset === ScrollViewOffset.Bot) {
      scrollToBottom()
    }
  }, [])

  if (screenSize && screenSize?.width <= ScreenBreakpoints.Tablet) {
    return (
      <div
        className={classNames.join(' ')}
        ref={blockRef}
      >
        {children}
      </div>
    )
  }
  
  return (
    <SimpleBar
      className={classNames.join(' ')}
      forceVisible='y'
      autoHide={true}
      scrollableNodeProps={{ ref: blockRef }}
    >
      {children}
    </SimpleBar>
  )
}

export default ScrollView