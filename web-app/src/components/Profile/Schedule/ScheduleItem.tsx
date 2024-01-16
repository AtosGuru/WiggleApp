import { ChangeEvent, FC } from 'react'
import Image from 'next/image'
import Input from '@/components/UI/Field/Input'
import { ProfileSheduleItemProps, SchedulePositions } from '@/types/profileTypes'
import { InputMasks } from '@/types/commonTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { changeSchedule, setRemoveModalOpen, setSelectedSchedule } from '@/store/reducers/profileReducer'
import { thrashPath } from '@/constants/imagePaths'
import styles from '@/components/Profile/Schedule/Schedule.module.scss'

const ScheduleItem: FC<ProfileSheduleItemProps> = ({ info, isEditable, register, errors, control }) => {
  const dispatch = useTypedDispatch()

  const changeHandler = (value: string, position: string) => {
    dispatch(changeSchedule({ id: info.id, value, position }))
  }

  const openRemoveModalHandler = (id: number | string) => {
    dispatch(setRemoveModalOpen(true))
    dispatch(setSelectedSchedule(id))
  }
  
  return (
    <div className={styles.item}>
      <div className={styles.header}>
      <div className={styles.label}>{info.name}</div>
      <span 
        className={styles.icon}
        style={{ opacity: +isEditable, pointerEvents: isEditable ? 'auto' : 'none' }}
        onClick={() => openRemoveModalHandler(info.id)}
      >
        <Image
          src={thrashPath}
          width={12}
          height={12}
          alt='Tharash'
        />
      </span>
      </div>
      <div className={styles.fields}>
        <Input
          mask={InputMasks.Time}
          type='text' 
          name={`${info.name.toLocaleLowerCase()}-start`}
          value={info.start}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e.target.value, SchedulePositions.Start)}
        />
        <Input 
          mask={InputMasks.Time}
          type='text'
          name={`${info.name.toLocaleLowerCase()}-end`}
          value={info.end}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e.target.value, SchedulePositions.End)}
        />
      </div>
    </div>
  )
}

export default ScheduleItem