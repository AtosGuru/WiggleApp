import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import {
  Dimensions,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  View
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import {
  NavigationProp,
  useIsFocused,
  useNavigation
} from '@react-navigation/native'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'

import { Event } from '../../../types/event.interface'
import { QueryKey } from '../../../types/enum'
import { getEvents } from '../../../api/events.methods'
import { RootState } from '../../../store/store'
import {
  SERCH_BOX_PLACEHOLDER_TEXT_COLOR,
  getImageURL
} from '../../../constants/utils'
import { RootStackParamList } from '../../../RootNavigation'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import { setPosition } from '../../../store/locationSlice'
import {
  ClubProps,
  resetClubState,
  getClubsPlacesByLocation
} from '../../../store/clubSlice'
import { getGooglePlaceImageUrl } from '../../../helpers/getGooglePlaceImageUrl'
import { getNotifications } from '../../../api/notifications.methods'
import { setUpdateNotification } from '../../../store/auth'
import { getClubDetails } from '../../../api/map.methods'
import { updateUserLocation } from '../../../api/user.methods'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { GradientMenuButton } from '../../../components/GradientMenuButton'
import styles from './styled'
import { getPostsThunk } from '../../../store/thunks/getPostsThunk'

const { height, width } = Dimensions.get('screen')

function EventsScreen(): JSX.Element {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const user = useSelector((root: RootState) => root.auth.user)
  const { locationWiseClubs: clubs, isLoading: isLoadingClubs } = useSelector(
    (root: RootState) => root.club
  )
  const updateNotifications = useSelector(
    (root: RootState) => root.auth.updateNotification
  )
  const currentPosition = useSelector(
    (root: RootState) => root.location.position
  )

  const [activeTab, setActiveTab] = useState<'event' | 'festival' | 'clubs'>(
    'clubs'
  )
  const [data, setData] = useState([])
  const [isLoadingFestivals, setIsLoadingFestivals] = useState(true)
  const [mingle, setMingle] = useState(false)
  const [cords, setCords] = useState({})
  const [searchInput, setSearchInput] = useState('')
  const debouncedInput = useDebouncedValue(searchInput, 500)

  useLayoutEffect(() => {
    if (data.length) {
      setIsLoadingFestivals(false)
    }

    setSearchInput('')
  }, [isFocused])

  const fetchDataFestivals = async (
    activeTab: any,
    debouncedInput: any,
    isFocused: any
  ) => {
    if (activeTab !== 'clubs') {
      setIsLoadingFestivals(true)
      setData([])

      try {
        const response: any = await getEvents({
          name: debouncedInput,
          type: activeTab
        })

        setData(response)
      } catch (error) {
        // Handle error here
      } finally {
        setIsLoadingFestivals(false)
      }
    }
  }

  useEffect(() => {
    if (!data.length) {
      fetchDataFestivals(activeTab, debouncedInput, isFocused)
    }
  }, [activeTab, debouncedInput, isFocused])

  useEffect(() => {
    fetchDataFestivals(activeTab, debouncedInput, isFocused)
  }, [debouncedInput])

  const { data: notificationData, refetch: refetchNotifications } = useQuery({
    queryKey: [QueryKey.notifications],
    queryFn: () => getNotifications(),
    refetchInterval: 60 * 1000
  })

  useEffect(() => {
    if (isFocused) {
      refetchNotifications()
    }
  }, [isFocused])

  const activeNotifications = useMemo(() => {
    if (notificationData && notificationData?.length > 0) {
      return notificationData?.filter(item => item.active === 1)
    }

    return []
  }, [notificationData])

  /**
   * Retrieves the current geolocation of the user and dispatches actions based on the location.
   */
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(setPosition(position))
        setCords({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
        if (activeTab == 'clubs') {
          dispatch(
            getClubsPlacesByLocation({
              lat: position.coords.latitude,
              long: position.coords.longitude,
              searchInput: debouncedInput
            })
          )
        }
      },
      error => {
        dispatch(resetClubState())
        console.log('Error_Message = > ', error.message)
      },
      {
        enableHighAccuracy: false
      }
    )
  }

  useEffect(() => {
    /**
     * Requests permission to access the device's fine location and performs actions based on the permission result.
     */
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Wiggle',
            message: 'Wiggle needs access to your location'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location')
          getCurrentLocation()
        } else {
          console.log('Location permission denied')
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestLocationPermission()

    const watchId = Geolocation.watchPosition(
      position => {
        dispatch(setPosition(position))

        if (activeTab == 'clubs') {
          // console.log('activetab location: ', position)
          updateUserLocation(
            position.coords.latitude,
            position.coords.longitude
          )
          dispatch(
            getClubsPlacesByLocation({
              lat: position.coords.latitude,
              long: position.coords.longitude,
              searchInput: debouncedInput
            })
          )
        }
      },
      error => {
        dispatch(resetClubState())
        console.log('Error_Message = > ', error.message)
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 200
      }
    )
    return () => {
      Geolocation.clearWatch(watchId)
    }
  }, [])

  useEffect(() => {
    if (cords && activeTab == 'clubs') {
      dispatch(
        getClubsPlacesByLocation({
          lat: cords.lat,
          long: cords.long,
          searchInput: debouncedInput
        })
      )
    }
  }, [debouncedInput, cords])

  const [loading, setLoading] = useState(true)
  const location = React.useMemo(() => user?.profile?.geolocation?.city, [user])

  const fetchData = () => {
    dispatch(getPostsThunk(location))
  }

  React.useEffect(() => {
    fetchData() // Call the function initially
  }, [location])

  return (
    <SafeAreaView style={[{ flex: 1 }, styles.container]}>
      <View style={styles.backgroundImageWrapper}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <View style={styles.paddingView}>
        <Header
          username={user?.profile.firstName ?? 'User'}
          location={
            user?.profile?.geolocation?.city &&
            user?.profile?.geolocation?.country
              ? `${user?.profile?.geolocation?.city}, ${user?.profile?.geolocation?.country}`
              : ''
          }
          notifications={activeNotifications}
        />
        <SearchBar
          searchInput={searchInput}
          onChangeSearchInput={setSearchInput}
        />
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginBottom: 22
        }}>
        {/* <GradientMenuButton
          label={t('Events')}
          onPress={() => setActiveTab('event')}
          isActive={activeTab === 'event'}
        /> */}
        <GradientMenuButton
          label={t('Events')}
          onPress={() => setActiveTab('clubs')}
          isActive={activeTab === 'clubs'}
        />
        <GradientMenuButton
          label={t('Mingle')}
          onPress={() => {
            navigation.navigate('mingle')
          }}
          isActive={mingle}
        />
        <GradientMenuButton
          label={t('Festivals')}
          onPress={() => setActiveTab('festival')}
          isActive={activeTab === 'festival'}
        />
      </View>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer]}
        showsVerticalScrollIndicator={false}>
        {/* <View
          style={[
            styles.headerWrapper,
            { marginBottom: 0 },
            styles.paddingView
          ]}>
          <Text style={styles.text}>{t('Upcoming Events')}</Text>
        </View> */}

        {(isLoadingClubs && activeTab == 'clubs') ||
        (isLoadingFestivals &&
          activeTab !== 'clubs' &&
          (data || []).length == 0) ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
            <FastImage
              source={require('../../../../assets/images/newLogo.png')}
              style={{ width: 212, height: 110 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 12, color: '#ffffff', marginTop: 1 }}>
              {t('Searching for your result')}......
            </Text>
          </View>
        ) : (!data?.length && ['event', 'festival'].includes(activeTab)) ||
          (!clubs?.length && activeTab === 'clubs') ? (
          <View
            style={{
              alignItems: 'center',
              height: '100%'
            }}>
            <FastImage
              source={require('../../../../assets/images/updated_logo.png')}
              style={{ width: 414, height: 205 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: 10
              }}>
              {t('Sorry')}!
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: 36
              }}>
              {t('No result found')}
            </Text>
            <TouchableOpacity
              style={{ borderRadius: 10, overflow: 'hidden', width: '60%' }}
              onPress={() => {
                getCurrentLocation()
              }}>
              <LinearGradient
                colors={['#FFCB52', '#FF7B02']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 18
                }}>
                <Text style={styles.buttonText}>{t('Try Again')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <EventsList
            events={data ?? []}
            clubs={clubs}
            showClubs={activeTab === 'clubs'}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

type EventProps = {
  data: Event
  onPress: () => void
}
type EventItemProps = {
  onPress: () => void
  imageUrl: string
  title: string
  isOpenNow?: boolean
  isClub: boolean
  date?: string
  time?: string
}

function EventItem({
  onPress,
  imageUrl,
  title,
  isOpenNow = false,
  isClub,
  date = '',
  time = ''
}: EventItemProps) {
  const { t } = useTranslation()
  return (
    <TouchableOpacity style={styles.eventWrapper} onPress={onPress}>
      {/* <View style={styles.eventBgImageWrapper}>
            <Image source={{ uri: image }} style={styles.eventBgImage} />
            <Image blurRadius={10} source={{ uri: image }} style={{position: 'absolute', bottom: 0, right: 0, left: 0, height: 70, transform: [{translateY: -80}]}} />
          </View> */}
      <ImageBackground
        source={{ uri: imageUrl }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <View
          style={{
            height: 70,
            overflow: 'hidden',
            width: '100%',
            position: 'absolute',
            bottom: 0
          }}>
          <ImageBackground
            source={{ uri: imageUrl }}
            blurRadius={Platform.OS === 'ios' ? 12 : 8}
            style={{
              height: 220,
              width: '100%',
              position: 'absolute',
              bottom: 0,
              justifyContent: 'flex-end'
            }}
          />
        </View>
      </ImageBackground>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>18+</Text>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.descriptionWrapper}>
          <View style={styles.descriptionBackground} />
          <View>
            {isClub ? (
              <Text style={styles.data}>
                {isOpenNow ? t('Open') : t('Closed')}
              </Text>
            ) : (
              <View>
                <Text style={styles.data}>{date}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function EventsList(props: {
  events: Event[]
  clubs: ClubProps[]
  showClubs: boolean
}): JSX.Element {
  const { events, clubs, showClubs = false } = props
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'bottom_tab_navigator'>>()

  const handleEvent = (id: number) => {
    navigation.navigate('event', { id })
  }

  const onClubPress = async (clubId: string) => {
    navigation.navigate('event', { isClub: true, id: clubId })
  }

  return (
    <View style={{ gap: 6 }}>
      {showClubs
        ? clubs.map(({ name, photos, data }, index) => (
            <EventItem
              key={index}
              title={name}
              isOpenNow={data?.opening_hours?.open_now}
              isClub
              imageUrl={getGooglePlaceImageUrl(photos?.[0]?.photo_reference)}
              onPress={() => {
                console.log(clubs[index])
                onClubPress(data.reference)
              }}
            />
          ))
        : events?.map(({ image_id, title, begin, id, schedule }, index) => (
            <EventItem
              key={index}
              title={title || ''}
              isClub={false}
              imageUrl={getImageURL(image_id)}
              onPress={() => handleEvent(id)}
              date={schedule?.opening_hours?.special_days?.[0]?.date || ''}
              time={`${
                schedule?.opening_hours?.special_days?.[0]?.open?.time || ''
              } - ${
                schedule?.opening_hours?.special_days?.[0]?.close?.time || ''
              }`}
            />
          ))}
    </View>
  )
}

export function Header(props: {
  mainTitle?: string
  username?: string
  notifications: any[]
  location?: string
  preComponent?: React.ReactNode | null
}): JSX.Element {
  const {
    username = '',
    notifications,
    location = '',
    preComponent = null,
    mainTitle
  } = props
  const user = useSelector((root: RootState) => root.auth.user)

  const navigation = useNavigation()

  const handleProfile = () => navigation.navigate('profile')
  const handleNotifications = () => navigation.navigate('notifications')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { t } = useTranslation()

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {mainTitle ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{mainTitle}</Text>
          </View>
        ) : (
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.greeting}>
              {t('Hi')}, {username} !
            </Text>
            <View style={styles.locationWrapper}>
              <FastImage
                source={require('../../../../assets/icons/Location.png')}
                style={styles.locationIcon}
                resizeMode="contain"
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.location}>
                {location}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.actionsWrapper}>
          {preComponent ? (
            preComponent
          ) : (
            <TouchableOpacity
              style={styles.notificationBtn}
              onPress={handleNotifications}>
              <FastImage
                source={require('../../../../assets/icons/NotificationBell.png')}
                style={styles.notificationIcon}
              />
              {notifications?.length ? (
                <View style={styles.notificationIndicator} />
              ) : null}
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleProfile}>
            <FastImage
              source={
                user && user?.profile?.photos?.length > 0
                  ? { uri: convertImgToLink(user?.profile?.photos[0]) }
                  : require('../../../../assets/icons/Avatar.png')
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.searchWrapper}>
        <TextInput
          placeholder={`${t('Search Events')}.....`}
          placeholderTextColor="#B0B0B0"
          style={styles.searchInput}
        />
        <FastImage
          source={require('../../../../assets/icons/Search.png')}
          style={styles.searchIcon}
        />
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => navigation.navigate('filter')}>
          <FastImage
            source={require('../../../../assets/icons/Filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>

        {isModalOpen ? (
          <InfoModal
            handleBack={() => setIsModalOpen(false)}
            visible={isModalOpen}
          />
        ) : null}
      </View> */}
    </View>
  )
}

type SearchBarProps = {
  searchInput: string
  onChangeSearchInput: (text: string) => void
  searchLabel?: string
  showFilter?: boolean
}

export function SearchBar({
  searchInput,
  onChangeSearchInput,
  searchLabel,
  showFilter = false
}: SearchBarProps) {
  const { t } = useTranslation()
  const navigation = useNavigation()
  return (
    <View style={styles.searchWrapper}>
      <TextInput
        placeholder={searchLabel ?? `${t('Search for events')}...`}
        placeholderTextColor={SERCH_BOX_PLACEHOLDER_TEXT_COLOR}
        style={styles.searchInput}
        value={searchInput}
        onChangeText={onChangeSearchInput}
      />
      <FastImage
        source={require('../../../../assets/icons/Search.png')}
        style={styles.searchIcon}
      />
      {showFilter && (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => navigation.navigate('filter')}>
          <FastImage
            source={require('../../../../assets/icons/Filter.png')}
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

function InfoModal(props: { visible: boolean; handleBack: () => void }) {
  const { visible, handleBack } = props

  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleBack}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.alertContainer}>
              <View style={styles.logoWrapper}>
                <FastImage
                  source={require('../../../../assets/images/newLogo.png')}
                  style={styles.logo}
                />
              </View>

              <Text style={styles.modalText}>
                {t('This feature will be added later')}
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.modalBtn}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}>
                    <Text style={styles.btnText}>{t('Ok')}!</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default EventsScreen
