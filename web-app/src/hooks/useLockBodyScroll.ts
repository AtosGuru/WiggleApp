import { useEffect } from 'react'
import { isBrowser } from '@/utils/isBrowser'

export const useLockBodyScroll = (deps: boolean): void => {
  if (!isBrowser()) {
    return
  }
  
  useEffect(() => {
    if (deps) {
      let scrollTop: number = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop

      document.documentElement.classList.add('lock-scroll')
      document.documentElement.style.top = `${-scrollTop}px`
    } else {
      let scrollTop: number = document.documentElement.getBoundingClientRect().top

      document.documentElement.classList.remove('lock-scroll')
      document.documentElement.scrollTop = -scrollTop
      document.body.scrollTop = -scrollTop
    }
  }, [deps])
}