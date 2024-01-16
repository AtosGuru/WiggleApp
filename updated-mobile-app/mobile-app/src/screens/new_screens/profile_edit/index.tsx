import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-native-date-picker'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import PagerView from 'react-native-pager-view'
import { TextInput } from 'react-native'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { launchImageLibrary } from 'react-native-image-picker'
import Toast from 'react-native-toast-message'

import { PhotoItem } from '../../../domains/Profile/components/ProfileMediaForm/ProfileMediaForm'
import { RootState } from '../../../store/store'
import { imageUpload } from '../../../api/images.methods'
import { setUserData } from '../../../store/auth'
import { updateUser, updateUserProfile } from '../../../api/user.methods'
import styles from './styled'
import { User } from '../../../types/user.interface'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { height, width } = Dimensions.get('screen')

const ProfileEditScreen = () => {
  const ref = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)

  const onNext = () => {
    ref.current.setPage(currentPage + 1)
    setCurrentPage(currentPage + 1)
  }
  const onBack = () => {
    ref.current.setPage(currentPage - 1)
    setCurrentPage(currentPage - 1)
  }

  const steps = [<ProfileInfoForm onNext={onNext} />, <ProfileMediaForm />]

  const handleWrapperPress = () => Keyboard.dismiss()

  const navigation = useNavigation()
  const handleBack = () => {
    currentPage === 0 ? navigation.goBack() : onBack()
  }

  const { t } = useTranslation()

  return (
    <Fragment>
      <View
        style={{
          width,
          height,
          position: 'absolute',
          backgroundColor: '#0F0F0F'
        }}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingBottom: 10
            }}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backBtn}>
              <FastImage
                source={require('../../../../assets/icons/ArrowLeft.png')}
                style={{
                  width: 24,
                  height: 24
                }}
              />
            </TouchableOpacity>
            <Text
              style={styles.editProfileView}>
              {t('Edit Profile')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 16
            }}>
            {steps?.map((step, index) => (
              <Fragment key={index}>
                {index === currentPage ? (
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      borderRadius: 50
                    }}>
                    <View style={{ width: 36, height: 6 }} />
                  </LinearGradient>
                ) : (
                  <View
                    style={{
                      width: 36,
                      height: 6,
                      backgroundColor: '#686868',
                      borderRadius: 8
                    }}
                  />
                )}
              </Fragment>
            ))}
          </View>
        </View>
      </SafeAreaView>
      <PagerView
        style={{ flex: 1 }}
        scrollEnabled={true}
        currentPage={currentPage}
        ref={ref}
        onPageSelected={e => {
          setCurrentPage?.(e.nativeEvent.position)
        }}
        initialPage={0}>
        {steps.map((item, index) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={handleWrapperPress}
            activeOpacity={1}
            key={index}>
            {item}
          </TouchableOpacity>
        ))}
      </PagerView>
    </Fragment>
  )
}

const ProfileInfoForm = props => {
  const { onNext } = props

  const user = useSelector((root: RootState) => root.auth.user)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthday: ''
  })

  const birthdayData = ['day', 'month', 'year']

  const genderData = ['Male', 'Female', 'Other']

  const handleGenderSelect = (item: string) => {
    setProfileData(prev => ({ ...prev, gender: item }))
  }

  const [date, setDate] = useState(new Date())
  const [formattedDate, setFormattedDate] = useState<{
    day: string
    month: string
    year: string
  } | null>(null)
  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  // Calculate the minimum date (18 years ago from today)
  const calculateMinDate = () => {
    const minDate = new Date()
    minDate.setFullYear(minDate.getFullYear() - 18)
    return minDate
  }
  const minDate = calculateMinDate()

  useEffect(() => {
    if (user?.profile) {
      setName(user.name)
      setProfileData({
        birthday: user.profile.birthDate,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        gender: user.profile.gender
      })
      const birthdayDate = moment(user.profile.birthDate).toDate()
      setDate(birthdayDate)
      setFormattedDate(formatDate(birthdayDate))
    }
  }, [user])

  const getThreeLetterMonth = month => {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'
    ]
    return months[month]
  }

  const formatDate = _date => {
    const day = _date.getDate().toString().padStart(2, '0')
    const month = getThreeLetterMonth(_date.getMonth())
    const year = _date.getFullYear().toString()
    return { day, month, year }
  }

  const isDataValid =
    profileData.firstName.length > 0 &&
    profileData.lastName.length > 0 &&
    profileData.gender.length > 0 &&
    profileData.birthday !== null

  const setUsername = async (name: string) => {
    try {
      const res = await updateUser({ name })
      if (!res) {
        return false
      }
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const handleConfirm = async () => {
    if (isDataValid && user) {
      setIsLoading(true)
      try {
        if (name !== user.name) {
          const isUserNameChanged = await setUsername(name)

          if (!isUserNameChanged) {
            return setError(true)
          }
        }
        await updateUserProfile({
          birthDate: profileData.birthday,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          gender: profileData.gender.toLowerCase() as User['profile']['gender']
        })
      } catch (err) {
        throw err
      } finally {
        setIsLoading(false)
        onNext()
      }
    }
  }

  const onKeyboardDismiss = () => Keyboard.dismiss()

  const { t } = useTranslation()

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingBottom: 20
      }}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity activeOpacity={1} onPress={onKeyboardDismiss}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: 36
            }}>
            {t('Edit Informations')}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10
            }}>
            {t('First Name')}
          </Text>
          <TextInput
            placeholder={`${t('Enter your first name')}....`}
            placeholderTextColor="#686868"
            style={[styles.textInput, { marginBottom: 26 }]}
            onChangeText={text => {
              // Use a regular expression to allow only alphabetic characters (A-Z, a-z)
              const alphabeticText = text.replace(/[^A-Za-z]/g, '');

              // Update the state with the filtered text
              setProfileData(prev => ({ ...prev, firstName: alphabeticText }));
            }}
            value={profileData.firstName}
          />

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10
            }}>
            Last Name
          </Text>
          <TextInput
            placeholder={`${t('Enter your last name')}....`}
            placeholderTextColor="#686868"
            style={[styles.textInput, { marginBottom: 26 }]}
            onChangeText={text => {
              // Use a regular expression to allow only alphabetic characters (A-Z, a-z)
              const alphabeticText = text.replace(/[^A-Za-z]/g, '');

              // Update the state with the filtered text
              setProfileData(prev => ({ ...prev, lastName: alphabeticText }))
            }}
            value={profileData.lastName}
          />
{/* 
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10
            }}>
            {t('Username')}
          </Text>
          <TextInput
            placeholder={`${t('Enter your username')}....`}
            placeholderTextColor="#686868"
            style={[styles.textInput, { marginBottom: error ? 10 : 36 }]}
            onChangeText={text => setName(text)}
            value={name}
          /> */}
          {error && (
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                marginBottom: 26,
                color: '#FF0000'
              }}>
              {t('Sorry, this username is taken')}
            </Text>
          )}

          {/* <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10
            }}>
            Profession
          </Text>
          <TextInput
            placeholder={'Enter your last profession....'}
            placeholderTextColor="#686868"
            style={[styles.textInput, { marginBottom: 26 }]}
            onChangeText={text =>
              setProfileData(prev => ({ ...prev, profession: text }))
            }
            value={profileData.profession}
          /> */}

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10
            }}>
            {t('Birthday')}
          </Text>
          <View style={{ marginBottom: 32 }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              {birthdayData?.map(item => (
                <TouchableOpacity
                  key={item}
                  style={{
                    flex: 1,
                    backgroundColor:
                      profileData?.gender === item ? '#686868' : '#252525',
                    borderRadius: 8,
                    width: 'auto',
                    paddingVertical: 28,
                    flexWrap: 'nowrap'
                  }}
                  onPress={() => setOpen(true)}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: profileData?.gender === item ? '500' : '300',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                    {t(formattedDate?.[item]) ||
                      item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            androidVariant="iosClone"
            maximumDate={minDate} // Set the maximum date to restrict year selection
            onConfirm={_date => {
              setOpen(false)
              setDate(_date)
              setFormattedDate(formatDate(_date))
              setProfileData(prev => ({ ...prev, birthday: _date }))
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />

          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10
            }}>
            {t('Gender')}
          </Text>
          <View style={{ marginBottom: 100 }}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              {genderData?.map(item => (
                <LinearGradient style={{
                  flex: 1,
                  borderRadius: 8,
                  width: 'auto',
                  flexWrap: 'nowrap',
                }} colors={profileData?.gender?.toUpperCase() === item.toUpperCase() ? ["#FFCB52", "#FF7B02"] : ["#252525", "#252525"]}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 8,
                      width: 'auto',
                      paddingVertical: 28,
                    }}
                    key={item}
                    onPress={() => handleGenderSelect(item)}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: profileData?.gender === item ? '500' : '300',
                        color: 'white',
                        textAlign: 'center'
                      }}>
                      {t(item)}
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              ))}
            </View>
          </View>

          <TouchableOpacity
            onPress={handleConfirm}
            style={styles.primaryButton}
            disabled={isLoading}
            activeOpacity={isDataValid ? 0 : 1}>
            <LinearGradient
              colors={['#FFCB52', '#FF7B02']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.buttonGradient,
                { opacity: isDataValid ? 1 : 0.4 }
              ]}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color="black" />
              ) : (
                <Text style={styles.buttonText}>{t('Continue')}</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

const ProfileMediaForm = () => {
  const isDataValid = true
  const user = useSelector((root: RootState) => root.auth.user)
  const dispatch = useDispatch()
  // PROFILE_PHOTO
  const [profilePhoto, setProfilePhoto] = useState<PhotoItem[] | null>(null)
  const [isProfileUploadModalVisible, setIsProfileUploadModalVisible] =
    useState(false)
  const [isProfileDeleteModalVisible, setIsProfileDeleteModalVisible] =
    useState(false)
  const [isUploading, setIsUploading] = useState(false)

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
  const isProfilePhotoExist = !!profilePhoto?.[0]?.uri

  // COVER_PHOTOS
  const [firstCoverPhoto, setFirstCoverPhoto] = useState<PhotoItem[] | null>(
    null
  )
  const [secondCoverPhoto, setSecondCoverPhoto] = useState<PhotoItem[] | null>(
    null
  )
  const [thirdCoverPhoto, setThirdCoverPhoto] = useState<PhotoItem[] | null>(
    null
  )
  const [fourthCoverPhoto, setFourthCoverPhoto] = useState<PhotoItem[] | null>(
    null
  )

  useEffect(() => {
    const firstPhoto = convertImgToLink(user?.profile?.photos[0])
    const resPhotos = user?.profile.photos.map(convertImgToLink).slice(1)

    // todo replace arrays for photos to objects
    if (firstPhoto) {
      setProfilePhoto([{ uri: firstPhoto, local: false }])
    }
    if (resPhotos && resPhotos.length > 0) {
      setFirstCoverPhoto(
        resPhotos?.[0] ? [{ uri: resPhotos?.[0], local: false }] : null
      )
      setSecondCoverPhoto(
        resPhotos?.[1] ? [{ uri: resPhotos?.[1], local: false }] : null
      )
      setThirdCoverPhoto(
        resPhotos?.[2] ? [{ uri: resPhotos?.[2], local: false }] : null
      )
      setFourthCoverPhoto(
        resPhotos?.[3] ? [{ uri: resPhotos?.[3], local: false }] : null
      )
    }
  }, [user])

  const navigation = useNavigation()

  const handleConfirm = async () => {
    if (!profilePhoto) {
      return Toast.show({
        type: 'error',
        text1: 'You need to upload Profile photo'
      })
    }
    const myPhotos = [
      profilePhoto,
      firstCoverPhoto,
      secondCoverPhoto,
      thirdCoverPhoto,
      fourthCoverPhoto
    ]
      .map(item => item?.[0] ?? null)
      .filter(item => item !== null)

    if (myPhotos.length < 3) {
      return Toast.show({
        type: 'error',
        text1: 'Minimum 2 cover photos required'
      })
    }
    setIsUploading(true)
    const myValidPhotos = await Promise.all(
      myPhotos.map(async item => {
        if (item && item?.fileName && item?.type) {
          const uploadedUrl = await imageUpload(item.uri)
          if (uploadedUrl) {
            return uploadedUrl
          }
        }

        return item?.uri
      })
    )

    if (myValidPhotos.find(item => item.includes('file:/'))) {
      setIsUploading(false)
      return Toast.show({
        type: 'error',
        text1: "Photos can't be uploaded"
      })
    }

    const res = await updateUserProfile({ photos: myValidPhotos })

    if (res && res.profile && user) {
      setIsUploading(false)
      dispatch(setUserData({ ...user, profile: res.profile }))
    }

    navigation.navigate('profile')
  }
  const { t } = useTranslation()

  return (
    <ScrollView
      contentContainerStyle={styles.editPicturesContinueBtn}
      showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, height: '100%' }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: 34
          }}>
          {t('Edit Pictures')}
        </Text>

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
                source={{ uri: profilePhoto?.[0]?.uri }}
                style={{ width: '100%', height: '100%', borderRadius: 95 }}
              />
            ) : (
              <FastImage
                source={require('../../../../assets/icons/Camera.png')}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
          {isProfilePhotoExist && (
            <TouchableOpacity
              style={styles.avatarTrashIconWrapper}
              onPress={handleProfilePhotoDelete}>
              <FastImage
                source={require('../../../../assets/icons/Trash.png')}
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
          setPickerResponse={setProfilePhoto}
          photoType={t('profile')}
        />

        <Text style={styles.description}>{t('Upload Additional Images')}</Text>
        <View style={styles.uploaderWrapper}>
          <CoverPhotoUploader
            photo={firstCoverPhoto}
            setPhoto={setFirstCoverPhoto}
            modalText={`${t('Upload Additional Images')} 1/4`}
          />
          <CoverPhotoUploader
            photo={secondCoverPhoto}
            setPhoto={setSecondCoverPhoto}
            modalText={`${t('Upload Additional Images')} 2/4`}
          />
        </View>
        <View style={styles.uploaderWrapper}>
          <CoverPhotoUploader
            photo={thirdCoverPhoto}
            setPhoto={setThirdCoverPhoto}
            modalText={`${t('Upload Additional Images')} 3/4`}
          />
          <CoverPhotoUploader
            photo={fourthCoverPhoto}
            setPhoto={setFourthCoverPhoto}
            modalText={`${t('Upload Additional Images')} 4/4`}
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
            <Text style={styles.buttonText}>{t('Continue')}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  )
}

export const CoverPhotoUploader = props => {
  const { photo, setPhoto, modalText, imgHeight } = props

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
  const isPhotoExist = !!photo?.[0]?.uri
  const { t } = useTranslation()

  return (
    <Fragment>
      <TouchableOpacity
        style={{ ...styles.imageUploader, height: imgHeight ? imgHeight : 94 }}
        onPress={handlePhotoUpload}>
        {isPhotoExist ? (
          <FastImage
            source={{ uri: photo?.[0]?.uri }}
            style={{ width: '100%', height: imgHeight ? imgHeight : '100%', borderRadius: 10 }}
          />
        ) : (
          <View style={{ width: "auto", height: 94, justifyContent: 'center' }}>
            <FastImage
              source={require('../../../../assets/icons/Camera.png')}
              style={styles.image}
            />
          </View>
        )}

        {isPhotoExist && (
          <TouchableOpacity
            style={styles.trashIconWrapper}
            onPress={handlePhotoDelete}>
            <FastImage
              source={require('../../../../assets/icons/Trash.png')}
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
        text={modalText}
        visible={isUploadModalVisible}
        onCancel={onPhotoCancel}
        setPickerResponse={setPhoto}
        photoType={t('cover')}
      />
    </Fragment>
  )
}

function DeleteMediaModal(props) {
  const { visible, onCancel, onDelete } = props

  const [isModalShow, setIsModalShow] = useState(false)

  const onConfirm = () => {
    // Photo Deletion
    onDelete()
    setIsModalShow(true)
  }

  const handleBack = () => setIsModalShow(false)

  const { t } = useTranslation()

  return (
    <Fragment>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              <View style={styles.alertContainer}>
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                  <Text style={{ color: '#ffffff', fontSize: 15 }}>
                    {t('Do you want to')}
                  </Text>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: 20,
                      fontWeight: '600'
                    }}>
                    {t('Delete')}
                  </Text>
                  <Text style={{ color: '#ffffff', fontSize: 15 }}>
                    {t('this image')}?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 12
                  }}>
                  <TouchableOpacity
                    onPress={onConfirm}
                    style={{
                      flex: 1,
                      width: '100%',
                      borderRadius: 12,
                      alignItems: 'center'
                    }}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: '100%',
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center'
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#ffffff'
                        }}>
                        {t('Yes')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#252525',
                      flex: 1,
                      width: '100%',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center'
                    }}
                    onPress={onCancel}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                      {t('No')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <SuccessModal
        visible={isModalShow}
        handleBack={handleBack}
        action="deleted"
      />
    </Fragment>
  )
}

function UploadingModal(props) {
  const { visible, onCancel, setPickerResponse, text } = props
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const handleImageLibraryPress = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false
      },
      response => {
        if (response.didCancel) {
          // User cancelled image picker
          console.error('Image picker cancelled')
        } else if (response.error) {
          // ImagePicker error
          console.error('ImagePicker Error: ', response.error)
        } else {
          // Image selected successfully
          setUploadedImage(response?.assets)
        }
      }
    )
  }

  const handleUpload = () => {
    setPickerResponse(uploadedImage)
    setUploadedImage(null)
    onCancel()

    setIsSuccessModalOpen(true)
  }

  const { t } = useTranslation()

  return (
    <Fragment>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => onCancel()}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => { }}>
              {uploadedImage ? (
                <View style={styles.alertContainer}>
                  <FastImage
                    source={{ uri: uploadedImage?.[0]?.uri }}
                    style={{
                      width: 194,
                      height: 194,
                      borderRadius: 194,
                      marginBottom: 38,
                      alignSelf: 'center',
                      justifyContent: 'center'
                    }}
                  />

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={handleUpload}
                      style={{
                        width: '100%',
                        borderRadius: 12,
                        alignItems: 'center'
                      }}>
                      <LinearGradient
                        colors={['#FFCB52', '#FF7B02']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        <Text style={styles.btnText}>{t('Upload')}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.alertContainer}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: 84,
                      marginBottom: 16,
                      alignSelf: 'center',
                      justifyContent: 'center'
                    }}>
                    <FastImage
                      source={require('../../../../assets/icons/CameraFilled.png')}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        alignSelf: 'center'
                      }}
                    />
                  </LinearGradient>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#ffffff',
                      marginBottom: 28,
                      textAlign: 'center'
                    }}>
                    {text || t('Upload your profile picture')}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={handleImageLibraryPress}
                      style={{
                        width: '100%',
                        borderRadius: 12,
                        alignItems: 'center'
                      }}>
                      <LinearGradient
                        colors={['#FFCB52', '#FF7B02']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        <Text style={styles.btnText}>{t('Upload')}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <SuccessModal
        action={t('uploaded')}
        visible={isSuccessModalOpen}
        handleBack={() => setIsSuccessModalOpen(false)}
      />
    </Fragment>
  )
}

const SuccessModal = props => {
  const { visible, handleBack, action } = props

  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleBack}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={styles.alertContainer}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: 28,
                  textAlign: 'center'
                }}>
                {t('Photo')} {action} {t('successfully')}!
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleBack}
                  style={{
                    width: '100%',
                    borderRadius: 12,
                    alignItems: 'center'
                  }}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}>
                    <Text style={styles.btnText}>{t('Go back')}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ProfileEditScreen
