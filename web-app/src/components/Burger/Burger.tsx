import { FC } from 'react'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import styles from '@/components/Burger/Burger.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setMenuOpen } from '@/store/reducers/menuReducer'

const Burger: FC = () => {
  const dispatch = useTypedDispatch()
  const { isMenuOpen } = useTypedSelector(state => state.menu)
  
  return (
    <div 
      className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`}
      onClick={() => dispatch(setMenuOpen(!isMenuOpen))}
    >
      <span /><span />
    </div>
  )
}

export default Burger