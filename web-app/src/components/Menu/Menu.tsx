import { FC } from 'react'
import MenuItem from './MenuItem'
import ProfileItem from './ProfileItem'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { setLogoutModal } from '@/store/reducers/profileReducer'
import { PAGE_ROUTES } from '@/constants/pageRoutes'
import { logoutPath } from '@/constants/imagePaths'
import styles from '@/components/Menu/Menu.module.scss'

const Menu: FC = () => {
  const dispatch = useTypedDispatch()

  const openLogOutModalHandler = () => {
    dispatch(setLogoutModal(true))
  }
  
  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <MenuItem 
          link={PAGE_ROUTES.dashboard.route} 
          name={PAGE_ROUTES.dashboard.name} 
          icon={PAGE_ROUTES.dashboard.icon}
        />
        <MenuItem 
          link={PAGE_ROUTES.events.route} 
          name={PAGE_ROUTES.events.name}
          icon={PAGE_ROUTES.events.icon} 
        />
        <MenuItem 
          link={PAGE_ROUTES.analytics.route} 
          name={PAGE_ROUTES.analytics.name}
          icon={PAGE_ROUTES.analytics.icon} 
        />
        <MenuItem 
          link={PAGE_ROUTES.loyalty.route} 
          name={PAGE_ROUTES.loyalty.name}
          icon={PAGE_ROUTES.loyalty.icon} 
        />
        <MenuItem 
          link={PAGE_ROUTES.notifications.route} 
          name={PAGE_ROUTES.notifications.name}
          icon={PAGE_ROUTES.notifications.icon} 
        />
        <MenuItem 
          link={PAGE_ROUTES.messages.route} 
          name={PAGE_ROUTES.messages.name}
          icon={PAGE_ROUTES.messages.icon}  
        />
      </ul>
      <ProfileItem />
      <MenuItem 
        name='Logout' 
        icon={logoutPath}
        handleClick={openLogOutModalHandler}
      />
    </nav>
  )
}

export default Menu