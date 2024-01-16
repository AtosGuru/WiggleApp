import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { MenuItemProps } from '@/types/menuTypes'
import { ButtonTypes } from '@/types/commonTypes'
import styles from '@/components/Menu/Menu.module.scss'

const MenuItem: FC<MenuItemProps> = ({ link, name, icon, handleClick }) => {
  const router = useRouter()

  return (
    <li className={styles.item}>
      { 
        link
          ? (
            <Link 
              className={`${styles.link} ${router.pathname === link ? styles.activeLink : ''}`} 
              href={link}
            >
              <span className={`${styles.icon} icon`}>
                <Image
                  src={icon}
                  width={26}
                  height={26}
                  alt={name}
                />
              </span>
              <span 
                className={styles.text}
                data-text={name}
              >
                {name}
              </span>
            </Link>
          ) : (
            <button 
              className={styles.link} 
              type={ButtonTypes.Button}
              onClick={handleClick}
            >
              <span className={`${styles.icon} icon`}>
                <Image
                  src={icon}
                  width={26}
                  height={26}
                  alt={name}
                />
              </span>
              <span className={styles.text}>{name}</span>
            </button>
          )
      }
    </li>
  )
}

export default MenuItem