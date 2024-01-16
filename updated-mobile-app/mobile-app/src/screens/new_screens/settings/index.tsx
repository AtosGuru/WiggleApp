import React, { Fragment, useState } from 'react'
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking,
  ActivityIndicator
} from 'react-native'

import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from 'react-native-linear-gradient'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { logout } from '../../../api'
import { RootState } from '../../../store/store'
import { setUserData } from '../../../store/auth'
import { User } from '../../../types/user.interface'
import { languages } from '../../../constants/languages'
import { axiosInstance } from '../../../api/axiosInstance'
import { getUser, updateSetting } from '../../../api/user.methods'
import { RootStackParamList } from '../../../RootNavigation'
import { updateUserProfile } from '../../../api/user.methods'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import GradientText from '../../../components/GradientText/GradientText'
import styles from './styled'

const { height, width } = Dimensions.get('screen')

const TERMS_URL = 'https://thewiggleapp.com/terms'
const PRIVACY_URL = 'https://thewiggleapp.com/privacy'

function SettingsScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'settings'>>()

  const { i18n, t } = useTranslation()
  const user = useSelector((root: RootState) => root.auth.user)

  const [isModalOpen, setModalIsOpen] = useState(false)
  const [isNotifications, setIsNotifications] = useState(user?.profile?.is_notification ?? false)
  const [isPrivate, setIsPrivate] = useState(user?.profile.is_private ?? false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isDating, setIsDating] = useState(user?.profile?.is_dating ?? true)
  const [isLoading, setIsLoading] = useState(false)

  const onModalClose = () => setModalIsOpen(false)

  const handleBack = () => navigation.goBack()

  const settings = [
    {
      icon: require('../../../../assets/icons/Terms.png'),
      setting: t('Terms & Conditions'),
      onPress: () => {
        Linking.openURL(TERMS_URL)

      }
    },
    {
      icon: require('../../../../assets/icons/PrivacyPolicy.png'),
      setting: t('Privacy Policy'),
      onPress: () => {
        Linking.openURL(PRIVACY_URL)

      }
    },
    {
      icon: require('../../../../assets/icons/Block.png'),
      setting: t('Blocked Users'),
      onPress: () => navigation.navigate('blocked')
    },
    {
      icon: require('../../../../assets/icons/Support.png'),
      setting: t('Support'),
      onPress: () => navigation.navigate('support', { isReport: false })
    },
    {
      icon: require('../../../../assets/images/Logo2.png'),
      setting: t('Nightclub Missing?'),
      onPress: () => { }
    }
  ]

  const handleChangePrivateMode = async (enablePrivate: boolean) => {
    try {
      setIsUpdating(true)
      const res = await updateUserProfile({ is_private: enablePrivate })

      if (res?.profile) {
        setIsPrivate(res.profile?.is_private ?? false)
      }
    } catch (err) {
      throw err
    } finally {
      setIsUpdating(false)
    }
  }

  const getUserInfo = async () => {
    const res = await getUser()
    console.log('Settings: ', res)
    if (res) {
      dispatch(setUserData(res))
    }
  }

  const activeGradient = ['#FFCB52', '#FF7B02']
  const transparentGradient = ['transparent', 'transparent']

  const dispatch = useDispatch()
  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    } finally {
      dispatch(setUserData(null))
      setIsLoading(false)
    }
  }

  const updateDating = async (payload: boolean) => {
    setIsDating(!payload)
    await updateSetting({ "is_dating": !payload, "is_notification": isNotifications })
    await getUserInfo()
  }

  const updateNotification = async (payload: boolean) => {
    setIsNotifications(!payload)
    await updateSetting({ "is_dating": isDating, "is_notification": !payload })
    await getUserInfo()
  }

  return (
    <Fragment>
      <View style={styles.backgroundImageWrapper}>
        <FastImage
          source={require('../../../../assets/images/search_background.png')}
          style={{ width, height }}
        />
      </View>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={'light-content'} />

            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={styles.headerContent}>
                <TouchableOpacity onPress={handleBack}>
                  <FastImage
                    source={require('../../../../assets/icons/ArrowLeft.png')}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.headerText}>{t('Settings')}</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* Avatar */}
              <TouchableOpacity
                onPress={() => navigation.navigate('profile_edit')}
                style={styles.avatarContainer}>
                <FastImage
                  source={{ uri: convertImgToLink(user?.profile?.photos?.[0]) }}
                  style={styles.avatarImage}
                />

                <View style={styles.userInfo}>
                  <Text style={styles.fullName}>
                    {user?.profile.firstName} {user?.profile.lastName}
                  </Text>

                </View>

                <FastImage
                  style={styles.editIcon}
                  source={require('../../../../assets/icons/UserEdit.png')}
                />
              </TouchableOpacity>



              {/* dating */}
              <View style={styles.datingContainer}>
                <FastImage
                  style={styles.datingIcon}
                  source={require('../../../../assets/icons/Profile2User.png')}
                />

                <Text style={styles.datingText}>{t('Dating')}</Text>

                <TouchableOpacity onPress={() => setShowInfo(!showInfo)} style={styles.infoIconContainer}>
                  {/* info Modal */}
                  {showInfo ? <View style={styles.infoModal}>
                    <Text style={styles.infoText}>{t('This option makes you visible in Wiggle dating')}</Text>
                  </View> : null}
                  <FastImage
                    resizeMode="contain"
                    style={styles.infoIcon}
                    source={require('../../../../assets/icons/infoMark.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.toggleSwitch,
                    {
                      backgroundColor: isDating ? 'transparent' : '#767577',
                    }
                  ]}
                  onPress={() => {
                    updateDating(isDating)
                  }}
                >
                  <LinearGradient
                    colors={isDating ? ['#FFCB52', '#FF7B02'] : ['#767577', '#767577']}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.linearGradient, { alignItems: isDating ? 'flex-end' : 'flex-start', }]}>
                    {isDating ? (
                      <View style={styles.toggleOn}>
                        <Text style={styles.toggleText}>{t('On')}</Text>
                        <View style={styles.toggleIndicator} />
                      </View>
                    ) : (
                      <View style={styles.toggleOff}>
                        <View style={styles.toggleIndicator} />
                        <Text style={styles.toggleLeftText}>{t('Off')}</Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Notifications */}
              <View
                style={styles.datingContainer}>
                <FastImage
                  style={styles.datingIcon}
                  source={require('../../../../assets/icons/NotificationBell.png')}
                />

                <Text
                  style={styles.datingText}>
                  {t('Notifications')}
                </Text>
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: isNotifications
                        ? 'transparent'
                        : '#767577',
                    },
                    styles.toggleSwitch,
                  ]}
                  onPress={() => {
                    updateNotification(isNotifications)
                  }}
                >
                  <LinearGradient
                    colors={
                      isNotifications
                        ? ['#FFCB52', '#FF7B02']
                        : ['#767577', '#767577']
                    }
                    start={{ x: 1, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.linearGradient, { alignItems: isNotifications ? 'flex-end' : 'flex-start', }]}>
                    {isNotifications ? (
                      <View style={styles.toggleOn}>
                        <Text
                          style={styles.toggleText}>
                          {t('On')}
                        </Text>
                        <View
                          style={styles.toggleIndicator}
                        />
                      </View>
                    ) : (
                      <View style={styles.toggleOff}>
                        <View
                          style={styles.toggleIndicator}
                        />
                        <Text style={styles.toggleLeftText}>
                          {t('Off')}
                        </Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Private */}
              <View style={styles.privateContainer}>
                <View style={styles.privateHeader}>
                  <FastImage
                    style={styles.privateIcon}
                    source={require('../../../../assets/icons/Profile2User.png')}
                  />

                  <Text style={styles.privateLabel}>
                    {t('Private Settings')}
                  </Text>
                </View>

                <View style={styles.selectWrapper}>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleChangePrivateMode(false)}
                    disabled={isUpdating}>
                    <LinearGradient
                      style={styles.ButtonGradientWrap}
                      colors={!isPrivate ? activeGradient : transparentGradient}>
                      <Text style={styles.privateSelectText}>{t('Public')}</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleChangePrivateMode(true)}
                    disabled={isUpdating}>
                    <LinearGradient
                      style={styles.privateButtonGradientWrap}
                      colors={isPrivate ? activeGradient : transparentGradient}>
                      <Text style={styles.selectText}>{t('Private')}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Language */}
              <TouchableOpacity
                onPress={() => navigation.navigate('language')}
                style={styles.languageContainer}>
                <FastImage
                  style={styles.languageIcon}
                  source={require('../../../../assets/icons/Language.png')}
                />

                <View style={styles.languageInfo}>
                  <Text style={styles.languageTitle}>{t('Language')}</Text>
                  <Text style={styles.languageText}>
                    {
                      languages?.filter(
                        item => item?.value === i18n.language
                      )[0].label
                    }
                  </Text>
                </View>

                <FastImage
                  style={styles.arrowIcon}
                  source={require('../../../../assets/icons/ArrowRight.png')}
                />
              </TouchableOpacity>

              {settings.map(({ setting, onPress, icon }, index) => {
                return (
                  <TouchableOpacity
                    key={`${index}-settings`}
                    style={styles.settingContainer}
                    onPress={onPress}
                  >
                    <FastImage
                      style={setting == 'Nightclub Missing?' ? styles.settingNightIcon : styles.settingIcon}
                      source={icon}
                    />
                    <Text style={styles.settingText}>
                      {t(setting)}
                    </Text>
                    <FastImage
                      style={styles.arrowIcon}
                      source={require('../../../../assets/icons/ArrowRight.png')}
                    />
                  </TouchableOpacity>
                )
              }
              )}

              <Text
                style={styles.deleteAccountText}
                onPress={() => setModalIsOpen(true)}>
                {t('Delete account')}
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#FFCB52', '#FF7B02']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.logoutGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator size={'small'} color="black" />
                  ) : (
                    <Text style={styles.logoutText}>
                      {t('Logout')}
                    </Text>
                  )}

                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <DeleteAccountModal visible={isModalOpen} onClose={onModalClose} />
    </Fragment>
  )
}

const DeleteAccountModal = (props: { visible: boolean; onClose: any }) => {
  const { visible, onClose } = props
  const [isModalShow, setIsModalShow] = useState(false)

  const { t } = useTranslation()

  const onConfirmDeleting = () => {
    onClose()
    setIsModalShow(true)
  }

  const onConfirm = () => onClose()

  const handleClose = () => setIsModalShow(false)

  return (
    <Fragment>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.deleteAccountContainer}>
            <TouchableOpacity style={styles.main}>
              <View style={styles.modalContainer}>
                <View style={styles.titleContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.titleText}>
                      {`${t('Before you')} `}
                    </Text>
                    <Text style={[styles.titleText, styles.boldTitleText]}>
                      {t('Delete')}
                    </Text>
                  </View>
                  <Text style={[styles.titleText, styles.boldTitleText]}>
                    {t('Do you want to try')}
                  </Text>
                  <GradientText
                    style={styles.goldText}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FFCB52', '#FF7B02']}
                  >
                    {t('Wiggle Gold')}
                  </GradientText>
                  <View style={styles.titleRow}>
                    <Text style={[styles.titleText, styles.boldTitleText]}>
                      {`${t('a month for')} `}
                    </Text>
                    <GradientText
                      style={[styles.titleText, styles.boldTitleText]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={['#FFCB52', '#FF7B02']}
                    >
                      {t('free')}
                    </GradientText>
                    <Text style={[styles.titleText, styles.boldTitleText]}>?</Text>
                  </View>
                </View>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    onPress={onConfirm}
                    style={styles.confirmButton}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.confirmButtonGradient}
                    >
                      <Text style={styles.confirmButtonText}>
                        {t('Yes')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onConfirmDeleting}
                    style={styles.deleteAnywayButton}>
                    <Text style={styles.deleteAnywayButtonText}>
                      {t('Delete Anyway')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ConfirmationModal
        visible={isModalShow}
        onClose={handleClose}
        action="deleted"
      />
    </Fragment>
  )
}

export async function removeUserProfile(user: User | null) {
  try {
    const res = await axiosInstance.delete('api/v1/user/delete', {
      params: user
    })

    return res.data
  } catch (err) {
    console.error('Error while removing user account', err)
    throw err
  }
}

function ConfirmationModal(props: { visible: boolean; onClose: any }) {
  const { visible, onClose } = props
  const user = useSelector((root: RootState) => root.auth.user)
  const [isModalShow, setIsModalShow] = useState(false)

  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      dispatch(setUserData(null))
    }
  }

  const onConfirm = async () => {
    await removeUserProfile(user)
    handleLogout()
    onClose()
    setIsModalShow(true)
  }

  const { t } = useTranslation()

  const handleClose = () => setIsModalShow(false)

  return (
    <Fragment>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.confirmationContainer}>
            <TouchableOpacity onPress={() => { }}>
              <View style={styles.confirmationModalContainer}>
                <View style={styles.confirmationTitleContainer}>
                  <Text style={styles.confirmationTitleText}>
                    {t('Are you sure you want to delete your account')}?
                  </Text>
                </View>
                <View style={styles.confirmationButtonsContainer}>
                  <TouchableOpacity
                    onPress={onConfirm}
                    style={styles.confirmationConfirmButton}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.confirmationConfirmButtonGradient}
                    >
                      <Text style={styles.confirmationConfirmButtonText}>
                        {t('Yes')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.confirmationNoButton}>
                    <Text style={styles.confirmationNoButtonText}>
                      {t('No')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <SuccessModal
        visible={isModalShow}
        onClose={handleClose}
        action="deleted"
      />
    </Fragment>
  )
}

const SuccessModal = (props: { visible: boolean; onClose: any }) => {
  const { visible, onClose } = props

  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.confirmationSuccessContainer}>
          <TouchableWithoutFeedback onPress={() => { }}>
            <View>
              <TouchableOpacity
                onPress={onClose}
                style={styles.confirmationCloseButton}>
                <FastImage
                  source={require('../../../../assets/icons/close.png')}
                  style={styles.confirmationCloseIcon}
                />
              </TouchableOpacity>
              <View style={styles.confirmationModalContainer}>
                <FastImage
                  source={require('../../../../assets/images/wiggleNewLogo.png')}
                  style={styles.confirmationLogo}
                />

                <Text style={styles.confirmationSuccessText}>
                  {t('Account Deleted')}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}



export default SettingsScreen
