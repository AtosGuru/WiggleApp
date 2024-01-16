import {
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native'
import React, { useEffect, useMemo, useRef } from 'react'
import LottieSplashScreen from 'react-native-lottie-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomTabNavigator from './navigators/BottomTabNavigator'
import Chat from './screens/new_screens/chat'
import Conversation from './screens/new_screens/conversation'
import ChatUserSearch from './screens/new_screens/chat_user_search'
import CreatePassword from './screens/new_screens/create_password'
import DeletedAccounts from './screens/new_screens/deleted_accounts'
import Event from './screens/new_screens/event'
import Filter from './screens/new_screens/filter'
import Followers from './screens/new_screens/followers'
import Following from './screens/new_screens/following'
import ForgotPassword from './screens/new_screens/forgot_password'
import Language from './screens/new_screens/language'
import Login from './screens/new_screens/login'
import Notifications from './screens/new_screens/notifications'
import Onboarding from './screens/new_screens/onboarding'
import Participants from './screens/new_screens/participants'
import PrivacyPolicy from './screens/new_screens/privacy_policy'
import Profile from './screens/new_screens/profile'
import ProfileCreation from './screens/new_screens/profile_creation'
import ProfileEdit from './screens/new_screens/profile_edit'
import ProfileMedia from './screens/new_screens/profile_media'
import { RootState } from './store/store'
import Settings from './screens/new_screens/settings'
import SignUp from './screens/new_screens/sign_up'
import SignUpVerifyEmail from './screens/new_screens/sign_up_verify_email'
import { StorageKey } from './types/enum'
import TermsAndConditions from './screens/new_screens/terms_conditions'
import UserProfile from './screens/new_screens/user_profile'
import VerifyEmail from './screens/new_screens/verify_email'
import Support from './screens/new_screens/support'
import DatingMatches from './screens/new_screens/dating_matches'
import { useFirebaseMessaging } from './hooks/useFirebaseMessaging'
import { DeepLinkTypes, useDynamicLinks } from './hooks/useDynamicLinks'
import DetailedView from './screens/detailedView'
import DatingPreferences from './screens/new_screens/dating_preferences'
import DatingRequirements from './screens/new_screens/dating_requirements'
import DatingProfileInfo from './screens/new_screens/dating_profile_info'
import DatingFinish from './screens/new_screens/dating_finish'
import DatingProfile from './screens/new_screens/dating_profile'
import DatingSettings from './screens/new_screens/dating_settings'
import BlockedScreen from './screens/new_screens/blocked'
import BuyGold from './screens/new_screens/dating_buyGold'
import Mingle from './screens/new_screens/mingle'
import SignUpGenderScreen from './screens/profilegender'
import Comments from './screens/new_screens/mingle/comments'
export type RootStackParamList = {
  onboarding: any
  login: any
  sign_up: any
  privacy_policy: any
  filter: any
  deleted_accounts: any
  forgot_password: any
  verify_email: { forgotPassMode?: boolean; email?: string }
  sign_up_verify_email: any
  create_password: { email?: string; remember_token?: string }
  profile_creation: any
  profile_media: any
  logged_in_dev: any
  language: any
  bottom_tab_navigator: any
  profile: { user_id?: number }
  profile_edit: any
  followers: { user_id?: number }
  following: { user_id?: number }
  blocked: any
  notifications: any
  details: any
  terms_conditions: any
  participants: { event_id: number }
  user_profile: any
  chat: {
    connection_id: number
    userId: number
    openPickerOnMount?: boolean
    pretypedText?: string
    isDating?: boolean
    uuid?: string
  }
  conversation: {
    userId: number
    openPickerOnMount?: boolean
    pretypedText?: string
  }
  settings: any
  event: { id: number | string; isClub?: boolean }
  chat_user_search: any
  support: { isReport: boolean }
  dating: {
    step: number
  }
  dating_preferences: {
    isSettings?: boolean
    refetch?: () => void
  }
  dating_profileInfo: {
    isSettings?: boolean
  }
  dating_requirements: undefined
  dating_finish: undefined
  dating_profile: {
    id?: string
    openFromChat?: boolean
    handleBack?: (value: boolean) => void
  }
  dating_settings: undefined
  dating_matches: {
    partner_id: number
    partner_avatar: string
    user_avatar: string
  }
  buy_gold: undefined
  mingle: any
  gender_info: any,
  mingle_comment: { postID?: number }
}

import {
  NotificationToaster,
  NotificationToasterHelper
} from './components/NotificationToast'

// place new screens to src/new_screens

const Stack = createNativeStackNavigator<RootStackParamList>()

export const clearTokens = async () => {
  await AsyncStorage.multiRemove([
    'CSRF-TOKEN',
    'X-SESSION-ID',
    StorageKey.CSRFToken,
    StorageKey.XSession
  ])
  await AsyncStorage.clear()
}

export const RootNavigation = () => {
  const { i18n } = useTranslation()
  const user = useSelector((root: RootState) => root.auth.user)
  const lang = useSelector((root: RootState) => root.lang.currentLang)

  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList> | null>(null)
  useFirebaseMessaging(user)
  useDynamicLinks({
    onNavigate(type, id) {
      switch (type) {
        case DeepLinkTypes.EVENT:
          navigationRef.current?.navigate('event', { id })
          break
        case DeepLinkTypes.PROFILE:
          navigationRef.current?.navigate('profile', { user_id: id })
          break
        default:
          break
      }
    }
  })

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [])

  useEffect(() => {
    if (user !== null) {
      const isSocialAuth =
        !!user.profile?.provider &&
        ['google', 'apple', 'facebook'].includes(user.profile.provider)
      // TODO AUTO NAVIGATION LATER
      if (!user?.email_verified_at && !isSocialAuth) {
        navigationRef.current?.navigate('sign_up_verify_email')
      } else if (!user.profile?.birthDate && !user.profile?.firstName) {
        navigationRef.current?.navigate('profile_creation')
      } else if (!user.profile?.photos || user.profile?.photos?.length === 0) {
        navigationRef.current?.navigate('profile_media')
      }
    } else {
      logOut()
    }
  }, [user])

  const isUserCompleted = useMemo(() => {
    if (user === null) return false
    const isSocialAuth =
      !!user.profile?.provider &&
      ['google', 'apple', 'facebook'].includes(user.profile.provider)
    const userChecks = [
      !!user?.email_verified_at || isSocialAuth,
      !!user.profile?.birthDate,
      !!user.profile?.firstName,
      !!user.profile?.photos,
      user.profile?.photos?.length > 0
    ]
    if (userChecks.every(value => value === true)) {
      return true
    }

    return false
  }, [user])

  const logOut = async () => {
    try {
      await clearTokens()
      console.log('token removed')
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => LottieSplashScreen.hide()}>
      <Stack.Navigator
        screenOptions={{
          animation: Platform.OS === 'ios' ? 'simple_push' : 'slide_from_right',
          animationDuration: 300
        }}>
        {!isUserCompleted ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="onboarding"
              component={Onboarding}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="sign_up"
              component={SignUp}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="forgot_password"
              component={ForgotPassword}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="verify_email"
              component={VerifyEmail}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="sign_up_verify_email"
              component={SignUpVerifyEmail}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="create_password"
              component={CreatePassword}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="profile_creation"
              component={ProfileCreation}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="filter"
              component={Filter}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="profile_media"
              component={ProfileMedia}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="gender_info"
              component={SignUpGenderScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="bottom_tab_navigator"
              component={BottomTabNavigator}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="profile"
              component={Profile}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="user_profile"
              component={UserProfile}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="profile_edit"
              component={ProfileEdit}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="followers"
              component={Followers}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="following"
              component={Following}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="details"
              component={DetailedView}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="participants"
              component={Participants}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="settings"
              component={Settings}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="notifications"
              component={Notifications}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="chat"
              component={Chat}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="conversation"
              component={Conversation}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="privacy_policy"
              component={PrivacyPolicy}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="terms_conditions"
              component={TermsAndConditions}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="deleted_accounts"
              component={DeletedAccounts}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="event"
              component={Event}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="chat_user_search"
              component={ChatUserSearch}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="dating_preferences"
              component={DatingPreferences}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="dating_profileInfo"
              component={DatingProfileInfo}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="dating_requirements"
              component={DatingRequirements}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="dating_finish"
              component={DatingFinish}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="dating_profile"
              component={DatingProfile}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="dating_settings"
              component={DatingSettings}
            />
            <Stack.Screen
              options={{ headerShown: false, presentation: 'containedModal' }}
              name="dating_matches"
              component={DatingMatches}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="blocked"
              component={BlockedScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="buy_gold"
              component={BuyGold}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="mingle"
              component={Mingle}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="mingle_comment"
              component={Comments}
            />
          </>
        )}
        <Stack.Screen
          options={{ headerShown: false }}
          name="support"
          component={Support}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="language"
          component={Language}
        />
      </Stack.Navigator>
      <NotificationToaster useSafeArea={false} displayFromBottom={false} />
    </NavigationContainer>
  )
}
