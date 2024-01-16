import { FC } from 'react'
import ScheduleList from '@/components/Profile/Schedule/ScheduleList'
import { ScheduleProps } from '@/types/profileTypes'
import styles from '@/components/Profile/Schedule/Schedule.module.scss'

const Schedule: FC<ScheduleProps> = ({ register, errors, control }) => {
  return (
    <div className={styles.schedule}>
      <div className={styles.title}>Opening hours</div>
      <ScheduleList
        register={register}
        errors={errors}
        control={control}
      />
    </div>
  )
}

export default Schedule