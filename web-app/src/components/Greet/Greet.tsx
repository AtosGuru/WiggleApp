import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import GreetBtns from '@/components/Greet/GreetBtns'
import styles from '@/components/Greet/Greet.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const Greet: FC<any> = () => {  
  const { name } = useTypedSelector(state => state.profile.info)

  return (
    <div className={styles.greet}>
      <div className={styles.inner}>
        <SectionTitle leavel={2}>Hello <br /> <span>{name}</span></SectionTitle>
        <SectionTitle leavel={3}>Lets begin creating events like never before</SectionTitle>
        <GreetBtns />
      </div>
    </div>
  )
}

export default Greet