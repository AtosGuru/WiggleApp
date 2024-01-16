import { ConnectionType, QueryKey } from '../../../types/enum'
import {
  newConnection
} from '../../../api/connections.methods'
import {
  NavigationProp,
  useNavigation
} from '@react-navigation/native'
import React, {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native'
import { searchUsers } from '../../../api/user.methods'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import FastImage from 'react-native-fast-image'
import { RootStackParamList } from '../../../RootNavigation'
import { User } from '../../../types/user.interface'
import styles from './styled'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import { SEARCHING_USER_LOADER_COLOR } from '../../../constants/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { getChats } from '../../../api/chat.methods'

const { height, width } = Dimensions.get('screen')

function ChatUserSearch(): JSX.Element {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'bottom_tab_navigator'>>()
  const myUser = useSelector((root: RootState) => root.auth.user)

  const [input, setInput] = useState('')

  const { data: searchResult, isLoading } = useQuery(
    [QueryKey.userSearch, input],
    searchUsers,
    { enabled: input.length > 2 }
  )

  const {
    data,
    refetch,
    isLoading: isLoadingChats
  } = useQuery([QueryKey.chats], getChats)

  const chatsData = useMemo(() => {
    const { connections = [] } = data ?? {}

    if (connections.length === 0) {
      return []
    }
    return connections
  }, [data, isLoadingChats])


  const handleBack = () => navigation.goBack()

  const goToUserChatTwilio = async (user: User) => {
    navigation.navigate('conversation', {
      userId: user.id
    })
  }


  const goToUserChat = async (user: User) => {
    const connectionAlreadyAvailable = chatsData?.find(f => f?.partner_id === user?.id);

    if (connectionAlreadyAvailable)
      navigation.navigate('chat', {
        connection_id: connectionAlreadyAvailable.id,
        userId: connectionAlreadyAvailable.partner_id
      })
    else {
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
  }

  const goToUserProfile = (user: User) => {
    navigation.navigate('profile', { user_id: user.id })
  }

  const filterResult = useMemo(() => {
    if (myUser)
      return searchResult?.customers?.filter(filterItem => filterItem.id !== myUser.id) ?? [];
    else return searchResult?.customers ?? [];
  }, [myUser, searchResult])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', paddingTop: 60 }}>
      <View style={styles.backgroundImageWrapper}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ flex: 1, width, height }}
        />
      </View>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack}>
            <FastImage
              source={require('../../../../assets/icons/ArrowLeft.png')}
              style={{
                width: 24,
                height: 24
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'white'
            }}>
            New message
          </Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder={'Type a Name'}
            placeholderTextColor="#B0B0B0"
            style={styles.searchInput}
            value={input}
            onChangeText={setInput}
          />
          <FastImage
            source={require('../../../../assets/icons/Search.png')}
            style={styles.searchIcon}
          />
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 12 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            colors={[SEARCHING_USER_LOADER_COLOR]}
          />
        }
      >
        {filterResult?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => goToUserChatTwilio(item)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 22
            }}>
            <TouchableOpacity
              style={{ width: 50, height: 50, marginRight: 17 }}
              onPress={() => goToUserProfile(item)}>
              <FastImage
                source={{ uri: convertImgToLink(item?.profile?.photos?.[0]) }}
                defaultSource={require('../../../../assets/icons/Avatar.png')}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25
                }}
              />
            </TouchableOpacity>
            <Text style={styles.messageText}>
              {item.profile.firstName} {item.profile.lastName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChatUserSearch
