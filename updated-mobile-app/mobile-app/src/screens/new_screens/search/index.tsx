import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Image,
  DimensionValue,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient'
import React, { useMemo, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import { useQuery } from 'react-query'

import { QueryKey } from '../../../types/enum'
import { searchUsers } from '../../../api/user.methods'
import { RootStackParamList } from '../../../RootNavigation'
import styles from './styled'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import { Header, SearchBar } from '../events'
import { t } from 'i18next'
import { getNotifications } from '../../../api/notifications.methods'
import { IObject } from '../../../types/utils'
import { useTranslation } from 'react-i18next'
import { Overlay } from 'react-native-elements'

type UserItemProps = {
  imageUrl: string
  name: string
  age?: string
  dots?: boolean
  onPress: () => void
  isBlocked?: boolean
  onPressIcon?: () => void
  maxWidth?: DimensionValue
  withBlur?: boolean
}

export function UserSearchItem({
  name,
  imageUrl,
  age,
  onPress,
  isBlocked = false,
  onPressIcon = () => { },
  dots = true,
  maxWidth = '33%',
  withBlur = false,
}: UserItemProps) {


  const handleDotPress = () => {
  }

  return (

    <TouchableOpacity style={[styles.userSearchItemContainer]} onPress={onPress}>
      <View
        style={[
          styles.userSearchItemDots,
          isBlocked && { padding: 10 },
          !!maxWidth && { maxWidth }
        ]}>
        {isBlocked ? (
          <TouchableOpacity onPress={onPressIcon}>
            <FastImage
              source={require('../../../../assets/icons/profileAdd.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        ) : (
          dots && (
            <>
              <TouchableOpacity style={{ width: 25, height: 10, marginLeft: -10 }} onPress={handleDotPress}>
                <FastImage
                  source={require('../../../../assets/icons/Dots.png')}
                  style={styles.userSearchItemDotsIcon}
                />
              </TouchableOpacity>

            </>
          )
        )}
      </View>
      {/* User Avatar */}
      {withBlur && (
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.5)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 999,
            borderRadius: 18
          }}
        />
      )}
      <Image
        source={{ uri: imageUrl }}
        style={[styles.userSearchItemImage, { opacity: isBlocked ? 0.5 : 1 }]}
        resizeMode="cover"
        blurRadius={
          Platform.OS === 'ios' ? (withBlur ? 20 : 0) : withBlur ? 15 : 0
        }
      />
      {/* Shadow */}
      {!withBlur && (
        <LinearGradient
          colors={['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 1)']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userSearchItemGradient}
        />
      )}
      {/* User data */}
      {!withBlur && (
        <View
          style={[
            styles.userSearchItemTextContainer,
            { opacity: isBlocked ? 0.5 : 1 }
          ]}>
          {age && <Text style={styles.userSearchItemTextSecondary}>{age}</Text>}
          <Text numberOfLines={2} style={styles.userSearchItemText}>
            {name}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

function SearchScreen(): JSX.Element {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'bottom_tab_navigator'>>()
  const [input, setInput] = useState('')
  const debouncedInput = useDebouncedValue(input, 500)

  const { data: notificationData, refetch: refetchNotifications } = useQuery({
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

  const { data: searchResult, isLoading } = useQuery(
    [QueryKey.userSearch, debouncedInput],
    searchUsers,
    { enabled: debouncedInput.length > 1 }
  )

  const onPressUser = (user_id: number) => {
    navigation.navigate('profile', { user_id })
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/search_background.png')}
      style={styles.bgImageWrapper}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.wrapFill}>
        <View
          style={{
            paddingTop: Platform.OS === 'ios' ? 0 : 50,
            paddingHorizontal: 20
          }}>
          <Header
            notifications={activeNotifications}
            mainTitle={t('Search')}
          />
          <SearchBar
            searchInput={input}
            onChangeSearchInput={setInput}
            searchLabel={`${t('Search for People')}`}
          />
        </View>
        {isLoading ? (
          <View style={styles.container}>
            <View style={styles.centeredView}>
              <FastImage
                resizeMode="cover"
                source={require('../../../../assets/icons/annotations.png')}
                style={styles.image}
              />
              <Text style={styles.text}>Searching for your result......</Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <FlatList
          data={searchResult?.customers ?? []}
          style={styles.userList}
          columnWrapperStyle={styles.userListColumn}
          numColumns={3}
          ListEmptyComponent={() => {
            if (input.trim().length === 0) {
              return (
                <View style={styles.container}>
                  <View style={styles.centeredView}>
                    <Text style={styles.text}>
                      Input your search to find people
                    </Text>
                  </View>
                </View>
              )
            }
            if (input.length && !isLoading) {
              return (
                <View style={styles.container}>
                  <View style={styles.centeredView}>
                    <FastImage
                      resizeMode="cover"
                      source={require('../../../../assets/icons/annotations.png')}
                      style={styles.image}
                    />
                    <Text style={styles.text}>
                      Sorry, No search result found
                    </Text>
                    <TouchableOpacity
                      onPress={() => setInput('')}
                      style={styles.buttonContainer}>
                      <LinearGradient
                        colors={['#FFCB52', '#FF7B02']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Try Again</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
            return null
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              tintColor={'#FFCB52'}
              colors={['#FFCB52']}
            />
          }
          renderItem={({ item, index }) => (
            <>
              <UserSearchItem
                imageUrl={convertImgToLink(item?.profile?.photos?.[0])}
                name={`${item?.profile?.firstName}`}
                onPress={() => onPressUser(item?.id)}
                id={item?.id}
                index={index}
              />
            </>
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}
const ActionModal = (props: IObject) => {
  const { visible, onClose, userId, isDating, uuid, index } = props
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'chat'>>()
  const { t } = useTranslation()

  const handleReport = () => {
    // Report
    onClose()
    navigation.navigate('support', { isReport: true })
  }

  return (

    <View style={[styles.alertContainer]}>
      <TouchableOpacity
        onPress={handleReport}
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 4
        }}>
        <FastImage
          source={require('../../../../assets/images/userReport.png')}
          resizeMode="contain"
          style={{
            width: 20,
            marginRight: 10,
            height: 20
          }}
        />
        <Text
          style={{ fontSize: 16, fontFamily: "LeagueSpartan-Regular", color: '#ffffff' }}>
          {t('Report user')}
        </Text>
      </TouchableOpacity>
    </View>

  )
}

export default SearchScreen
