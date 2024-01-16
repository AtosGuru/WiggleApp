import { FC } from 'react'
import Button from '@/components/UI/Button/Button'
import styles from '@/components/RemoveSchedule/RemoveSchedule.module.scss'
import { ButtonSizes, ButtonTypes } from '@/types/commonTypes'

interface LogoutGeneralProps {
  positiveHandle: () => void
  negativeHandle: () => void
}

const RemoveScheduleBtns: FC<LogoutGeneralProps> = ({ positiveHandle, negativeHandle }) => {
  return (
    <div className={styles.btns}>
      <Button
        text='Yes'
        size={ButtonSizes.LG}
        colored
        type={ButtonTypes.Button}
        id='remove-positive'
        onClick={positiveHandle}
      />
      <Button
        text='No'
        size={ButtonSizes.LG}
        type={ButtonTypes.Button}
        id='remove-negative'
        onClick={negativeHandle}
      />
    </div>
  )
}

export default RemoveScheduleBtns