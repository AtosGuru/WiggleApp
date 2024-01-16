import React from 'react'
import { View, Text, TouchableOpacity, Platform, Linking, SafeAreaView } from "react-native"
import FastImage from 'react-native-fast-image'

import GradientText from '../../../components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import { requestNotifications, PERMISSIONS, RESULTS, check, checkNotifications, request } from 'react-native-permissions'
import { Alert } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../RootNavigation'
import { StatusTypes } from './interface'
import { styles } from './styled'

function DatingRequirements() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [status, setStatus] = React.useState(StatusTypes.LOCATION)

  const isLocation = status === StatusTypes.LOCATION
  const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

  const openSettingsPrompt = () => {
    Alert.alert(
      'Permission',
      'Open settings and give access',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Settings',
          style: 'destructive',
          onPress: async () => {
            Linking.openSettings()
          },
        },
      ],
      {cancelable: false},
    )
  }

  React.useEffect(() => {
    if (isLocation) {
      checkLocationPermission()
    } else {
      checkNotificationPermission()
    }
  }, [status, isLocation])

  const checkNotificationPermission = async () => {
    const { status } = await checkNotifications()

    if (status === RESULTS.GRANTED) {
      
    }
  };

  const checkLocationPermission = async () => {
    const result = await check(permission)

    if (result === RESULTS.GRANTED) {
      setStatus(StatusTypes.NOTIFICATIONS)
    }
  }

  const requestLocationPermission = async () => {
    const result = await request(permission)

    switch (result) {
      case RESULTS.BLOCKED: {
        return openSettingsPrompt()
      }
      case RESULTS.GRANTED: {
        const { status } = await checkNotifications()
        return status === RESULTS.GRANTED
        ? navigation.navigate('dating_finish') : setStatus(StatusTypes.NOTIFICATIONS)
      }
    }
  }

  const requestNotificationPermission = () => {
    requestNotifications(['alert', 'sound']).then(({ status }) => {
      switch (status) {
        case RESULTS.BLOCKED: {
          return openSettingsPrompt()
        }
        case RESULTS.GRANTED: {
          return navigation.navigate('dating_finish')
        }
      }
    })
  }

  const handleRequest = () => {
    if (isLocation) {
      requestLocationPermission()
    } else {
      requestNotificationPermission()
    }
  }

  const title = isLocation ? 'LOCATION' : 'NOTIFICATIONS'
  const description = isLocation ? 'Enable your location to find nearby users' : 'Do you want to enable notifications for Matches?'
  const buttonTitle = isLocation  ? 'Allow Locations' : 'Allow Notifications'

  const background = require('../../../../assets/images/eventBackground.png')
  const logo = require('../../../../assets/images/newLogo.png')

    return (
      <FastImage
        resizeMode="cover"
        source={background}
        style={styles.imageScreen}
      >
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
            <Text style={styles.headerText}>Enable</Text>
            <GradientText
              style={styles.headerTitle}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#FFCB52', '#FF7B02']}
            >
              {title}
            </GradientText>
          </View>
          <View style={styles.imageWrap}>
            <FastImage
                style={styles.image}
                source={logo}
            />
              <Text style={styles.description}>{description}</Text>
          </View>
          <TouchableOpacity
            onPress={handleRequest}
                style={styles.button}
          >
              <LinearGradient
                  colors={['#FFCB52', '#FF7B02']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonView}
              >
                  <Text style={styles.buttonTitle}>{buttonTitle}</Text>
              </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
        </FastImage>
    )
}

export default DatingRequirements