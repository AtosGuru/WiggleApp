import { FC } from 'react'
import SectionTitle from '@/components/UI/SectionTitle/SectionTitle'
import CreateEventTemplateEvents from '@/components/CreateEvent/CreateEventTemplateEvents'
import CreateEventTemplateFiltter from './CreateEventTemplateFilter'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'

const CreateEventTemplate: FC = () => {
  return (
    <div className={styles.createTemplate}>
      <SectionTitle leavel={3}>Create events from templates</SectionTitle>
      <CreateEventTemplateFiltter />
      <CreateEventTemplateEvents />
    </div>
  )
}

export default CreateEventTemplate