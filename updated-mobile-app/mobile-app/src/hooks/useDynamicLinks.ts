import { useEffect } from 'react'
import dynamicLinks, {
  FirebaseDynamicLinksTypes
} from '@react-native-firebase/dynamic-links'

export enum DeepLinkTypes {
  EVENT = 'event',
  PROFILE = 'profile'
}

export function useDynamicLinks({
  onNavigate
}: {
  onNavigate: (type: DeepLinkTypes, id: number) => void
}) {
  const handleDynamicLink = (
    link?: FirebaseDynamicLinksTypes.DynamicLink | null
  ) => {
    if (link && link?.url) {
      const type = link.url.includes('/event/')
        ? DeepLinkTypes.EVENT
        : DeepLinkTypes.PROFILE
      const id = link.url.split(`https://www.wiggleapplink.com/${type}/`)[1]
      onNavigate(type, Number(id))
    }
  }

  useEffect(() => {
    let unsubscribe = () => {}
    // foreground
    unsubscribe = dynamicLinks().onLink(handleDynamicLink)

    // background
    dynamicLinks().getInitialLink().then(handleDynamicLink)
    return () => unsubscribe()
  }, [])
}

export const createDynamicLink = async (
  type: DeepLinkTypes,
  id: string | number
) => {
  try {
    const androidPackage = 'com.wiggle.app'
    const iosPackage = 'com.wiggle.app'
    if (androidPackage && iosPackage) {
      const link = await dynamicLinks().buildShortLink({
        domainUriPrefix: 'https://wiggle.page.link',
        link: `https://www.wiggleapplink.com/${type}/${id}`,
        android: {
          packageName: androidPackage
          // fallbackUrl: 'https://www.wigglerapp.com'
        },
        ios: {
          bundleId: iosPackage
          // fallbackUrl: 'https://www.wigglerapp.com'
        }
      })
      return link
    }
    return null
  } catch (error) {
    throw error
  }
}
