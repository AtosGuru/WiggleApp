import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import Menu from '@/components/Menu/Menu'
import Logo from '@/components/Logo/Logo'
import Burger from '@/components/Burger/Burger'
import { SidebarProps } from '@/types/sidebarTypes'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { setMenuOpen } from '@/store/reducers/menuReducer'
import styles from '@/components/Sidebar/Sidebar.module.scss'

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const router = useRouter()
  const dispatch = useTypedDispatch()
  const { isMenuOpen } = useTypedSelector(state => state.menu)
  
  const modalRef = useClickOutside(() => {
    dispatch(setMenuOpen(false))
  })

  useLockBodyScroll(isMenuOpen)

  useEffect(() => {
    router.events.on('routeChangeStart', () =>  dispatch(setMenuOpen(false)))
  }, [])
  
  return (
    <aside 
      className={`${styles.sidebar} ${isOpen.some(item => item) ? styles.disabled : ''} ${isMenuOpen ? styles.open : ''}`}
      ref={modalRef}
    >
      <Logo text />
      <Menu />
      <Burger />
    </aside>
  )
}

export default Sidebar