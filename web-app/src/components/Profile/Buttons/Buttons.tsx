import { FC } from 'react'
import Button from '@/components/UI/Button/Button'
import { ButtonSizes, ButtonTypes } from '@/types/commonTypes'
import { ButtonsProps } from '@/types/profileTypes'
import styles from '@/components/Profile/Buttons/Buttons.module.scss'

const Buttons: FC<ButtonsProps> = ({ isEditable, editHandler, cancelHandler }) => {
  return (
    <div className={styles.btns}>
      <Button
        text={isEditable ? 'Save' : 'Edit'}
        size={ButtonSizes.LG}
        colored
        type={isEditable ? ButtonTypes.Submit : ButtonTypes.Button}
        id='save-profile'
        onClick={isEditable ? undefined : editHandler}
      />
      <Button
        text='Cancel'
        style={{ opacity: +isEditable, pointerEvents: isEditable ? 'auto' : 'none' }}
        size={ButtonSizes.LG}
        type={ButtonTypes.Button}
        id='cancel-profile'
        onClick={cancelHandler}
      />
    </div>
  )
}

export default Buttons