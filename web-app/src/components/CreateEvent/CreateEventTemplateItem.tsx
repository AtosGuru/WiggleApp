import { FC } from 'react'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'
import Image from 'next/image'

const CreateEventTemplateItem: FC = () => {
  return (
    <div className={styles.createTemplateItem}>
      <div className={styles.createTemplatePreview}>
        <Image
          src='/assets/images/template-1.png'
          width={205}
          height={125}
          loading='lazy'
          alt='BG'
        />
      </div>
      <div className={styles.createTemplateName}>Port du Soleil</div>
      <div className={styles.createTemplateToolbar}>
        <div className={styles.createTemplateDate}>
          <span className={`${styles.createTemplateDateIcon} icon`}>
            <Image
              src='/assets/icons/time.svg'
              width={20}
              height={20}
              alt='Date'
            />
          </span>
          <span className={styles.createTemplateDateText}>22:00-03:00</span>
        </div>
        <button className={styles.createTemplateItemBtn} type='button'>Edit</button>
      </div>
    </div>
  )
}

export default CreateEventTemplateItem