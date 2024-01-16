import { useEffect, useRef } from 'react'
import { isBrowser } from '@/utils/isBrowser'

export const useClickOutside = (callback: () => void) => {
  const ref = useRef<any>()

  if (!isBrowser()) {
    return
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [callback])

  return ref
}