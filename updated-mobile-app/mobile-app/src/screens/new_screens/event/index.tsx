import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react'
import {
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { useQuery } from 'react-query'
import Carousel from 'react-native-reanimated-carousel'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import {
  createEventDynamicLink,
  DeepLinkTypes
} from '../../../hooks/useDynamicLinks'
import { RootStackParamList } from '../../../RootNavigation'
import GradientText from '../../../components/GradientText/GradientText'
import { ConnectionType, QueryKey } from '../../../types/enum'
import { getEventById } from '../../../api/events.methods'
import { FullEvent } from '../../../types/event.interface'
import styles from './styled'
import { ShareBottomDL } from '../../../components/ShareBottomDL'
import {
  deleteConnection,
  getConnections,
  newConnection,
  updateConnection
} from '../../../api/connections.methods'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { axiosInstance } from '../../../api/axiosInstance'
import { getClubDetails } from '../../../api/map.methods'
import moment from 'moment'
import { getGooglePlaceImageUrl } from '../../../helpers/getGooglePlaceImageUrl'

const { width, height } = Dimensions.get('screen')

const mockedUsersData = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwIw4TUNNyavGpNgbeUnWcXS5ixK5Y9wBLo5gIBKqWRtERGay34gjqE-8MvVXhkPV9JA&usqp=CAU',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80',
  'https://media.istockphoto.com/id/1165314750/photo/living-that-urban-life.jpg?s=612x612&w=0&k=20&c=5If9eBsKrj2N0EDx8dvMM6SOEUqNlBTpY-POmwYIt4o=',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
  'https://media.istockphoto.com/id/1208414307/photo/happy-male-executive-in-office.jpg?s=612x612&w=0&k=20&c=3krD8gIdPmHFVwbcHGyQDXUGlcyzmcWQNyRMRp_93P8=',
  'https://media.istockphoto.com/id/1299077582/photo/positivity-puts-you-in-a-position-of-power.jpg?s=170667a&w=0&k=20&c=Ib--rwStdSmJT4GDM8LqIpEyuhD59ROcIlxeEqTNYLM=',
  'https://st4.depositphotos.com/1036367/31538/i/600/depositphotos_315389058-stock-photo-close-up-portrait-of-happy.jpg',
  'https://st4.depositphotos.com/5228995/23884/i/600/depositphotos_238842044-stock-photo-sensual-woman-touching-neck.jpg',
  'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'
]

const mockPhotoGalleryData = [
  'https://eu-images.contentstack.com/v3/assets/blt781c383a1983f673/blt245c6742ee772ff8/621c7212e5e1d450f5065b23/FestivalImage.png?width=734&auto=webp&format=png',
  'https://xttrawave.com/wp-content/uploads/2019/05/20-Most-Popular-Music-Festivals-In-The-World-Right-Now4545.jpg',
  'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Lo4e47D0B4ZkUSefsHgsww.jpeg',
  'https://vikna.tv/wp-content/uploads/2022/01/31/zirka-na-sczeni-792x528.jpg'
]

const maxVisiblePhotos = 7
const remainingPhotosCount = mockedUsersData.length - maxVisiblePhotos

type DisplayData = {
  title: string
  location: string
  date: string
  time: string
  about: string
  rating: number | string
}

function EventScreen() {
  const { t } = useTranslation()
  const {
    params: { id, isClub = false }
  } = useRoute<RouteProp<RootStackParamList, 'event'>>()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'event'>>()
  const user = useSelector((root: RootState) => root.auth.user)

  const [showShare, setShowShare] = useState(false)
  const [step, setStep] = useState(0)

  const { data } = useQuery(QueryKey.event, () => getEventById(id), {
    enabled: !!id && !isClub
  })

  const { data: clubData } = useQuery({
    queryKey: [QueryKey.club, id],
    queryFn: () => getClubDetails(id),
    enabled: !!id && isClub
  })

  const { data: getConnectionsData, refetch: refetchConnections } = useQuery({
    queryKey: [QueryKey.connections, null, user?.id],
    queryFn: getConnections,
    enabled: !!user?.id
  })

  const event: FullEvent | null = data ?? null

  const validClubEventData: DisplayData = useMemo(() => {
    if (isClub) {
      return {
        title: clubData?.name ?? '',
        location: clubData?.vicinity ?? '',
        date: (clubData?.opening_hours?.weekday_text) ?  `${clubData?.opening_hours?.weekday_text?.[moment().weekday()]}` : '',
        time: ``,
        about: clubData?.editorial_summary?.overview ?? '',
        rating: clubData?.rating ?? ''
      }
    }

    return {
      title: data?.title ?? '',
      location: data?.location.title ?? '',
      date: (data?.schedule?.opening_hours?.special_days) ? data?.schedule?.opening_hours?.special_days[0]?.date :'',
      time: (data?.schedule?.opening_hours?.special_days) ? `${data?.schedule?.opening_hours?.special_days[0]?.open?.time || ''} - ${data?.schedule?.opening_hours?.special_days[0]?.close?.time || ''}` : '',
      about: data?.description ?? '',
      rating: ''
    }
  }, [isClub, data, clubData])

  const photoGalleryData = useMemo(() => {
    if (isClub) {
      return clubData?.photos
        ?.map(item => getGooglePlaceImageUrl(item.photo_reference))
        .slice(0, 4)
    }

    return mockPhotoGalleryData
  }, [isClub, data, clubData])
  const description =
    'Neverland is a Thameside haven complete with white sand, past     el-perfect beach huts and, of course, those Instagram-ready rope swings  beach huts and, of course, those Instagram-ready rope swings, course, those Instagram - ready rope swings, course, those  \n\n Instagram - ready rope swings.huts and, of course, those Instagram - ready rope swings beach huts and, of course.'

  const isCheckIn = true

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  const [isCarouselOpen, setIsCarouselOpen] = useState(false)

  const handleOpenModal = () => {
    setIsCarouselOpen(true)
  }

  const handleCloseModal = () => {
    setIsCarouselOpen(false)
  }

  const handleBack = () => navigation.goBack()

  const handleSeeAll = () =>
    navigation.navigate('participants', { event_id: id })

  const [preCheckModalOpen, setPreCheckModalOpen] = useState(false)
  const [checkInModalOpen, setCheckInModalOpen] = useState(false)

  const handleShare = async () => {
    setShowShare(true)
  }

  const onPressSubmit = async () => {
    try {
      if (user?.id) {
        const precheckConnection = getConnectionsData?.connections.find(
          item => item.type === ConnectionType.PRECHECK
        )
        const checkinConnection = getConnectionsData?.connections.find(
          item => item.type === ConnectionType.CHECKIN
        )

        if (precheckConnection) {
          await updateConnection({
            connection_id: precheckConnection.id,
            data: {
              type: ConnectionType.CHECKIN
            }
          })
          await refetchConnections()
          return
        }

        if (checkinConnection) {
          await updateConnection({
            connection_id: checkinConnection.id,
            data: {
              type: ConnectionType.PRECHECK
            }
          })
          refetchConnections()
          return
        }
        await newConnection({
          type: ConnectionType.PRECHECK,
          user_id: user.id,
          event_id: id
        })
        refetchConnections()
      }
    } catch (error) {}
  }

  const submitButtons = useMemo(() => {
    const precheckConnection = getConnectionsData?.connections.find(
      item => item.type === ConnectionType.PRECHECK
    )

    if (precheckConnection) {
      return (
        <TouchableOpacity
          onPress={async () => {
            await onPressSubmit()
            setCheckInModalOpen(true)
          }}
          style={styles.submitButton}>
          <LinearGradient
            colors={['#FFCB52', '#FF7B02']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitGradient}>
            <Text style={{ fontSize: 12 }}>{t('Check in')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        onPress={async () => {
          await onPressSubmit()
          setPreCheckModalOpen(true)
        }}
        style={styles.submitButton}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.submitGradient}>
          <Text style={{ fontSize: 12 }}>{t('Pre-Check')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }, [getConnectionsData])

  const RenderItem = ({ item, index }: { item: string; index: number }) => {
    if (index < maxVisiblePhotos) {
      return (
        <FastImage
          source={{ uri: item }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            marginLeft: -20,
            zIndex: maxVisiblePhotos - index
          }}
        />
      )
    } else if (index === maxVisiblePhotos) {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            backgroundColor: '#252525',
            padding: 8,
            alignItems: 'center',
            marginLeft: 8
          }}>
          <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '600' }}>
            +{remainingPhotosCount}
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 8, fontWeight: '600' }}>
            {t('More')}
          </Text>
        </View>
      )
    }
    return null
  }

  return (
    <Fragment>
      <View
        style={{
          width,
          height,
          position: 'absolute',
          backgroundColor: '#0F0F0F'
        }}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <View style={styles.wrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              position: 'absolute',
              top: 60,
              zIndex: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 30
            }}>
            <TouchableOpacity onPress={handleBack}>
              <FastImage
                source={require('../../../../assets/icons/ArrowLeft.png')}
                style={{
                  width: 24,
                  height: 24
                }}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
              {t('Event Details')}
            </Text>
            <TouchableOpacity onPress={handleShare}>
              <FastImage
                source={require('../../../../assets/icons/Share.png')}
                style={{
                  width: 44,
                  height: 44
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.scrollWrapper}>
            <Carousel
              overscrollEnabled={false}
              snapEnabled={false}
              enabled={false}
              loop
              width={width}
              height={height / 2}
              vertical
              autoPlay={true}
              data={photoGalleryData}
              autoPlayInterval={5000}
              scrollAnimationDuration={200}
              onSnapToItem={index => setStep(index)}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={1} onPress={handleOpenModal}>
                  <FastImage source={{ uri: item }} style={styles.sliderImg} />
                </TouchableOpacity>
              )}
            />

            {isCarouselOpen ? (
              <CarouselModal
                images={photoGalleryData}
                visible={isCarouselOpen}
                onClose={handleCloseModal}
              />
            ) : null}

            <View style={styles.indicatorWrapper}>
              {photoGalleryData?.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    { backgroundColor: index === step ? 'white' : '#252525' }
                  ]}
                />
              ))}
            </View>

            <View
              style={{
                position: 'absolute',
                bottom: -46,
                left: 0,
                zIndex: 3,
                width: '100%',
                padding: 24
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      color: 'white',
                      fontWeight: '600',
                      marginBottom: 10
                    }}>
                    {validClubEventData?.title}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <FastImage
                      source={require('../../../../assets/icons/Location.png')}
                      style={{
                        width: 12,
                        height: 14,
                        marginRight: 8
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        color: '#ffffff',
                        fontSize: 12,
                        fontWeight: '600',
                        maxWidth: width / 2
                      }}>
                      {validClubEventData?.location}
                    </Text>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 12,
                      backgroundColor: '#000000',
                      borderRadius: 50
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: 'white',
                        lineHeight: 18
                      }}>
                      18+
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}>
                <View>
                  <GradientText
                    style={{
                      fontSize: 14,
                      marginBottom: 4,
                      fontWeight: '600'
                    }}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FFCB52', '#FF7B02']}>
                    {validClubEventData?.date || ''}
                  </GradientText>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white'
                    }}>
                    {validClubEventData?.time || ''}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                  <View style={{ alignItems: 'center' }}>
                    <FastImage
                      source={require('../../../../assets/icons/People.png')}
                      style={{ width: 24, height: 24 }}
                    />
                    <GradientText
                      style={{
                        fontSize: 12,
                        marginBottom: 4,
                        fontWeight: '600'
                      }}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={['#FFCB52', '#FF7B02']}>
                      100?
                    </GradientText>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        fontWeight: '600'
                      }}>
                      {t('Pre-Checks')}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <FastImage
                      source={require('../../../../assets/icons/TagUser.png')}
                      style={{ width: 24, height: 24 }}
                    />
                    <GradientText
                      style={{
                        fontSize: 12,
                        marginBottom: 4,
                        fontWeight: '600'
                      }}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={['#FFCB52', '#FF7B02']}>
                      65?
                    </GradientText>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        fontWeight: '600'
                      }}>
                      {t('At the Club')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <LinearGradient
              colors={['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 1)']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: 'absolute',
                width: width,
                height: 160,
                bottom: 0,
                zIndex: 2
              }}
            />
            <LinearGradient
              colors={['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 1)']}
              start={{ x: 1, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: 'absolute',
                width: width,
                height: 64,
                bottom: -64,
                zIndex: 2
              }}
            />
          </View>

          <StatusBar barStyle={'light-content'} />

          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ marginBottom: 40 }}>
              <View style={{ position: 'relative' }}>
                <LinearGradient
                  colors={['#FFDAA8', '#FF7B02']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    height: 1,
                    width: width - 80,
                    marginBottom: 30,
                    alignSelf: 'center'
                  }}>
                  <View
                    style={{
                      height: 1,
                      width: '100%',
                      paddingHorizontal: 46
                    }}
                  />
                </LinearGradient>
                <LinearGradient
                  colors={['#FFCB52', '#FF7B02']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 16,
                    position: 'absolute',
                    top: -8,
                    right: 1
                  }}>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 16
                    }}
                  />
                </LinearGradient>
              </View>

            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: 8
              }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>
                {t('Participants of this event')}
              </Text>

              <TouchableOpacity onPress={handleSeeAll}>
                <Text
                  style={{ fontSize: 12, fontWeight: '600', color: '#686868' }}>
                  {t('See All')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: 28,
                paddingLeft: 20
              }}>
              {mockedUsersData.map((item, index) => (
                <RenderItem item={item} index={index} key={index} />
              ))}
            </View>

            <View style={{ marginBottom: 28 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  marginBottom: 10
                }}>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: 'white' }}>
                  {t('About this Event')}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: '#686868'
                    }}>
                    {validClubEventData.rating}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 24,
                  backgroundColor: '#252525',
                  borderRadius: 26
                }}>
                <Text style={{ fontSize: 12, color: 'white', lineHeight: 20 }}>
                  {isDescriptionOpen
                    ? validClubEventData.about
                    : validClubEventData.about?.substring(0, 208)}{' '}
                  {event?.description && event?.description.length > 208 && (
                    <TouchableOpacity
                      style={Platform.select({
                        ios: { marginBottom: -3.5 },
                        android: {
                          transform: [
                            {
                              translateY: 4.5
                            }
                          ]
                        }
                      })}
                      onPress={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                      <GradientText
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          lineHeight: 20
                        }}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#FFCB52', '#FF7B02']}>
                        {isDescriptionOpen ? t('Show less') : t('Read more')}
                      </GradientText>
                    </TouchableOpacity>
                  )}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: 'white',
                marginBottom: 12
              }}>
              {t('Map')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: 12
              }}>
              <GradientText
                style={{
                  fontSize: 14,
                  fontWeight: '600'
                }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                USA, New York,Street 12
              </GradientText>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#686868' }}>
                  {t('See Location')}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderRadius: 26,
                height: 265,
                marginBottom: 120
              }}>
              {/* TODO: Change image to MapBox */}
              <FastImage
                source={require('../../../../assets/images/Map.png')}
                style={{ width: '100%', height: '100%', borderRadius: 26 }}
              />
            </View>
          </View>
        </ScrollView>
        {submitButtons}
        <ShareBottomDL
          opened={showShare}
          onClose={() => setShowShare(false)}
          type={DeepLinkTypes.EVENT}
          pathId={id}
        />
      </View>

      {checkInModalOpen ? (
        <CheckInModal
          isVisible={checkInModalOpen}
          onBack={() => setCheckInModalOpen(false)}
        />
      ) : (
        <></>
      )}
      {preCheckModalOpen ? (
        <PreCheckModal
          isVisible={preCheckModalOpen}
          onBack={() => setPreCheckModalOpen(false)}
        />
      ) : (
        <></>
      )}
    </Fragment>
  )
}

const CheckInModal = ({ isVisible, onBack }) => {
  const { t } = useTranslation()

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onBack}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#252525E6',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: '#000000',
                borderRadius: 20,
                padding: 36,
                width: '68%'
              }}>
              <FastImage
                source={require('../../../../assets/images/newLogo.png')}
                style={{ width: 'auto', height: 102, marginRight: 4 }}
              />
              <View style={{ marginBottom: 20, alignItems: 'center' }}>
                <Text
                  style={{ fontSize: 12, fontWeight: '400', color: '#ffffff' }}>
                  {t('You just checked in')}!
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={onBack}
                  style={{
                    width: '100%',
                    borderRadius: 12,
                    alignItems: 'center',
                    marginBottom: 10
                  }}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      paddingVertical: 18,
                      borderRadius: 12
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                      {t('Go Back')}!
                    </Text>
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

const PreCheckModal = ({ isVisible, onBack }) => {
  const { t } = useTranslation()

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onBack}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#252525E6',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: '#000000',
                borderRadius: 20,
                padding: 36,
                width: '68%'
              }}>
              <FastImage
                source={require('../../../../assets/images/newLogo.png')}
                style={{ width: 'auto', height: 100, marginRight: 4 }}
              />
              <View style={{ marginBottom: 20, alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: 20
                  }}>
                  {t('Congratulations')}!
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: '#ffffff',
                    textAlign: 'center'
                  }}>
                  {t('You just Pre Checked')}.{' '}
                  {t('You will get a notifications once the event starts')}.
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={onBack}
                  style={{
                    width: '100%',
                    borderRadius: 12,
                    alignItems: 'center',
                    marginBottom: 10
                  }}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      paddingVertical: 18,
                      borderRadius: 12
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                      {t('Go Back')}!
                    </Text>
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

function CarouselModal(props) {
  const { images, onClose, visible } = props

  const carouselRef = useRef(null)

  const handleCloseModal = () => {
    onClose()
  }

  return (
    <Modal transparent visible={visible}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={handleCloseModal}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            backgroundColor: '#252525E6',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={handleCloseModal}>
          <Carousel
            mode="parallax"
            ref={carouselRef}
            width={width}
            loop={false}
            height={285}
            data={images}
            parallaxScrollingOffset={100}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={1}>
                <FastImage
                  source={{ uri: item }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    padding: 'auto'
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default EventScreen
