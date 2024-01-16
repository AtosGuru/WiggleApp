import { useEffect } from 'react'
import { useScrollbarWidth } from '@/hooks/useScrollbarWidth'
import { isBrowser } from '@/utils/isBrowser'

export const useLockModalScroll = (deps: boolean): void | undefined => {
  if (!isBrowser()) {
    return
  }

  const scrollBarWidth = useScrollbarWidth()

  useEffect(() => {
    if (deps) {
      document.body.style.paddingRight = scrollBarWidth
      document.body.classList.add('lock-scroll')

      return
    }

    document.body.classList.remove('lock-scroll')
    document.body.style.paddingRight = '0px'
  }, [deps])
}