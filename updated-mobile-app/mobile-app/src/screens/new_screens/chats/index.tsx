import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
  RefreshControl,
  ImageBackground,
  NativeEventEmitter,
  NativeModules,
  Platform
} from 'react-native'
import moment from 'moment'
import FastImage from 'react-native-fast-image'
import { useQuery } from 'react-query'
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
  useFocusEffect
} from '@react-navigation/native'

import { chatSearch, getChats } from '../../../api/chat.methods'
import {
  searchActiveUsers,
  getAllConnectedUsers
} from '../../../api/user.methods'
import { ConnectionType, QueryKey } from '../../../types/enum'
import {
  ConnectionsResponse,
  newConnection
} from '../../../api/connections.methods'
import { RootStackParamList } from '../../../RootNavigation'
import { RootState } from '../../../store/store'
import { User } from '../../../types/user.interface'
import styles from './styled'
import { Header, SearchBar } from '../events'
import { useTranslation } from 'react-i18next'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import styled from './styled'
import { getNotifications } from '../../../api/notifications.methods'

function ChatsScreen(): JSX.Element {
  const myUser = useSelector((root: RootState) => root.auth.user)
  const isFocused = useIsFocused()
  const { t } = useTranslation()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'bottom_tab_navigator'>>()

  const [searchInput, setSearchInput] = useState('')

  const [allConversations, setAllConversations] = useState()

  const {
    data,
    refetch,
    isLoading: isLoadingChats
  } = useQuery([QueryKey.chats], getChats)

  const { data: activeUsers } = useQuery(
    [QueryKey.activeUsers],
    searchActiveUsers
  )

  const { data: connectedUsers } = useQuery(
    ['connectedUsers'],
    getAllConnectedUsers
  )

  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  const { data: notificationData } = useQuery({
    queryKey: [QueryKey.notifications],
    queryFn: () => getNotifications(),
    refetchInterval: 60 * 1000
  })

  const activeNotifications = useMemo(() => {
    if (notificationData && notificationData?.length > 0) {
      return notificationData?.filter(item => item.active === 1)
    }

    return []
  }, [notificationData])

  const goToUser = async (user: User) => {
    try {
      const connection = await newConnection({
        partner_id: user.id,
        type: ConnectionType.MESSAGE
      })

      if (connection && connection?.id) {
        navigation.navigate('chat', {
          connection_id: connection.id,
          userId: connection.partner_id
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const goToChat = (
    connection_id: number,
    userId: number,
    openPickerOnMount: boolean = false
  ) => {
    navigation.navigate('chat', {
      connection_id,
      userId,
      openPickerOnMount
    })
  }

  const goToUserChatTwilio = async (
    userId: number,
    openPickerOnMount: boolean = false
  ) => {
    navigation.navigate('conversation', {
      userId,
      openPickerOnMount
    })
  }

  const goToUserProfile = (user_id: number) => {
    navigation.navigate('profile', { user_id })
  }
  const chatsData = useMemo(() => {
    const { connections = [] } = data ?? {}

    if (connections.length === 0) {
      return []
    }
    return connections
  }, [data, isLoadingChats])

  const ListFooterComponent = () => <View style={styled.listFooterStyling} />

  const filterChats = useMemo(() => {
    if (searchInput?.length === 0) return chatsData ?? []
    else
      return (
        chatsData?.sort((a, b) => (a.updated_at > b.updated_at ? 1 : -1))
        .filter(chatItem => {
          return (
            chatItem?.partner?.profile?.firstName
              ?.trim()
              ?.toLowerCase()
              ?.startsWith(searchInput.toLowerCase()) ||
            chatItem?.partner?.profile?.lastName
              ?.trim()
              ?.toLowerCase()
              ?.startsWith(searchInput.toLowerCase()) ||
            (
              chatItem?.partner?.profile?.firstName?.trim() +
              ' ' +
              chatItem?.partner?.profile?.lastName?.trim()
            )
              ?.toLowerCase()
              ?.startsWith(searchInput.toLowerCase())
          )
        }) ?? []
      )
  }, [searchInput, chatsData])

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/search_background.png')}
      style={styles.background}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: 50,
          paddingBottom: 80
        }}>
        <StatusBar barStyle={'light-content'} backgroundColor="black" />
        <View style={{ paddingHorizontal: 20 }}>
          <Header
            username={myUser?.profile.firstName ?? 'User'}
            location={
              myUser?.profile?.geolocation?.city &&
              myUser?.profile?.geolocation?.country
                ? `${myUser?.profile?.geolocation?.city}, ${myUser?.profile?.geolocation?.country}`
                : ''
            }
            notifications={activeNotifications}
            preComponent={
              <TouchableOpacity
                style={{ marginRight: 14 }}
                onPress={() => navigation.navigate('chat_user_search')}>
                <FastImage
                  source={require('../../../../assets/icons/UserWrite.png')}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            }
          />
          <SearchBar
            searchInput={searchInput}
            onChangeSearchInput={setSearchInput}
            searchLabel={`${t('Search for Message')}`}
          />
        </View>
        <View>
          <ScrollView horizontal style={{ marginLeft: 20 }}>
            {activeUsers?.customers.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => goToUserProfile(item?.id)}
                style={styles.activeUserView}>
                <FastImage
                  source={
                    item?.profile?.photos?.length > 0
                      ? { uri: convertImgToLink(item.profile.photos[0]) }
                      : require('../../../../assets/icons/Avatar.png')
                  }
                  style={styles.activeUserIcon}
                />
                {item?.is_online && <View style={styles.onlineBadge} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={filterChats}
          keyExtractor={item => String(item?.id)}
          style={styles.chatListView}
          ListFooterComponent={ListFooterComponent}
          refreshControl={
            <RefreshControl
              refreshing={isLoadingChats}
              onRefresh={refetch}
              tintColor={'#FFCB52'}
              colors={['#FFCB52']}
            />
          }
          renderItem={({ item }) => {
            const validPartnerProfileId =
              item.user_id === myUser?.id ? item?.partner_id : item?.user_id

            return (
              <ConnectionItem
                myUserId={myUser?.id ?? 0}
                item={item}
                onPress={photoMode =>
                  goToUserChatTwilio(validPartnerProfileId, photoMode)
                }
                onPressPhoto={() => goToUserProfile(validPartnerProfileId)}
              />
            )
            // else return null
          }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <FastImage
                resizeMode="cover"
                source={require('../../../../assets/icons/wiggleLogo.png')}
                style={styles.wiggleLogo}
              />
              <Text style={styles.emptyListText}>
                {t('Sorry, You don’t have any messages')}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

type ISearchItem =
  ConnectionsResponse['connections'][number]['messages'][number]

function SearchMessageItem({
  item,
  onPress,
  onPressPhoto
}: {
  item: ISearchItem
  onPress: (photoMode: boolean) => void
  onPressPhoto: () => void
}) {
  return (
    <TouchableOpacity
      onPress={() => onPress(false)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        overflow: 'visible'
      }}>
      <TouchableOpacity style={{ position: 'relative' }} onPress={onPressPhoto}>
        <FastImage
          source={{ uri: convertImgToLink(item?.user?.profile?.photos?.[0]) }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        {item.user?.is_online && (
          <View style={[styles.onlineBadge, { right: 0 }]} />
        )}
      </TouchableOpacity>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.messageUsername}>
          {item.user?.profile?.firstName} {item.user?.profile?.lastName}
        </Text>
      </View>
      <TouchableOpacity
        style={{ alignItems: 'flex-end' }}
        onPress={() => onPress(true)}>
        <FastImage
          source={require('../../../../assets/icons/CameraWhite.png')}
          style={{ width: 24, height: 24 }}
        />
        <Text style={styles.messageTime}>
          {moment(item.updated_at).fromNow()}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
type IConnectionItem = ConnectionsResponse['connections'][number]

function ConnectionItem({
  item,
  onPress,
  onPressPhoto,
  myUserId
}: {
  item: IConnectionItem
  onPress: (photoMode: boolean) => void
  onPressPhoto: () => void
  myUserId: number
}) {
  const validUser = item.user_id === myUserId ? item?.partner : item?.user
  const validPartnerProfile = validUser?.profile

  return (
    <TouchableOpacity
      onPress={() => onPress(false)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        overflow: 'visible'
      }}>
      <TouchableOpacity style={{ position: 'relative' }} onPress={onPressPhoto}>
        <FastImage
          source={{ uri: convertImgToLink(validPartnerProfile?.photos?.[0]) }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        {(item.conversation.unread_messages_count > 0 &&
          item.conversation.unread_messages_count != null) && (
          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>{item.conversation.unread_messages_count}</Text>
          </View>
        )}
        {validUser?.is_online && (
          <View style={[styles.onlineBadge, { right: 0 }]} />
        )}
      </TouchableOpacity>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <Text style={styles.messageUsername}>
          {validPartnerProfile?.firstName} {validPartnerProfile?.lastName}
        </Text>

        <Text
          style={[
            styles.messageText,
            { color: (item.conversation.unread_messages_count > 0 &&
              item.conversation.unread_messages_count != null) ? '#FFF' : '#686868' }
          ]}
          numberOfLines={1}>
          {item.messages.length > 0
            ? item.messages[item.messages.length - 1].image_id
              ? 'Image'
              : item.messages[0].message
            : 'No messages'}
        </Text>
      </View>
      <TouchableOpacity style={styled.cameraView} onPress={() => onPress(true)}>
        <FastImage
          source={require('../../../../assets/icons/chat_list_camera_icon.png')}
          style={styles.cameraIcon}
        />
        <Text style={styles.messageTime}>
          {moment(item.updated_at).fromNow()}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ChatsScreen
