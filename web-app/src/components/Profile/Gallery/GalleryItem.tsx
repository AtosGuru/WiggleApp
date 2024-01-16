import { ChangeEvent, FC } from 'react'
import Image from 'next/image'
import { GalleryItemProps } from '@/types/profileTypes'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import File from '@/components/UI/File/File'
import { addPhoto, removePhoto } from '@/store/reducers/profileReducer'
import { thrashPath, editPath } from '@/constants/imagePaths'
import { allowFormats } from '@/constants/allowUplodFormats'
import styles from '@/components/Profile/Gallery/Gallery.module.scss'

const GalleryItem: FC<GalleryItemProps> = ({ info, isEditable = false }) => {
  const dispatch = useTypedDispatch()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, id: number | string) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const imageURL = URL.createObjectURL(file)

      dispatch(addPhoto({ id, imageURL }))
    }
  }

  const removePhotoHandler = (id: number | string) => {
    dispatch(removePhoto(id))
  }

  return (
    <div className={styles.item}>
      { !info.path ? (
        <File
          id={info.id}
          label='Add Photo'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, info.id)}
        />
      ) : (
        <>
          <div 
            className={styles.controls}
            style={{ opacity: +isEditable, pointerEvents: isEditable ? 'auto' : 'none' }}
          >
            <span 
              className={styles.icon}
              onClick={() => removePhotoHandler(info.id)}
            >
              <Image
                src={thrashPath}
                width={11}
                height={12}
                alt='Remove'
              />
            </span>
            <label 
              className={styles.icon}
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
            width={239}
            height={139}
            loading='eager'
            alt={`Gallery-${info.id}`}
            priority
          />
        </>
      ) }
    </div>
  )
}

export default GalleryItem