import { FC } from 'react'
import Select from '@/components/UI/Select/Select'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import styles from '@/components/Analytics/Select/Select.module.scss'
import { SelectSizes } from '@/types/commonTypes'

const SelectWrapper: FC = () => {
  const options = [
    {
      id: 1,
      name: 'Port De Soleil',
      isActive: false
    },
    {
      id: 2,
      name: 'Lönelördag',
      isActive: false
    },
    {
      id: 3,
      name: 'Bartömning',
      isActive: false
    },
    {
      id: 4,
      name: 'Klubb Pank',
      isActive: false
    },
    {
      id: 5,
      name: 'John De Son',
      isActive: false
    },
    {
      id: 6,
      name: 'Lönefredag',
      isActive: false
    },
  ]
  
  return (
    <div className={styles.select}>
      <div className={styles.inner}>
        <SectionTitle leavel={3}>Select Event</SectionTitle>
        <Select
          size={SelectSizes.LG}
          defaultValue='Click to choose'
          options={options}
        />
      </div>
    </div>
  )
}

export default SelectWrapper