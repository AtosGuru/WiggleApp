import * as Clipboard from 'expo-clipboard'

import {
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { ReactNode, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

import Age from '../../../../assets/icons/Age.svg'
import ChevronDown from '../../../../assets/icons/ChevronDown.svg'
import Colors from '../../../../../constants/Colors'
import FastImage from 'react-native-fast-image'
import GreenCircle from '../../../../assets/icons/GreenCircle.svg'
import GroupActive from '../../../../assets/icons/GroupActive.svg'
import { LinearGradient } from 'expo-linear-gradient'
import LocationActive from '../../../../assets/icons/LocationActive.svg'
import OrangeCircle from '../../../../assets/icons/OrangeCircle.svg'
import { QueryKey } from '../../../../../types/enum'
import RedCircle from '../../../../assets/icons/RedCircle.svg'
import Share from '../../../../assets/icons/Share.svg'
import { Text } from '../../../../../components'
import TimeActive from '../../../../assets/icons/TimeActive.svg'
import Toast from 'react-native-toast-message'
import { getEventById } from '../../../../../api/events.methods'
import { getImageURL } from '../../../../../constants/utils'
import styled from 'styled-components/native'
import { useDynamicLinks } from '../../../../../hooks/useDynamicLinks'
import { useQuery } from 'react-query'

const { width, height } = Dimensions.get('window')

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
const photoGalleryData = [
  'https://eu-images.contentstack.com/v3/assets/blt781c383a1983f673/blt245c6742ee772ff8/621c7212e5e1d450f5065b23/FestivalImage.png?width=734&auto=webp&format=png',
  'https://xttrawave.com/wp-content/uploads/2019/05/20-Most-Popular-Music-Festivals-In-The-World-Right-Now4545.jpg',
  'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Lo4e47D0B4ZkUSefsHgsww.jpeg',
  'https://www.pioneerdj.com/-/media/pioneerdj/images/landing/beginners/2col-festival.jpg',
  'https://blog.adamhall.com/wp-content/uploads/2019/05/JulianHukePhotography-2321-620x414.jpg',
  'https://vikna.tv/wp-content/uploads/2022/01/31/zirka-na-sczeni-792x528.jpg'
]

const EventDetailsScreen = () => {
  const status = 'OPEN'
  const { id } = useLocalSearchParams<{ id: string }>()
  const { createEventDynamicLink } = useDynamicLinks()
  const { data } = useQuery(QueryKey.event, {
    queryFn: async () => {
      if (id) {
        return await getEventById(id)
      }
    },
    enabled: !!id
  })
  const { push } = useRouter()

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  const statusMap = {
    OPEN: {
      gradient: ['#41CB3E', '#29AA26'],
      icon: <GreenCircle style={{ position: 'absolute', left: 4 }} />
    },
    CLOSE_SOON: {
      gradient: ['#FFCB52', '#FF7B02'],
      icon: <OrangeCircle style={{ position: 'absolute', left: 4 }} />
    },
    CLOSED: {
      gradient: ['#DB2929', '#C72323'],
      icon: <RedCircle style={{ position: 'absolute', left: 4 }} />
    }
  }

  const description =
    'Neverland is a Thameside haven complete with white sand, pastel - perfect beach huts and, of course, those Instagram - ready rope swings beach huts and, of course, those Instagram - ready rope swings, course, those  \n\n Instagram - ready rope swings.huts and, of course, those Instagram - ready rope swings beach huts and, of course, those Instagram - ready rope swings, course, Instagram - ready rope swings. \n\n Instagram - ready rope swings.huts and, of course, those Instagram - ready rope swings beach huts and, of course, those Instagram - ready rope swings, course, Instagram - ready rope swings. \n\n Instagram - ready rope swings.huts and, of course, those Instagram - ready rope swings beach huts and, of course, those Instagram - ready rope swings, course, Instagram - ready rope swings. \n\n Instagram - ready rope swings.huts and, of course, those Instagram - ready rope swings beach huts and, of course, those Instagram - ready rope swings, course, Instagram - ready rope swings. \n\n Instagram - ready rope swings.huts and, of course, those Instagram - ready rope swings beach huts and, of course, those Instagram - ready rope swings, course, Instagram - ready rope swings.'

  const handleShare = async () => {
    if (id) {
      const link = await createEventDynamicLink(id)
      if (link) {
        await Clipboard.setStringAsync(link)
        Toast.show({
          type: 'info',
          text1: 'Share link copied',
          visibilityTime: 2000
        })
      }
    }
  }

  const renderHeaderItem = (
    icon: ReactNode,
    content: string | ReactNode,
    after?: ReactNode
  ) => {
    return (
      <HeaderItem>
        {icon}
        <Text style={{ marginHorizontal: 12 }} color="white">
          {content}
        </Text>
        {after}
      </HeaderItem>
    )
  }

  const handleAttending = () => {}
  const handlePreCheck = () => {}

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.black2,
          marginTop: 12
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              height: height * 0.35,
              width: '100%',
              marginBottom: 64
            }}>
            <FastImage
              style={{ height: '100%', width: '100%' }}
              source={{ uri: getImageURL(data?.image_id) }}
            />
            <View
              style={{
                position: 'absolute',
                left: 16,
                bottom: 0,
                width: 240,
                zIndex: 1
              }}>
              <Text font="Euclid-SemiBold" color="white" size={24} mb={18}>
                Neverland Music Festival
              </Text>
              {renderHeaderItem(
                <TimeActive />,
                '09 Feb, 22:00 - 02:00',
                <ChevronDown />
              )}
              {renderHeaderItem(<LocationActive />, 'USA, New-York, Street 12')}
              {renderHeaderItem(<GroupActive />, '100 Pre Checks', <Age />)}
              {renderHeaderItem(<GreenCircle />, 'At The Club: 65')}
            </View>
            <View
              style={{
                flex: 1,
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: -52,
                paddingHorizontal: 16,
                height: 52,
                width,
                justifyContent: 'center'
              }}>
              <LinearGradient
                style={{
                  width,
                  height: 60,
                  position: 'absolute',
                  top: -60
                }}
                colors={['rgba(0, 0, 0, 0)', Colors.black2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
              {statusMap[status].icon}
              <LinearGradient
                style={{ width: '100%', height: 1 }}
                colors={statusMap[status].gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginBottom: 25
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                width: '100%',
                height: 50,
                marginRight: 55
              }}>
              <LinearGradient
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                colors={['#FFCB52', '#FF7B02']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <Text size={16} font="Euclid-Medium" lineHeight={18}>
                  Pre Check
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 'auto', marginRight: 22 }}
              onPress={handleShare}>
              <Share />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 16
            }}>
            <Text color="white">Attending of this event</Text>
            <TouchableOpacity
              style={{ width: 'auto' }}
              onPress={() => push('app/(events)/attending')}>
              <Text.Gradient>View all</Text.Gradient>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              paddingLeft: 16,
              paddingRight: 300,
              marginVertical: 20
            }}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 5,
                paddingRight: 32
              }}>
              {mockedUsersData?.map((uri, index) => (
                <FastImage
                  key={index}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 50
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{ uri: uri }}
                />
              ))}
            </View>
          </ScrollView>
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                borderRadius: 4,
                borderWidth: 1,
                borderColor: 'white',
                paddingHorizontal: 9,
                paddingVertical: 6,
                marginBottom: 10,
                width: 50
              }}>
              <Text color="white">Info</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text color="white" mb={26}>
                {isDescriptionOpen
                  ? description
                  : description.substring(0, 408)}{' '}
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
                  <Text.Gradient>
                    {isDescriptionOpen ? 'Show less' : 'Read more'}
                  </Text.Gradient>
                </TouchableOpacity>
              </Text>
            </View>

            <Text mb={20} color="white" font="Euclid-SemiBold">
              Photo of this event
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 16,
              paddingHorizontal: 16,
              marginBottom: 40
            }}>
            {photoGalleryData?.map((uri, index) => (
              <View
                key={index}
                style={{
                  borderRadius: 10,
                  width: width / 3 - 22,
                  height: width / 3 - 22
                }}>
                <FastImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{ uri: uri }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const HeaderItem = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  height: 40px;
  align-items: center;
  padding: 0px 10px;
  flex-direction: row;
  margin-bottom: 6px;
`

export default EventDetailsScreen
