import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet'
import FastImage from 'react-native-fast-image'
import { useTranslation } from 'react-i18next'
import Share, { Social } from 'react-native-share'
import Clipboard from '@react-native-clipboard/clipboard'
import Toast from 'react-native-toast-message'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { SearchInput } from '../SearchInput'
import GradientText from '../GradientText/GradientText'
import { createDynamicLink, DeepLinkTypes } from '../../hooks/useDynamicLinks'
import { ConnectionType, QueryKey } from '../../types/enum'
import { getChats } from '../../api/chat.methods'
import { RootState } from '../../store/store'
import { RootStackParamList } from '../../RootNavigation'
import { getConnections, newConnection } from '../../api/connections.methods'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { getSearchFollowUsers, searchActiveUsers, searchUsers } from '../../api/user.methods'
import { User } from '../../types/user.interface'
import { convertImgToLink } from '../../helpers/convertImgToLink'

const shareAppList = [
  {
    name: 'Viber',
    icon: require('../../../assets/icons/viber.png'),
    package: Social.Viber
  },
  {
    name: 'WhatsApp',
    icon: require('../../../assets/icons/whatsapp.png'),
    package: Social.Whatsapp
  },
  {
    name: 'Telegram',
    icon: require('../../../assets/icons/telegram.png'),
    package: Social.Telegram
  },
  {
    name: 'Instagram',
    icon: require('../../../assets/icons/instagram.png'),
    package: Social.Instagram
  },
  {
    name: 'Snapchat',
    icon: require('../../../assets/icons/snapchat.png'),
    package: Social.Snapchat
  }
]

type ShareBottomDLProps = {
  opened: boolean
  onClose: () => void
  type: DeepLinkTypes
  pathId: string | number
}

export const ShareBottomDL = ({
  opened,
  onClose,
  type,
  pathId
}: ShareBottomDLProps) => {
  const { t } = useTranslation()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'event' | 'profile'>>()
  const myUser = useSelector((root: RootState) => root.auth.user)

  const bottomSheetRef = useRef<BottomSheet>(null)

  const [bottomSheetSeachInput, setBottomSheetSeachInput] = useState('')

  const searchInputDebounced = useDebouncedValue(
    bottomSheetSeachInput.trim(),
    500
  )

  const { data: searchFollowUsers } = useQuery({
    queryKey: [QueryKey.searchFollowedUsers],
    queryFn: () => getSearchFollowUsers({ search: searchInputDebounced }),
    enabled: searchInputDebounced.length > 0
  })

  const { data: followUsers } = useQuery({
    queryKey: [QueryKey.connections, ConnectionType.CONNECTED],
    queryFn: getConnections
  })

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose()
    }
  }, [])

  useEffect(() => {
    if (opened) {
      bottomSheetRef.current?.snapToIndex(1)
    }
  }, [opened])

  const passDeepLinkToSocial = async (social: Social) => {
    const deepLink = await createDynamicLink(type, pathId)
    if (deepLink) {
      if (Platform.OS === 'ios') {
        switch (social) {
          case Social.Viber: {
            await Share.shareSingle({
              title: 'Share via',
              message: `Check this ${type} ${deepLink}`,
              social,
              appId: ''
            })
            break
          }
          case Social.Whatsapp: {
            await Share.shareSingle({
              title: 'Share via',
              message: `Check this ${type}`,
              url: deepLink,
              social,
              appId: ''
            })
            break
          }
          case Social.Telegram: {
            // do we need to check if the app is installed?
            const message = `Check this ${type} ${deepLink}`
            Linking.openURL(`tg://msg?text=${message}`)
            break
          }
          case Social.Instagram: {
            await Share.shareSingle({
              message: encodeURI(`Check this ${type} ${deepLink}`),
              social,
              type: 'text/plain'
            })
            break
          }
          case Social.Snapchat: {
            // do we need to open the app store to download tg if it doen't exist?
            Share.open({
              message: `Check this ${type} ${deepLink}`
            })
            break
          }
        }
      } else {
        await Share.shareSingle({
          title: 'Share via',
          message: `Check this ${type}`,
          url: deepLink,
          social,
          appId: ''
        })
      }
    }
  }

  const copyDeepLink = async () => {
    const deepLink = await createDynamicLink(type, pathId)
    if (deepLink) {
      Clipboard.setString(deepLink)
      Toast.show({
        type: 'info',
        text1: 'Link is copied'
      })
    }
  }

  const onPressUser = async (userId: number) => {
    try {
      const connection = await newConnection({
        partner_id: userId,
        type: ConnectionType.MESSAGE
      })

      const deepLink = await createDynamicLink(type, pathId)
      if (deepLink) {
        navigation.navigate('conversation', {
          userId,
          pathId,
          pretypedText: `Check this ${type} ${deepLink}`
        })
      }
      
    } catch (err) {
      throw err
    }
  }

  const FollowListItem = ({ user }: { user: User }) => {
    return (
      <TouchableOpacity
        style={styles.chatsItem}
        onPress={() => {
          if (user?.id) {
            onPressUser(user.id)
          }
        }}>
        <FastImage
          style={styles.chatsItemImage}
          source={{ uri: convertImgToLink(user?.profile?.photos?.[0]) }}
        />
        <Text numberOfLines={1} style={styles.chatsItemText}>
          {user?.name}
        </Text>
      </TouchableOpacity>
    )
  }

  const followUsersList = useMemo(() => {
    if (
      searchInputDebounced.length > 0 &&
      searchFollowUsers?.customers &&
      searchFollowUsers?.customers.length > 0
    ) {
      return (
        <ScrollView horizontal style={styles.chatsList}>
          {searchFollowUsers?.customers.map((item: User) => (
            <FollowListItem user={item} key={item.id} />
          ))}
        </ScrollView>
      )
    }

    if (
      followUsers &&
      followUsers?.connections &&
      followUsers.connections.length > 0
    ) {
      return (
        <ScrollView horizontal style={styles.chatsList}>
          {followUsers?.connections.map(item => {
            const partner =
              item.user_id === myUser?.id ? item?.partner : (item?.user as User)
            return <FollowListItem user={partner} key={partner.id} />
          })}
        </ScrollView>
      )
    }

    return null
  }, [
    searchInputDebounced.length,
    searchFollowUsers?.customers,
    followUsers,
    myUser?.id
  ])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={[1, followUsersList ? 400 : 320]}
      onChange={handleSheetChanges}
      backgroundStyle={styles.background}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          disappearsOnIndex={0}
          opacity={0.8}
        />
      )}
      handleComponent={null}
      enablePanDownToClose>
      <View style={styles.container}>
        <Text style={styles.title}>{t('Share Event')}</Text>
        <SearchInput
          value={bottomSheetSeachInput}
          onChangeText={text => setBottomSheetSeachInput(text)}
          placeholder={'Search Friends'}
          useBottomSheet
        />

        {followUsersList}

        <View style={styles.separator} />

        <ScrollView horizontal>
          {shareAppList.map(item => (
            <TouchableOpacity
              style={styles.chatsItem}
              onPress={() => passDeepLinkToSocial(item.package)}>
              <FastImage style={styles.chatsItemImage} source={item.icon} />
              <Text numberOfLines={1} style={styles.chatsItemText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.separator} />

        <View style={styles.bottomButtonWrap}>
          <TouchableOpacity style={styles.bottomButton} onPress={copyDeepLink}>
            <FastImage
              source={require('../../../assets/icons/shareLink.png')}
              style={styles.bottomButtonImage}
            />
            <GradientText
              style={styles.bottomButtonText}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFCB52', '#FF7B02']}>
              {t('Copy link')}
            </GradientText>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 35
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
    marginBottom: 18
  },
  chatsList: {
    marginTop: 29
  },
  chatsItem: {
    marginRight: 5
  },
  chatsItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5
  },
  chatsItemText: {
    fontSize: 8,
    fontWeight: '400',
    maxWidth: 50,
    color: 'white',
    textAlign: 'center'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(208, 208, 208, 0.20)',
    marginVertical: 20
  },
  bottomButtonWrap: {
    width: '100%',
    alignItems: 'center'
  },
  bottomButton: {
    flexDirection: 'row'
  },
  bottomButtonImage: {
    width: 20,
    height: 20,
    marginRight: 9
  },
  bottomButtonText: {
    fontSize: 15,
    fontWeight: '500'
  }
})
