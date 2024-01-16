import {
  Dimensions,
  ImageBackground,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleProp,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useIsFocused, useNavigation } from '@react-navigation/native'

import GradientText from '../../../components/GradientText/GradientText'
import { LinearGradient } from 'react-native-linear-gradient'
import SwipeableCard from '../../../components/SwipeableCard/SwipeableCard'
import { ConnectionType, QueryKey } from '../../../types/enum'
import { RootState } from '../../../store/store'
import {
  deleteConnection,
  getConnections,
  newConnection,
  updateConnection
} from '../../../api/connections.methods'
import { User } from '../../../types/user.interface'
import styles from './styled'
import {
  deleteNotification,
  getNotifications,
  NotificationResponseItem,
  readNotification
} from '../../../api/notifications.methods'
import { Loading } from '../../../components/Loading'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { height, width } = Dimensions.get('screen')

enum NotificationTypes {
  WIGGLE = 'wiggle',
  NEW_FOLLOWER = 1,
  FRIEND_IN_CLUB = 'friend_in_club'
}

type INotification = {
  id: number
  type: NotificationTypes
  title: string
  username?: string | null
  text?: string | null
  time: string
}

function Header() {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const handleBack = () => navigation.goBack()

  return (
    <View style={styles.headerWrap}>
      <TouchableOpacity onPress={handleBack}>
        <FastImage
          source={require('../../../../assets/icons/ArrowLeft.png')}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{t('Notifications')}</Text>
      <View style={styles.headerIcon} />
    </View>
  )
}

function NewNotificationsScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const user = useSelector((root: RootState) => root.auth.user)
  const queryClient = useQueryClient()
  const [selectedIdList, setSelectedIdList] = useState<number[]>([])
  const [showModal, setShowModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const handleBack = () => navigation.goBack()
  const { t } = useTranslation()

  const { data, refetch, isLoading } = useQuery(
    [QueryKey.notifications],
    () => getNotifications(),
    { enabled: !!user?.name }
  )

  const readActiveNotifications = async (list: NotificationResponseItem[]) => {
    return readNotification(list[0].token)
  }

  const toggleSelect = (id: number) => {
    setSelectedIdList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const acceptFriendsInvite = async ({
    connection_id,
    notification_id,
    partner_id
  }: {
    connection_id: number
    partner_id: number
    notification_id: number
  }) => {
    console.log('jijii')
    setLoader(true)
    await newConnection({
      partner_id,
      type: 2
    }).then(async () => {
      await readNotification(notification_id).then(res => {
        setLoader(false)
      })
    })

    refetch()
  }

  const handleDeleteNotification = async (notification_id: number) => {
    setLoader(true)
    await deleteNotification(notification_id).then(() => {
      setLoader(false)
    })
    refetch()
  }

  const declineFriensInvite = async ({
    connection_id,
    notification_id,
    partner_id
  }: {
    connection_id: number
    notification_id: number
    partner_id: number
  }) => {
    setLoader(true)
    await newConnection({
      partner_id,
      type: 0
    }).then(async () => {
      await readNotification(notification_id).then(res => {
        setLoader(false)
      })
    })

    refetch()
  }

  const handleDeleteSelectedNotification = async () => {
    setLoader(true)
    await Promise.allSettled(selectedIdList.map(deleteNotification)).then(
      () => {
        setLoader(false)
        setShowModal(false)
        setSelectedIdList([])
        refetch()
      }
    )
  }

  const notificationsData = useMemo(() => {
    return [
      {
        title: 'Active',
        data: data?.filter(item => item.active === 1) ?? []
      },
      {
        title: 'Recent',
        data: data?.filter(item => item.active === 0) ?? []
      }
    ]
  }, [data])

  useEffect(() => {
    if (isFocused && notificationsData[0].data.length > 0) {
      readActiveNotifications(notificationsData[0].data)
    }
  }, [isFocused, notificationsData])

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/eventBackground.png')}
      style={styles.bgImageWrapper}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.wrapFill}>
        <Header />
        <SectionList
          sections={notificationsData}
          refreshControl={
            <RefreshControl
              refreshing={isLoading || loader}
              tintColor={'#FFCB52'}
              colors={['#FFCB52']}
            />
          }
          style={{ paddingHorizontal: 15, marginTop: 25 }}
          renderSectionHeader={({ section: { title, data } }) =>
            data && data.length > 0 ? (
              <Text style={styles.sectionTitle}>{title}</Text>
            ) : null
          }
          renderItem={({ item }) => {
            return (
              <NotificationItem
                item={item}
                selected={selectedIdList.includes(item.id)}
                onLongPress={toggleSelect}
                acceptFriendsInvite={acceptFriendsInvite}
                declineFriensInvite={declineFriensInvite}
                handleDeleteNotification={handleDeleteNotification}
              />
            )
          }}
        />
        {selectedIdList.length > 0 && (
          <View style={styles.bottomDeleteButtonWrap}>
            <ActionButton
              label="Delete"
              onPress={() => setShowModal(true)}
              type="primary"
              style={styles.bottomDeleteButton}
              gradientStyle={styles.bottomDeleteButtonGradient}
            />
          </View>
        )}
        <ConfirmationModal
          isVisible={showModal}
          isAllSelected={data?.length === selectedIdList.length}
          onCancel={() => setShowModal(false)}
          onRemove={handleDeleteSelectedNotification}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

type NotificationProps = {
  item: NotificationResponseItem
  selected: boolean
  onLongPress: (id: number) => void
  acceptFriendsInvite?: (data: {
    connection_id: number
    partner_id: number
    notification_id: number
  }) => void
  declineFriensInvite?: (data: {
    connection_id: number
    notification_id: number
    partner_id: number
  }) => void
  handleDeleteNotification?: (notification_id: number) => void
}

function NotificationItem({
  item,
  selected,
  onLongPress,
  acceptFriendsInvite,
  declineFriensInvite,
  handleDeleteNotification
}: NotificationProps) {
  const { t } = useTranslation()

  const text = useMemo(() => {
    if (item.message.type === ConnectionType.REQUESTED && item?.partner) {
      return `${item.message.title.replace('Another user', item.partner.name)}`
    }

    return item.message.title
  }, [])

  const actionButtons = useMemo(() => {
    if (Number(item.message.type) === ConnectionType.REQUESTED) {
      return (
        <View style={styles.actionButtonsWrap}>
          <ActionButton
            type="primary"
            label={t('Accept')}
            onPress={() => {
              acceptFriendsInvite?.({
                connection_id: item.message.model_id,
                notification_id: item.id,
                partner_id: item.message.sender.id
              })
            }}
            gradientStyle={styles.acceptBtnView}
          />
          <ActionButton
            type="secondary"
            label={t('Decline')}
            onPress={() => {
              declineFriensInvite?.({
                connection_id: item.message.model_id,
                notification_id: item.id,
                partner_id: item.message.sender.id
              })
            }}
            style={styles.declineBtnView}
          />
        </View>
      )
    }
    return null
  }, [])

  const notificationIcon = useMemo(() => {
    if (
      item?.message.sender &&
      item?.message.sender?.profile?.photos &&
      item?.message.sender?.profile?.photos.length > 0
    ) {
      return (
        <FastImage
          style={{ width: 44, height: 44, borderRadius: 22, marginRight: 16 }}
          source={{
            uri: convertImgToLink(item?.message.sender?.profile?.photos[0])
          }}
        />
      )
    }

    return <NotificationLogo theme="dark" />
  }, [])

  return (
    <SwipeableCard
      onRemove={() => handleDeleteNotification?.(item.id)}
      onLongPress={() => {
        onLongPress(item?.id)
      }}
      style={{ backgroundColor: '#FFCB52', borderRadius: 9, marginBottom: 10 }}>
      <View
        style={[
          styles.notificationWrap,
          // { backgroundColor: selected ? '#252525' : 'transparent' }
          { backgroundColor: '#252525' }
        ]}>
        {notificationIcon}
        <View style={styles.wrapFill}>
          <GradientText
            style={styles.gradientText}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#FFCB52', '#FF7B02']}>
            {item?.message.old_notification_message.title ?? 'Wiggle'}
          </GradientText>
          <Text style={styles.notificationText} numberOfLines={2}>
            {item?.message.old_notification_message.body}
          </Text>
          {actionButtons}
        </View>
        <View>
          <Text style={styles.notificationTime}>
            {moment(item.updated_at).format('hh:mm')}
          </Text>
        </View>
      </View>
    </SwipeableCard>
  )
}

const GradientOrangeWrap = ({ children }: { children: JSX.Element }) => (
  <LinearGradient
    colors={['#FFCB52', '#FF7B02']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientWrap}>
    {children}
  </LinearGradient>
)

type AvatarProps = {
  theme: 'dark' | 'light'
}

const Avatar = ({ theme }: AvatarProps) => {
  return (
    <View
      style={[
        styles.notificationAvatarWrap,
        { backgroundColor: theme === 'dark' ? '#000' : '#fff' }
      ]}>
      <FastImage
        source={require('../../../../assets/icons/NotificationLogo.png')}
        style={[
          styles.notificationAvatar,
          { backgroundColor: theme === 'dark' ? '#000' : '#fff' }
        ]}
      />
    </View>
  )
}

const NotificationLogo = ({ theme }: AvatarProps) => {
  return theme === 'dark' ? (
    <GradientOrangeWrap>
      <Avatar theme="dark" />
    </GradientOrangeWrap>
  ) : (
    <Avatar theme="light" />
  )
}

type ActionButtonProps = {
  onPress: () => void
  type: 'primary' | 'secondary'
  label: string
  style?: StyleProp<ViewStyle>
  gradientStyle?: StyleProp<ViewStyle>
}

const ActionButton = ({
  onPress,
  label,
  type,
  style,
  gradientStyle
}: ActionButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.actionButtonWrap]}>
      {type === 'primary' ? (
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.actionButtonGradient, gradientStyle]}>
          <Text style={styles.actionButtonText}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.actionButtonWrapSecondary, style]}>
          <Text style={styles.actionButtonText}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

type ConfirmModalProps = {
  onRemove: () => void
  onCancel: () => void
  isAllSelected: boolean
  isVisible: boolean
}

const ConfirmationModal = ({
  onRemove,
  onCancel,
  isAllSelected,
  isVisible
}: ConfirmModalProps) => {
  const { t } = useTranslation()

  const computedAlert = isAllSelected
    ? t('these notifications')
    : t('this notification')

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.confirmModalWrap}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.confirmModalContainer}>
              <View style={styles.confirmModalTextWrap}>
                <Text style={styles.confirmModalText}>
                  {t('Are you sure you want to')}
                </Text>
                <View style={styles.gradientView}>
                  <GradientText
                    style={styles.confirmModalGradientText}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FFCB52', '#FF7B02']}>
                    {t('delete')}
                  </GradientText>
                  <Text style={styles.computedText}>{computedAlert}?</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={onRemove}
                  style={styles.confirmModalYesButton}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.confirmModalYesButtonGradient}>
                    <Text style={styles.confirmModalButtonText}>
                      {t('Yes, Delete')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onCancel}
                  style={styles.confirmModalNoButton}>
                  <Text style={styles.confirmModalButtonText}>{t('No')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default NewNotificationsScreen
