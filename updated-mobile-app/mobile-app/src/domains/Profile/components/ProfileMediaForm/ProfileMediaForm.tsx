import React, { Fragment, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import FastImage from 'react-native-fast-image'

import DeleteMediaModal from '../DeleteMediaModal/DeleteMediaModal'
import GradientText from '../../../../components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import { RootState } from '../../../../store/store'
import UploadingModal from '../UploadingModal/UploadingModal'
import { imageUpload } from '../../../../api/images.methods'
import { setUserData } from '../../../../store/auth'
import styles from './styled'
import { updateUserProfile } from '../../../../api/user.methods'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

export type PhotoItem = {
  fileName?: string
  fileSize?: number
  height?: number
  type?: string
  uri: string
  width?: number
  local?: boolean
}

function ProfileMediaForm(): JSX.Element {
  const isDataValid = true
  const dispatch = useDispatch()
  const user = useSelector((root: RootState) => root.auth.user)
  const { t } = useTranslation()
  const [isUploading, setIsUploading] = useState(false)



  // PROFILE_PHOTO
  const [profilePhoto, setProfilePhoto] = useState<PhotoItem | null>(null)
  const [isProfileUploadModalVisible, setIsProfileUploadModalVisible] =
    useState(false)
  const [isProfileDeleteModalVisible, setIsProfileDeleteModalVisible] =
    useState(false)

  const handleProfilePhotoUpload = () => setIsProfileUploadModalVisible(true)
  const handleProfilePhotoDelete = () => setIsProfileDeleteModalVisible(true)
  const onProfilePhotoCancel = () => {
    isProfileUploadModalVisible && setIsProfileUploadModalVisible(false)
    isProfileDeleteModalVisible && setIsProfileDeleteModalVisible(false)
  }
  const onProfilePhotoDelete = () => {
    setProfilePhoto(null)
    onProfilePhotoCancel()
  }
  const isProfilePhotoExist = !!profilePhoto?.uri

  // COVER_PHOTOS
  const [firstCoverPhoto, setFirstCoverPhoto] = useState<PhotoItem | null>(null)
  const [secondCoverPhoto, setSecondCoverPhoto] = useState<PhotoItem | null>(
    null
  )
  const [thirdCoverPhoto, setThirdCoverPhoto] = useState<PhotoItem | null>(null)
  const [fourthCoverPhoto, setFourthCoverPhoto] = useState<PhotoItem | null>(
    null
  )

  const navigation = useNavigation()

  const handleConfirm = async () => {
    if (!profilePhoto) {
      return Toast.show({
        type: 'error',
        text1: 'You need to upload Profile photo'
      })
    }
    if (profilePhoto) {
      const allPhotos = [
        firstCoverPhoto,
        secondCoverPhoto,
        thirdCoverPhoto,
        fourthCoverPhoto
      ].filter(item => item !== null)

      let allPhotosUrls: string[] = []

      if (allPhotos.length < 2) {
        return Toast.show({
          type: 'error',
          text1: 'Minimum 2 cover photos required'
        })
      }

      setIsUploading(true)
      const url = await imageUpload(profilePhoto.uri)

      if (allPhotos.length >= 2) {
        allPhotosUrls = (await Promise.all(
          allPhotos.map(item => imageUpload(item?.uri))
        )) as string[]
      }

      if (allPhotosUrls.find(item => item.includes('file:/'))) {
        setIsUploading(false)
        return Toast.show({
          type: 'error',
          text1: "Photos can't be uploaded"
        })
      }

      const res = await updateUserProfile({ photos: [url, ...allPhotosUrls] })
      setIsUploading(false)
      if (res && res.profile && user) {
        dispatch(setUserData({ ...user, profile: res.profile }))
      }
    }
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View pointerEvents="none">
          <GradientText
            style={styles.title}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#FFCB52', '#FF7B02']}>
            {t('Profile Photo')}
          </GradientText>
        </View>
        <Text style={styles.description}>{t('Upload a Profile Picture')}</Text>

        <View style={styles.avatarUploader}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={handleProfilePhotoUpload}>
            {isProfilePhotoExist ? (
              <FastImage
                source={{ uri: profilePhoto?.uri }}
                style={{ width: '100%', height: '100%', borderRadius: 95 }}
              />
            ) : (
              <FastImage
                source={require('../../../../../assets/images/camera.png')}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
          {isProfilePhotoExist && (
            <TouchableOpacity
              style={styles.avatarTrashIconWrapper}
              onPress={handleProfilePhotoDelete}>
              <FastImage
                source={require('../../../../../assets/icons/Trash.png')}
                style={styles.trashIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        <DeleteMediaModal
          visible={isProfileDeleteModalVisible}
          onCancel={onProfilePhotoCancel}
          onDelete={onProfilePhotoDelete}
        />
        <UploadingModal
          visible={isProfileUploadModalVisible}
          onCancel={onProfilePhotoCancel}
          setPickerResponse={(assets: PhotoItem[]) =>
            setProfilePhoto(assets?.[0] ?? null)
          }
          photoType={t('profile')}
        />

        <Text style={styles.description}>{t('Upload Additional Images')}</Text>
        <View style={styles.uploaderWrapper}>
          <CoverPhotoUploader
            photo={firstCoverPhoto}
            setPhoto={(assets: PhotoItem[]) =>
              setFirstCoverPhoto(assets?.[0] ?? null)
            }
          />
          <CoverPhotoUploader
            photo={secondCoverPhoto}
            setPhoto={(assets: PhotoItem[]) =>
              setSecondCoverPhoto(assets?.[0] ?? null)
            }
          />
        </View>
        <View style={styles.uploaderWrapper}>
          <CoverPhotoUploader
            photo={thirdCoverPhoto}
            setPhoto={(assets: PhotoItem[]) =>
              setThirdCoverPhoto(assets?.[0] ?? null)
            }
          />
          <CoverPhotoUploader
            photo={fourthCoverPhoto}
            setPhoto={(assets: PhotoItem[]) =>
              setFourthCoverPhoto(assets?.[0] ?? null)
            }
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleConfirm}
        style={styles.primaryButton}
        disabled={isUploading}
        activeOpacity={isDataValid ? 0 : 1}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonGradient, { opacity: isDataValid ? 1 : 0.4 }]}>
          {isUploading ? (
            <ActivityIndicator size={'small'} color="black" />
          ) : (
            <Text style={styles.buttonText}>{t('Confirm')}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  )
}

export default ProfileMediaForm

const CoverPhotoUploader = props => {
  const { photo, setPhoto } = props

  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

  const handlePhotoUpload = () => setIsUploadModalVisible(true)
  const handlePhotoDelete = () => setIsDeleteModalVisible(true)
  const onPhotoCancel = () => {
    isUploadModalVisible && setIsUploadModalVisible(false)
    isDeleteModalVisible && setIsDeleteModalVisible(false)
  }
  const onPhotoDelete = () => {
    setPhoto(null)
    onPhotoCancel()
  }
  const isPhotoExist = !!photo?.uri
  const { t } = useTranslation()

  return (
    <Fragment>
      <TouchableOpacity
        style={styles.imageUploader}
        onPress={handlePhotoUpload}>

        {isPhotoExist ? (
          <FastImage
            source={{ uri: photo?.uri }}
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        ) : (
          <View style={{ width: 163, height: 94, justifyContent: "center", alignItems: 'center' }}>
            <FastImage
              source={require('../../../../../assets/icons/Camera.png')}
              style={styles.image}
            />
          </View>
        )}
        {isPhotoExist && (
          <TouchableOpacity
            style={styles.trashIconWrapper}
            onPress={handlePhotoDelete}>
            <FastImage
              source={require('../../../../../assets/icons/Trash.png')}
              style={styles.trashIcon}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      <DeleteMediaModal
        visible={isDeleteModalVisible}
        onCancel={onPhotoCancel}
        onDelete={onPhotoDelete}
      />
      <UploadingModal
        visible={isUploadModalVisible}
        onCancel={onPhotoCancel}
        setPickerResponse={setPhoto}
        photoType={t('cover')}
      />
    </Fragment>
  )
}
