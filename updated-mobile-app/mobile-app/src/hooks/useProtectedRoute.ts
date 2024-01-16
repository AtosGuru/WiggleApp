import React, { useEffect } from 'react'
import { RegistrationStep, User } from '../types/user.interface'
import { useRouter, useSegments } from 'expo-router'

const registrationRoutes = Object.values(RegistrationStep)

enum RedirectionType {
  stayInAuthGroup = 'stayInAuthGroup',
  stayInAppGroup = 'stayInAppGroup',
  redirectToVerification = 'redirectToVerification',
  redirectToProfileCreation = 'redirectToProfileCreation'
}

function getRedirectionType(user: User | undefined): RedirectionType {
  if (!user) {
    return RedirectionType.stayInAuthGroup
  }

  if (!(user?.email_verified_at || user?.phone_verified_at)) {
    return RedirectionType.redirectToVerification
  }

  if (
    !user?.profile ||
    !user?.profile.firstName ||
    !user?.profile.lastName ||
    !user?.profile.photos
  ) {
    return RedirectionType.redirectToProfileCreation
  }

  return RedirectionType.stayInAppGroup
}

export function useProtectedRoute(user: any) {
  const segments = useSegments()
  const router = useRouter()
  const redirection = getRedirectionType(user)

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth'
    const inAppGroup = segments[0] === 'app'
    const isOnVerification =
      segments[1] === 'signUp' && segments[2] === 'codeVerify'
    const isOnInformation =
      segments[1] === 'informationForm' || segments[1] === 'photoUpload'

    if (
      inAuthGroup &&
      !isOnVerification &&
      redirection === RedirectionType.redirectToVerification
    ) {
      return router.replace({
        pathname: '/auth/signUp/codeVerify'
      })
    }

    if (
      inAuthGroup &&
      !isOnInformation &&
      redirection === RedirectionType.redirectToProfileCreation
    ) {
      console.log('redirected to /auth/informationForm')
      return router.replace('/auth/informationForm')
    }

    if (
      (!user || redirection !== RedirectionType.stayInAppGroup) &&
      !inAuthGroup
    ) {
      console.log('redirected to /auth/welcome')
      router.replace('/auth/welcome')
    }

    if (
      redirection === RedirectionType.stayInAppGroup &&
      (inAuthGroup || !inAppGroup)
    ) {
      console.log('redirected to /profile')
      router.replace('app/profile')
    }
  }, [segments, user, router])
}
