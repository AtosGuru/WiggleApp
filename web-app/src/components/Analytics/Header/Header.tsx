import { FC } from 'react'
import Select from '@/components/UI/Select/Select'
import HeaderText from '@/components/Analytics/Header/HeaderText'
import { SelectSizes } from '@/types/commonTypes'
import styles from '@/components/Analytics/Header/Header.module.scss'

const Header: FC = () => {
  const options = [
    {
      id: 1,
      name: '30 days',
      isActive: false
    },
    {
      id: 2,
      name: '60 days',
      isActive: false
    },
    {
      id: 3,
      name: '365 days',
      isActive: false
    },
    {
      id: 4,
      name: 'Today',
      isActive: false
    },
    {
      id: 5,
      name: 'Month to date',
      isActive: false
    },
    {
      id: 6,
      name: 'Quarter to date',
      isActive: false
    },
    {
      id: 7,
      name: 'Year to date',
      isActive: false
    },
  ]
  
  return (
    <div className={styles.header}>
      <HeaderText />
      <Select
        size={SelectSizes.SM}
        defaultValue='30 days'
        options={options}
      />
    </div>
  )
}

export default Header