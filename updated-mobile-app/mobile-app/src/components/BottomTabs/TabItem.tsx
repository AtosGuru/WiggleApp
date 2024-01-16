import { Path, Svg } from 'react-native-svg'
import React, { Fragment, useEffect } from 'react'
import { Platform, TouchableOpacity, View } from 'react-native'
import styles, { svgProps } from './styles'

import FastImage from 'react-native-fast-image'
import GradientText from '../../components/GradientText/GradientText'
import {
  NavigationProp,
  useIsFocused,
  useNavigation
} from '@react-navigation/native'
import { RootStackParamList } from '../../RootNavigation'
import {
  PERMISSIONS,
  RESULTS,
  check,
  checkNotifications
} from 'react-native-permissions'
import { QueryKey } from '../../types/enum'
import { useQuery } from 'react-query'
import { getMyDatingProfile } from '../../api/dating.methods'
import { useDispatch } from 'react-redux'
import { setDatingUser } from '../../store/datingSlice'

function TabItem(props) {
  const {
    onPress,
    routeName,
    focus,
    customRoutes,
    setSelectedScreen,
    selectedScreen,
    onLongPress
  } = props

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const {
    data: datingProfile,
    isLoading: datingLoading,
    refetch
  } = useQuery(QueryKey.myDatingProfile, getMyDatingProfile)

  const dispatch = useDispatch()

  // const styles = dynamicStyles({ routesCount })

  const isFocused = useIsFocused()

  useEffect(() => {
    if (datingProfile?.profile) {
      dispatch(setDatingUser(datingProfile))
    } else {
      dispatch(setDatingUser(null))
    }
  }, [datingProfile, isFocused])

  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused, refetch])

  const onTabPress = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    const result = await check(permission)
    const { status } = await checkNotifications()

    const needAccessPermissions =
      result !== RESULTS.GRANTED || status !== RESULTS.GRANTED
    const needSelectMale = !datingProfile?.profile?.gender
    const needToAddPhotos = datingProfile?.profile?.photos
      ? datingProfile?.profile?.photos?.length < 1
      : true
    const needToAddBio = datingProfile?.profile?.bio
      ? datingProfile?.profile?.bio?.trim().length < 1
      : true
    const needToFinishProfile = needToAddPhotos ||  needToAddBio

    if (!datingLoading) {
      if (routeName === 'dating' && needSelectMale) {
        return navigation.navigate('dating_preferences')
      }
      if (routeName === 'dating' && needToFinishProfile) {
        return navigation.navigate('dating_profileInfo')
      }
      if (routeName === 'dating' && needAccessPermissions) {
        return navigation.navigate('dating_requirements')
      }

      return onPress(routeName)
    }
  }

  useEffect(() => {
    if (routeName === 'events' && focus) setSelectedScreen('events')
    if (routeName === 'maps' && focus) setSelectedScreen('maps')
    if (routeName === 'search' && focus) setSelectedScreen('search')
    if (routeName === 'dating' && focus) setSelectedScreen('dating')
    if (routeName === 'message' && focus) setSelectedScreen('message')
  }, [focus, routeName, setSelectedScreen])

  const iconMap = {
    maps: {
      icon: focus
        ? require('../../../assets/icons/LocationActive.png')
        : require('../../../assets/icons/Location.png'),
      styles: { width: 22, height: 26, marginLeft: -focus ? 0 : -10 }
    },
    message: {
      icon: focus
        ? require('../../../assets/icons/ChatActive.png')
        : require('../../../assets/icons/Chat.png'),
      styles: { width: 26, height: 26, marginRight: focus ? 0 : -10 }
    },
    search: {
      icon: focus
        ? require('../../../assets/icons/SearchPrimary.png')
        : require('../../../assets/icons/SearchGray.png'),
      styles: { width: 26, height: 26, marginRight: focus ? 0 : -10 }
    },
    dating: {
      icon: require('../../../assets/icons/LogoGradient.png'),
      styles: {
        width: 84,
        height: 94,
        marginRight: focus ? 0 : -10,
        marginBottom: 28
      }
    },
    events: {
      icon: focus
        ? require('../../../assets/icons/HomePrimary.png')
        : require('../../../assets/icons/HomeOutlined.png'),
      styles: { width: 28, height: 28, marginRight: focus ? 0 : -10 }
    }
  }

  if (routeName === selectedScreen) {
    return (
      <Fragment>
        <View style={styles.addWrapper}>
          <TouchableOpacity
            style={[styles.selectedWrapper]}
            activeOpacity={0.8}>
            <View style={styles.selectedIconWrapper}>
              <FastImage
                resizeMode="contain"
                style={iconMap[selectedScreen]?.styles}
                source={iconMap[selectedScreen]?.icon}
              />
            </View>
          </TouchableOpacity>
          <Svg width={75} height={74} style={styles.svgWrapper}>
            <Path {...svgProps} />
            <GradientText
              style={styles.gradientText}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={['#FFCB52', '#FF7B02']}>
              {routeName.charAt(0).toUpperCase() + routeName.slice(1)}
            </GradientText>
          </Svg>
        </View>
      </Fragment>
    )
  }

  const targetIndex = customRoutes.findIndex(
    item => item.name === selectedScreen
  )

  const previousItem = customRoutes[targetIndex - 1] || null
  const nextItem = customRoutes[targetIndex + 1] || null

  return (
    <Fragment>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          routeName !== selectedScreen && {
            marginRight: -8,
            marginLeft: -8
          },
          previousItem?.name === routeName && {
            borderTopRightRadius: 34
          },
          nextItem?.name === routeName && {
            borderTopLeftRadius: 34
          }
        ]}
        activeOpacity={1}
        onPress={onTabPress}
        onLongPress={onLongPress}>
        <FastImage
          resizeMode="contain"
          style={[
            iconMap[routeName]?.styles,
            routeName !== selectedScreen && {
              marginRight: 8,
              marginLeft: 8
            }
          ]}
          source={iconMap[routeName]?.icon}
        />
      </TouchableOpacity>
    </Fragment>
  )
}

export default TabItem
