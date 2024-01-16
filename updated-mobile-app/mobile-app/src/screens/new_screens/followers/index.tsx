import {
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { Fragment, useState } from 'react'

import FastImage from 'react-native-fast-image'
import GradientText from '../../../components/GradientText/GradientText'
import { LinearGradient } from 'react-native-linear-gradient'
import UserInfoModal from '../../../domains/Profile/components/UserInfoModal/UserInfoModal'
import styles from './styled'
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { ConnectionType, QueryKey } from '../../../types/enum'
import { RootStackParamList } from '../../../RootNavigation'
import { getConnections } from '../../../api/connections.methods'
import { UserSearchItem } from '../search'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { height, width } = Dimensions.get('screen')

const userImagesMap = [
  'https://s3-alpha-sig.figma.com/img/95d1/db7a/46bf44f56fdc7c012f0a3f92eda0cdef?Expires=1691971200&Signature=ZGyH9MG69Khelqw-fvcqkC24Np6F8ErFpRXWC9UJHtNPHoIo5H6TmeRTpHgNSu6rnELRcJCSpHqUuCbuvrmAlRDL~33PrFsiiVMFPKMu8hZeBv7GdPV7l0oSYTZBWb22iiHiKnOiyoZixHxCo1ss9xQIearcoLVGtMxDXDGXpxTwjmE9D6SfgdQI~aTwIAHGHp~lcXgLvvBp4odveMPVYtAbjyJNCcgNXYIgeXaWaqAl53FSo2QqhtazVlKIAPPkvnmRNMp8O3r9DxrdTeZf7qd0E5deKgnl-8qqI2N6CJngYl1-zhObzK4QWQ~XaWDVkmk1vHJ0uPFAj8bm425LvQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/0f37/3d73/da1a53662a735ed1df166c2e7cef879d?Expires=1691971200&Signature=bKkRgxRZooD3ThuOQRn-5RZ0tKSwHANPZ9gIWTzpBBMwFeFnUu~R2gLMpiWvznAtAcM9pdRJx3U~7GWLfn9oxfsUk25BGdX5GCvrTH8Kz9NvXrP5CxdI3d-ZBatEahLDuWWQYNprKl0IVRMS-5i5T~jYoScO9az5JXD8Vw-wsTBhWUApi4D3l4pvi~qCKL21YNcCNO3eYC5Du412Zcd7dsJf6om-BTnWnV92cyxlAITaHlji3AaEZaAvOTZulErF9oNdOZspeKGbaGDcrOM5mgbFoZHUQ6Fdyyoe2rZ~~7w6YnyDxmw3uFiug2CJ0GTkpLn1sb0~DW7D64YYdldZUg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/1dbe/bdb8/33cada34061dfb96107784d9e2938f50?Expires=1691971200&Signature=QFfU-ws1~jgibshANs1aMFAR-pbHOzAXKy9laTENafc-I7EX8oCLfxebSjvhfWdEveukDiSQR6Xame~ylx-LiLeM1~6k4Bl-opdh2cwHVTnVv7cGOVty7dUGbY7fqKt45ZrcLOZG9b6cDfR1LK4BlcTOEcEsiLLbpJlrwVAvbIaQxN96s0FvPupnJvF9rmV3Gsrxi4g5Dapcx2C-ZENi8vzT4PGOAAPZYeT7p4bGsBBXkCDkMorV50K57c5uMjIJLvn7YByZTrU54K36fBsY0IfRv5T24U4h-adstGjtvRzOCyubW11EyL-tqnov0ymp2X4VwvnTsaXzI0dHAL8KRQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/a2aa/85bc/6be27c8c32b3d853d576d74979a46e08?Expires=1691971200&Signature=S1zQqOLNoXXVkrtagc5-orL4bwTHnSNSNDk1SmR~8QQTCbe2fV9Ec8ZfPQpW0K0tBb7TGk5gD6KUUtffLPvrD8EL707ua0WLoNZAGNQTkC1TGmfIurUANKiToXhaNvVqhuE-qeKo0x69hJqKOVvIovE~jGQRwrATXGBeR7pAWETIyAS1tRlIyIicfxml5SAHyQZ5K-nb~4uLhtce~bz7lBd4jMxVzU9q1SyWmKSzehQWu8mhNj4mGDRne2ApnJ0xGaQGuqXT0yPFY3UHMJw5BXTaMXO2SlnBR~1Y5XpMnNFxiVyk7xLCR0nd9sGZLpd7EKmAD07eTduif4hRgpQT6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/f5a1/4f78/0fd65f4581864e6146667ec31d354e91?Expires=1691971200&Signature=f4g4BUzQHhyDg0FTXT3~bTUClWm0blps2swn6rBtb4Ax~Tx43F0WQzelXjPssvxWtghE70P-FiiapMp9X82l5M4R~pKTfw~mxKwZBY3q3fpihGCUg85q~FLewGEP66Rft7cxMCG0HEIURTU9h65p5vH9Y9klo0XAmblM0i6~MSYj3vSQk-p54klt0AW7TRuVNZypkc7kvV5npDon~vv49GpJlN~N~DUkQw-ePcOSWEKMiV3e2ZvIJiaS1VH4MvpO-H3APDg3z9Dn14OOj-OkyNgMRsoG-~pk7joG~AAKdQZxKPr76eJAP4GCmvg3sbsLAjkBpabxgJxi98PO9gSOfw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/5257/19d5/c62b63d935de4db4c3a37cb789ce324e?Expires=1691971200&Signature=h1ybZGUQmF1ZbWotInl1XE~6-6otLgJtoEkc1t0Obgo5EBHC-594EGvEBwojSAhcuAg3-Vh~i9wMmsTpSsD9NEcPSCMQEj-FJZRDnDIrz8GF2giP2ShtIu3DUWSwbPWSMkLqWUBfFksvissiSdtULBEh7-1XYJtMCAnsnowcxREdgkK5HnVBv8IVdrOtmZWkPLHPWmzM7X6Pfeq1DVN89FihKop6BagrFDU2frbo2NtbLVwCVCHCcAA9UqcxHrdmWlUJ2p4YkXtQa5s7Clzayr1FCMv4Wx7arV3G1aQLrilP1p7LUkNTnW4H3IulzepgxTnbQkKE~Ah9zFA40JHHzg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/f803/6115/7ffbb4d155a434c47a6e647a93863b02?Expires=1691971200&Signature=NaquI26gCgIyV1DpNviOB7csY56fwzf0L~NkbXfTmU~YKbwPEIR2legefNSytfbsbe2nxq3d-VYQEW-hwb5K06sr0eoHB3OFEOG5FndhzW82gHbltMiZZnuENsW8g~QOLblk7PXYC47h4bVuVbsXRbXCE~osuwqWEWl~E7Nkhm2WtlI92y58TIlPslRC9lAWdyIbdTny7Z2RMM3u7205Kxsy2zJOx-9xYbCX7RSPjVuOf8uhBHsbBwZglRiJ2P7-fxQrarOKesL-kC-GvZV~K7cERUcDr4AsL5HVBBGkuHzeojaw3tqfbuYrsQR80hfFRPcPasJimnKMD9Kw3cy~Hg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/ab4e/3c19/65fa3750aaa673e54d3044b56b00c64c?Expires=1691971200&Signature=lp7a7MRwMgbP4MEOPn19v3fBft-6YtMSp9tWk27T6sDaKH6ZbOf~lT2mHgkoE0oAwyqlxtTnKqwxTa8P~rk9STJ4scaUGLJ5~z~FBGfrucr9c~BI90SxgUzroV-Mf~5LImQkw7eYvB1XDB3DsC46kKG5o6d5RR8CpPR5vI2ZIO07BJdzEMizcZazBvSDJo8QS~WE-QIzOb0HKJd1vKmF6UyIfmwDUMhn9C9x5pYxOHy72ToDUOziKLZRzlhuDZ4pVwz66qLm~wWGFsBFjc1r3NCddTcaJET9b8jvMJ79havLNWMbGbd1vnF68xN5grbVlNe58Ok-a6BhUPSfRqdRqA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/e5b2/ae56/f24dd875f35b3b4d4e4e3248825f1a62?Expires=1691971200&Signature=jEnCHvcJH3iX9u2Xe1o9oATFhSRjOo1eVh0-l4xcEfpqWj~1luFgjIoKX~3-gVyNo7sa9dehgfCNr6inQW~zF7ZLVbhC0HKgZTsuqEDvhrLmbW6TgDnmkmH3zB4KDt-dneDzqcEGMeQGNyZxiCWfrns0-EQRJi1ciURGWR6IvcwnUFF4yCHa6hFFG3PrLVjPnTb4DuBopr59XEG65HCoqCVeqAcc9t8qsK9OczZeMjF2JMa2McYpuPpRvCrKZ4Z9UIs~a3S-~E0j6y7JSySDS-elY7tq6B2pliWsuGz~CsIiww3W1vf2FCG8UIxIxi~w8O0oi9OnLjm~lUPIaPAvjg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
]

function FollowersScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'followers'>>()
  const navigation = useNavigation()
  const handleBack = () => navigation.goBack()

  const [isEditFollowers, setIsEditFollowers] = useState(false)
  const [selectedUser, setSelectedUser] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data } = useQuery({
    queryKey: [
      QueryKey.connections,
      ConnectionType.CONNECTED,
      null,
      params?.user_id ?? 0
    ],
    queryFn: getConnections,
    enabled: !!params?.user_id
  })

  const { t } = useTranslation()

  const onPressUser = (user_id: number) => {
    navigation.dispatch(StackActions.push('profile', { user_id }))
  }

  const onCancel = () => {
    setSelectedUser(null)
    setConfirmationModal(false)
  }

  const onUnfriend = () => {
    setSelectedUser(null)
    setIsModalOpen(false)
  }

  const onEdit = () => {
    if (isEditFollowers) {
      setSelectedUser(null)
    }
    setIsEditFollowers(!isEditFollowers)
  }
  const handleContentPress = () => {
    if (isEditFollowers) {
      setSelectedUser(null)
    }
  }

  const handleOpenModal = imageUrl => {
    setIsModalOpen(true)
    setSelectedUser(imageUrl)
  }

  const primaryColors = ['#FFCB52', '#FF7B02']
  const secondaryColors = ['#ffffff', '#ffffff']

  const onUserDelete = (avatarUser, index) => {
    if (selectedUser === avatarUser) {
      setSelectedUser(null)
    } else {
      setSelectedUser(avatarUser)
      handleBlock()
    }
  }

  const handleBlock = () => setConfirmationModal(true)

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/eventBackground.png')}
      style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 32,
            marginTop: 20,
            marginHorizontal: 21
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
            <TouchableOpacity onPress={handleBack} style={{ flex: 2 }}>
              <FastImage
                source={require('../../../../assets/icons/ArrowLeft.png')}
                style={{
                  width: 24,
                  height: 24
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#ffffff',
                flex: 3
              }}>
              {t('Followers')}
            </Text>
          </View>
        </View>
        <FlatList
          data={data?.connections ?? []}
          style={{ marginHorizontal: 21, marginTop: 24 }}
          columnWrapperStyle={{ gap: 6 }}
          numColumns={3}
          renderItem={({ item }) => (
            <UserSearchItem
              imageUrl={convertImgToLink(item?.user?.profile?.photos?.[0])}
              name={`${item?.user?.profile?.firstName}`}
              onPress={() => onPressUser(item.user_id)}
            />
          )}
        />
      </SafeAreaView>
    </ImageBackground>
  )
}

const ConfirmationModal = props => {
  const { visible, onCancel, avatar } = props

  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#252525E6',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <FastImage
                source={{ uri: avatar }}
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 104,
                  marginBottom: -30,
                  zIndex: 1
                }}
              />
              <View
                style={{
                  backgroundColor: '#000000',
                  borderRadius: 20,
                  paddingHorizontal: 34,
                  paddingBottom: 30,
                  paddingTop: 44,
                  width: '70%'
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#ffffff',
                    marginBottom: 14,
                    textAlign: 'center'
                  }}>
                  {t('Are you sure you want to block')}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: 40,
                    textAlign: 'center'
                  }}>
                  Ashley?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 12
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      width: '100%',
                      borderRadius: 12,
                      alignItems: 'center'
                    }}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: '100%',
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center'
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#ffffff'
                        }}>
                        {t('Yes')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#252525',
                      flex: 1,
                      width: '100%',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center'
                    }}
                    onPress={onCancel}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                      {t('No')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default FollowersScreen
