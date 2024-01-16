import { useEffect, useState, useSelector } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import notifee from '@notifee/react-native'

import { User } from '../types/user.interface'
import { getUser, updateUser, updateUserFCM } from '../api/user.methods'
import { useDispatch } from 'react-redux'
import { setChatIdToUpdate, setUpdateNotification } from '../store/auth'
import { RootState } from '../store/store'

import {
  NotificationToaster,
  NotificationToasterHelper
} from '../components/NotificationToast'

export const useFirebaseMessaging = (user?: User | null) => {
  const dispatch = useDispatch()
  // const user1 = useSelector((root: RootState) => root.auth.user)
  const [lastId, setLastId] = useState('')

  const getToken = async () => {
    try {
      let permissionGranted = false

      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission()
        permissionGranted =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
      }
      if (Platform.OS === 'android') {
        permissionGranted = true
      }

      if (permissionGranted) {
        const token = await messaging().getToken()
        const validUserData = await getUser()
        console.log('fcm token: ', token)
        // if (token !== validUserData?.social_id) {
        await updateUserFCM(token)
        // }
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    let unsubscribe = () => {}
    let unsubscribeBackground = () => {}
    if (user) {
      getToken()
      unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('REMOTE MESSAGE', remoteMessage)

        if (remoteMessage) {
          dispatch(setUpdateNotification(true))
          let app_notification_message = JSON.parse(
            remoteMessage.data.app_notification_message
          )
          let push_notification_message = JSON.parse(
            remoteMessage.data.push_notification_message
          )
          let sender = JSON.parse(remoteMessage.data.sender)
          let type = JSON.parse(remoteMessage.data.type)

          if (type === 1) {
            const id = NotificationToasterHelper.show({
              title: app_notification_message.title,
              body: app_notification_message.body,
              type: type,
              sender: sender.id,
              dismissible: false,
              backgroundColor: '#000'
            })
          } else if (type === 5) {
            const id = NotificationToasterHelper.show({
              title: app_notification_message.title,
              body: app_notification_message.body,
              type: type,
              sender: sender.id,
              dismissible: false,
              backgroundColor: '#000'
            })
            console.log('showString id: ', id)
          } else if (type === 6) {
            const id = NotificationToasterHelper.show({
              title: app_notification_message.title,
              body: app_notification_message.body,
              type: type,
              sender: sender.id,
              dismissible: false,
              backgroundColor: '#000'
            })
          }
        }
        if (remoteMessage?.data?.connection_id) {
          dispatch(setChatIdToUpdate(remoteMessage?.data?.connection_id))
        }
      })

      unsubscribeBackground = messaging().setBackgroundMessageHandler(
        async remoteMesssage => {
          console.log('REMOTE MESSAGE Background', remoteMesssage)

          if (remoteMesssage) {
            dispatch(setUpdateNotification(true))

            let app_notification_message = JSON.parse(
              remoteMesssage.data.app_notification_message
            )
            let push_notification_message = JSON.parse(
              remoteMesssage.data.push_notification_message
            )
            let sender = JSON.parse(remoteMesssage.data.sender)
            let type = JSON.parse(remoteMesssage.data.type)

            if (type === 1) {
              notifee.displayNotification({
                body: push_notification_message.title,
                android: {
                  channelId: 'default',
                  actions: [
                    {
                      title: 'Mark as Read',
                      pressAction: {
                        id: 'read'
                      }
                    }
                  ]
                }
              })
            } else if (type === 5) {
              notifee.displayNotification({
                body: push_notification_message.body,
                android: {
                  channelId: 'default',
                  actions: [
                    {
                      title: 'Mark as Read',
                      pressAction: {
                        id: 'read'
                      }
                    }
                  ]
                }
              })
            } else if (type === 6) {
              notifee.displayNotification({
                body: push_notification_message.title,
                android: {
                  channelId: 'default',
                  actions: [
                    {
                      title: 'Mark as Read',
                      pressAction: {
                        id: 'read'
                      }
                    }
                  ]
                }
              })
            }
          }
          if (remoteMesssage?.data?.connection_id) {
            dispatch(setChatIdToUpdate(remoteMesssage?.data?.connection_id))
          }
        }
      )
    }

    return () => {
      unsubscribe, unsubscribeBackground
    }
  }, [])

  return null
}
