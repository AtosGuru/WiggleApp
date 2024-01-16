import { useEffect, useState } from 'react'
import { isBrowser } from '@/utils/isBrowser'

export const useScrollbarWidth = (): string => {
  const [width, setWidth] = useState('')
  
  if (!isBrowser()) {
    return ''
  }

  useEffect(() => {
    setWidth(`${window.innerWidth - document.documentElement.clientWidth}px`)
  }, [])
  
  return width
}