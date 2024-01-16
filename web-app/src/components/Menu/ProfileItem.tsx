import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { PAGE_ROUTES } from '@/constants/pageRoutes'
import styles from '@/components/Menu/Menu.module.scss'

const ProfileItem: FC = () => {
  const router = useRouter()
  const { name } = useTypedSelector(state => state.profile.info)
  
  return (
    <div className={styles.profile}>
      <Link 
        className={`${styles.profileLink} ${router.pathname === PAGE_ROUTES.profile.route ? styles.profileActive : ''}`} 
        href={PAGE_ROUTES.profile.route}
      >
        <div className={`${styles.profilePhoto} icon`}>
          <Image
            src='/assets/images/menu-profile.png'
            width={53}
            height={53}
            loading='eager'
            alt='Profile'
            priority
          />
        </div>
        <div className={styles.profileinfo}>
          <div className={styles.profileName} data-text={name}>{name}</div>
          <div className={styles.profileType}>Nightclub</div>
        </div>
      </Link>
    </div>
  )
}

export default ProfileItem