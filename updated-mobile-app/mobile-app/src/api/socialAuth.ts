import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import {
  AppleRequestResponse,
  appleAuth,
} from '@invertase/react-native-apple-authentication'
import {
  Settings,
  LoginManager,
  AccessToken,
  Profile,
  ProfileMap,
  AccessTokenMap
} from 'react-native-fbsdk-next'
import { AuthTypes, socialAuth, socialSignIn } from './auth.methods'
import { StorageKey } from '../types/enum'
import AsyncStorage from '@react-native-async-storage/async-storage'

Settings.setAppID('6674754892593551')

export const googleSocialAuth = async () => {
  let authData: User | null = null
  let tokens: {
    idToken: string
    accessToken: string
  } | null = null
  try {
    await GoogleSignin.hasPlayServices()
    authData = await GoogleSignin.signIn()
    tokens = await GoogleSignin.getTokens()
    if (authData && tokens.accessToken) {
      const res = await socialAuth({
        social: 'google',
        userSocialId: authData.user.id,
        socialAccessToken: tokens.accessToken,
        email: authData.user.email,
        name: `${authData.user.name}`
      })

      if (res) {
        return res
      }
    }
    return null
  } catch (error) {
    if (error?.response?.status === 422 && authData && tokens) {
      return socialSignIn({
        social: 'google',
        userSocialId: authData.user.id,
        socialAccessToken: tokens.accessToken
      }).then(res => res?.user)
    }
  }
}

export const appleSocialAuth = async () => {
  const appleEmail = await AsyncStorage.getItem(StorageKey.APPLE_EMAIL)
  const appleFullName = await AsyncStorage.getItem(StorageKey.APPLE_FULLNAME)

  let appleAuthData: AppleRequestResponse | null = null
  try {
    appleAuthData = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]
    })

    if (appleAuthData && appleAuthData?.identityToken) {
      const social = 'apple'
      const userSocialId = appleAuthData.user
      const socialAccessToken = appleAuthData.identityToken
      const email = appleAuthData.email || appleEmail
      const name = appleFullName || `${appleAuthData.fullName?.givenName} ${appleAuthData.fullName?.familyName}`

      if (appleAuthData?.email && (!appleEmail || !appleFullName)) {
        await AsyncStorage.setItem(StorageKey.APPLE_EMAIL, appleAuthData?.email)
        await AsyncStorage.setItem(StorageKey.APPLE_FULLNAME, name)
      }

      const authData: AuthTypes = {
        social,
        userSocialId,
        socialAccessToken
      }

      if (appleAuthData?.email) {
        authData.email = email
        authData.name = name
      }

      if (appleEmail) authData.email = appleEmail
      if (appleFullName) authData.name = name

      const res = await socialAuth(authData)

      console.log(res)

      if (res) {
        return res
      }
      return null
    }
  } catch (error) {
    if (
      error?.response?.status === 422 &&
      appleAuthData &&
      appleAuthData.identityToken
    ) {
      return socialSignIn({
        social: 'apple',
        userSocialId: appleAuthData.user,
        socialAccessToken: appleAuthData.identityToken
      }).then(res => res?.user)
    }
  }
}

export const facebookSocialAuth = async () => {
  let profile: ProfileMap | null = null
  let token: AccessTokenMap | null = null
  try {
    const loginRes = await LoginManager.logInWithPermissions([
      'public_profile',
      'email'
    ])

    if (loginRes.isCancelled) {
      throw 'User cancelled the login process'
    }

    token = await AccessToken.getCurrentAccessToken()

    if (!token) {
      throw 'Something went wrong obtaining access token'
    }
    profile = await Profile.getCurrentProfile()

    if (profile?.userID && profile?.email) {
      const res = await socialAuth({
        social: 'facebook',
        userSocialId: profile?.userID,
        socialAccessToken: token.accessToken,
        email: profile?.email,
        name: profile?.name
          ? `${profile?.name}`
          : `${profile?.firstName} ${profile?.lastName}`
      })

      if (res) {
        return res
      }
      return null
    }
  } catch (error) {
    if (
      error?.response?.status === 42 &&
      profile?.userID &&
      token?.accessToken
    ) {
      return socialSignIn({
        social: 'facebook',
        userSocialId: profile?.userID,
        socialAccessToken: token?.accessToken
      }).then(res => res?.user)
    }
  }
}
