import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  GestureHandlerRootView,
  TouchableOpacity
} from 'react-native-gesture-handler'
import React, { Suspense, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { setChatIdToUpdate, setUpdateNotification } from '../store/auth'

import BottomTabs from '../components/BottomTabs/BottomTabs'
import Chats from '../screens/new_screens/chats'
import Dating from '../screens/new_screens/dating'
import Events from '../screens/new_screens/events'
import Maps from '../screens/new_screens/maps'
import Search from '../screens/new_screens/search'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { twilioAccessToken } from '../api/user.methods'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageKey } from '../types/enum'

import { Toaster, ToasterHelper } from 'react-native-customizable-toast'
import {
  NotificationToaster,
  NotificationToasterHelper
} from '../components/NotificationToast'

const BottomTab = createBottomTabNavigator()

const BottomTabNavigator = () => {

  const [isHide, setIsHide] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('BottomTabNavigator useEffect: ')

    getTwilioAccessToken()
  }, [])

  setTimeout(() => {
    setIsLoading(false)
  }, 9000)

  const getTwilioAccessToken = async () => {
    const res = await twilioAccessToken()
    console.log('Conversation twilioAccessToken: ', res)
    if (Platform.OS === 'ios') {
      NativeModules.Conversations.initializeWithAccessToken('name', res)
    } else {
      NativeModules.Conversations.initializeWithAccessToken(res)
    }
  }

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.Conversations)
    let conversationsClientStatusEventListener = eventEmitter.addListener(
      'ConversationClientStatusReminder',
      event => {
        console.log('ConversationClientStatusReminder: ', event.eventProperty)
      }
    )

    let accessTokenAboutToExpireEventListener = eventEmitter.addListener(
      'AccessTokenAboutToExpireReminder',
      event => {
        console.log('AccessTokenAboutToExpireReminder: ', event.eventProperty)
        getTwilioAccessToken()
      }
    )

    let accessTokenExpiredEventListener = eventEmitter.addListener(
      'AccessTokenExpiredReminder',
      event => {
        console.log('AccessTokenExpiredReminder: ', event.eventProperty)
        getTwilioAccessToken()
      }
    )

    return () => {
      conversationsClientStatusEventListener.remove()
      accessTokenAboutToExpireEventListener.remove()
      accessTokenExpiredEventListener.remove()
    }
  }, [])

  return (
    <Suspense>
      <ActivityIndicator
        style={{
          flex: 1,
          position: 'absolute',
          zIndex: isLoading ? 10 : -10,
          width: '100%',
          height: '100%'
        }}
        size="large"
        colors={['#FFCB52']}
      />
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          title: route.name,
          headerShown: false,
          tabBarStyle: {
            display: isHide ? 'none' : 'flex'
          }
        })}
        tabBar={isHide ? undefined : props => <BottomTabs {...props} />}
        initialRouteName="events"
        backBehavior="initialRoute">
        <BottomTab.Screen name="dating">
          {() => <Dating setHideBottomTabs={setIsHide} />}
        </BottomTab.Screen>
        <BottomTab.Screen name="maps" component={Maps} />
        <BottomTab.Screen name="events" component={Events} />
        <BottomTab.Screen name="search" component={Search} />
        <BottomTab.Screen name="message" component={Chats} />
      </BottomTab.Navigator>
    </Suspense>
  )
}

export default BottomTabNavigator
