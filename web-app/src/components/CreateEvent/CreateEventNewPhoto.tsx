import { ChangeEvent, FC } from 'react'
import Image from 'next/image'
import File from '@/components/UI/File/File'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { addUploadPhoto, removeUploadPhoto } from '@/store/reducers/profileReducer'
import { GalleryItemProps } from '@/types/profileTypes'
import { editPath, thrashPath } from '@/constants/imagePaths'
import styles from '@/components/CreateEvent/CreateEvent.module.scss'
import { allowFormats } from '@/constants/allowUplodFormats'

const CreateEventNewPhoto: FC<GalleryItemProps> = ({ info }) => {
  const dispatch = useTypedDispatch()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, id: string | number) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const imageURL = URL.createObjectURL(file)

      dispatch(addUploadPhoto({ id, imageURL }))
    }
  }

  const removePhotoHandler = (id: number | string) => {
    dispatch(removeUploadPhoto(id))
  }
  
  return (
    <div className={styles.createNewPhoto}>
      { !info.path ? (
        <File
          id={info.id}
          label='Add Photo'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, info.id)}
        />
      ) : (
        <>
          <div className={styles.createNewControls}>
            <span 
              className={styles.createNewPhotoIcon}
              onClick={() => removePhotoHandler(info.id)}
            >
              <Image
                src={thrashPath}
                width={14}
                height={14}
                alt='Thrash'
              />
            </span>
            <label 
              className={styles.createNewPhotoIcon}
              htmlFor={`${info.id}-update`}
            >
              <input 
                type='file'
                id={`${info.id}-update`}
                accept={allowFormats.toString()}
                onChange={(e: any) => handleFileChange(e, info.id)}
              />
              <Image
                src={editPath}
                width={10}
                height={10}
                alt='Edit'
              />
            </label>
          </div>
          <Image
            src={info.path}
            width={102}
            height={113}
            alt={`Photo-${info.id}`}
          />
        </>
      ) }
    </div>
  )
}

export default CreateEventNewPhoto