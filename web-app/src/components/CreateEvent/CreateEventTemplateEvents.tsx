import { FC } from 'react'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'
import CreateEventTemplateItem from './CreateEventTemplateItem'

const CreateEventTemplateEvents: FC = () => {
  return (
    <div className={styles.createTemplateList}>
      <CreateEventTemplateItem />
      <CreateEventTemplateItem />
      <CreateEventTemplateItem />
      <CreateEventTemplateItem />
    </div>
  )
}

export default CreateEventTemplateEvents