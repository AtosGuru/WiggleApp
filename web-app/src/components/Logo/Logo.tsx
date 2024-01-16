import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/components/Logo/Logo.module.scss'
import { LogoProps } from '@/types/commonTypes'

const Logo: FC<LogoProps> = ({ text }) => {
  return (
    <div className={styles.logo}>
      <Link className={styles.link} href='/'>
        <Image
          src='/assets/images/logo.png'
          width={102}
          height={113}
          loading='eager'
          alt='Logo'
          priority
        />
        { text && <span>Wiggle</span> }
      </Link>
    </div>
  )
}

export default Logo