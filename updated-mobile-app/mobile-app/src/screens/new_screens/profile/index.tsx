import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { Fragment, useEffect, useMemo, useState } from 'react'

import { useQuery } from 'react-query'
import Modal from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'
import FastImage from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-native-reanimated-carousel'
import { LinearGradient } from 'react-native-linear-gradient'
import { MediaType, launchCamera } from 'react-native-image-picker'
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useIsFocused,
  useNavigation,
  useRoute
} from '@react-navigation/native'

import { PhotoModal } from '../chat'
import StoryPreview from '../stories'
import { RootState } from '../../../store/store'
import { setUserData } from '../../../store/auth'
import { User } from '../../../types/user.interface'
import { Loading } from '../../../components/Loading'
import { videoUpload } from '../../../api/video.methods'
import { imageUpload } from '../../../api/images.methods'
import { RootStackParamList } from '../../../RootNavigation'
import { setDeleteModal } from '../../../store/storiesSlice'
import { DeepLinkTypes } from '../../../hooks/useDynamicLinks'
import { ConnectionType, QueryKey } from '../../../types/enum'
import { getUser, getUserById } from '../../../api/user.methods'
import { ShareBottomDL } from '../../../components/ShareBottomDL'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import GradientText from '../../../components/GradientText/GradientText'
import DeleteStoryModal from '../../../components/confirmationModal/deleteStoryModal'
import {
  deleteStoryThunk,
  fetchStoriesThunk,
  postStoryThunk
} from '../../../store/thunks/fetchStoriesThunk'
import {
  deleteConnection,
  getConnections,
  newConnection
} from '../../../api/connections.methods'
import styles from './styled'

// Mocked data
const defaultImages = 4
const checkIns = 23

const userPostsMap = [
  'https://s3-alpha-sig.figma.com/img/1abd/a25a/b895b95185c6d20426e710fb4ccbc39d?Expires=1691366400&Signature=jxfsz5Hrq-uE2BWkWNJbybfZJsRZ7Eo~9iYtLfZdLo~GIR71UpQ9PbqzBQGgARk~wM8Nu-m0uRRD0QKKxv1oaD2XDHH9LZbyMsJYd2hHd4i-riffyH6KT~gWWwgX3ycM1uGAovqEevGVlOw9LRgyyiydLxgjHy8739MMUzmGF0mP4MrRUsMyMaZxmSSEptI9OaOKuuwkC5yvQoh5E1~qChkdQ5NKRF5mu3~4zUoR2VZTWr68acBso8-h2Brzhurbsx85K~E3lnRKX3R0lGwIuezmYz1mhKNP4gmWBDw0KNEJkV2zx1NJLbtNJ874xk-gkZCmLI8C~34pVSR2F9xqgw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/c705/b199/189d19709e60751f8c18fed1615c9ea0?Expires=1691366400&Signature=jDh6VL2e3nb7KfUDrEXgX3mX7QOgnKIi1JOjtzTtqqWJpo-7T~Y9fZrjbat-PXpfxDGEed4aoiNIVs-2rkeWLhN59Upm4b4XUCSEAk2Rx5J4SoSPKi~PQP4vTS0EHgJDANmsbAUGX0GujOPlukE81VZ1Z3L4LO2Grebtz3cZ9E48lxl98nyCon09QxVYrij8oIXRYoXdY6A13EBxsOZdIHtkzrzCxWxlsfoaApiiwZOah~WHN4pwww7WAwtsrO1m9UzUPxKzHPCXE3AR7eXpRN0JIhacvb95hriX4dBaXAK9nbTD6E8ssw5IVk5D3UpFWnj3QP5brRMI-eGR8CovBQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/5e1e/b7f9/19fe1b9eeb81a96889d895699c502333?Expires=1691366400&Signature=UYi-2tgSknbPBqTBdzwsrVh8Pak-MvLTpJ-cwUoY7IKfOeni7IIUJ55DRkc9sqLJddPPKCMp8OM39TR6NOhB0VM6MS1niLw726WwOqOx-LEBVbBBRDNRsS4dn7RxtqJ6P5PFfh2gZikHmqEEZ1zHIbaUMK9gw8hT0knJbA1xGDiwU9tefUZseXXew2vPpZbtDuCsrcL2kMoqJRcDanbuVOdUQGaUNh21NBLpCAxE2zqsjCm40HV553KQBe5XYhpY6wg65BWdANSjEfG3JtiihZI-gKzrgRwMJUOTLSl7Vp-8eLD~Zadm28WwkSBowOHwPc5afWqkDDsrqobVH8xZ8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/121d/8085/d7154ecef772ec6db1a57250d6aec21e?Expires=1691366400&Signature=iPup6pmO3kPWInD08OQheWh-c8i-WgeKtMAoBHCjUrVm7Xrl8hxvf6~6hUhxYBOWNrCQYD3L~pKC6MONsLqAq2ZJY1ZVA3wcb-rTD0R0vBAHEpvfJoc9qXWRfjyMpFEoq-R6LvYA3~~gRMTugsPBC4fRG~TOOLTg3ixx0OSwXkgw1IA8GvUX4rpBSdtWEz4k61iITcCwQCiWmwQ--cE0Q7IO5xVJc0sg3UdlegM5WdmKyMLDGglVCtFO6o5iN2t50l-~MuYySRopLz7ELN-NXTWZzsacqC94CPA1QkvLU4I~ELhgwBqHhKdNc6nXtEl-MEdbH4XDAa8x3N5kzh1A6g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/08f9/51cf/ac04a08af5149ab918721229cdb63c7f?Expires=1691366400&Signature=GXSYW~hy6rJBCD8~By8czYo1Q4Tdy1~Q47U5J2SBOUcJieSTBqh2AfiHVVpfpOXXkc6F0~e~x6go1H1OL15mv8ZSqguejF3zElzg8iHlHJ69KpYsuBuosBOJsJ8ihQD9uFDHq5LUvc47Xoo8BF2AcV5dhQK5WjIv78EjbD-ARmqe1vkH2mTArjmJ97nlZc7xigyaZ0howxSoTMY8PjvGaHUi9fyn~rwbx-B7rV4k3XT7us0Ou2nALyf5slU9XimQOuXl3fpCm2xp9R2DYlcPH~VY8akbjFWMsKuRP140YMA1RoMQkb4RFR9yAgMGoLiLcPCWO5Z6bA1K1HK4VAH9NQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/cf34/7636/7ae9ff5c1ef5d1ea7d5fe4e6a2d8b25a?Expires=1691366400&Signature=fYxJGh~7MJkaNVYFJngiOnpsgM4MkupYQiizOnfyB0WMGicT0VpYF4LZRRg-xWbnRmsGCqSTlQTlgraamS58fiWEVTN4cQSbHtuQh5hh1SHaMhtzhE0HBTZH-8iIewqUVV60yjbw6tTvjjL5DiWibmQpspMOdW21oV7zHzDCKQJbQ6v8Iv4MIAaaXu0IBGZewghcPTSnCFZUSvlkMSlpjdLtjr-YsRjFYJjaeid48SRuOnDmtfvWFrx-rkHGtsJLRjAx0erbvDkanfX9Fvt6J-sEqy~BMY2heOlbbwjzAciHG1m2EVvW62Bdz01vr8~5AqTDfFew8EEl1cifBn9gNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  'https://s3-alpha-sig.figma.com/img/ceda/6d7b/39e478774252fdc1559c4b8cdf94a109?Expires=1691366400&Signature=TJL7AVokaTluTYelaZEXFPHPlqL-VpPsN7waekahpQ3qReWBnBWYx~PZEfbN3zj2ccolTekKmpharSuiBk~H0wXReKZ6jKOGRhNtewkdZybXjjDqFtDBeRQuYL1gS0f9seNDwPSls4kqLnHlO1T8qOGeDQCRVLaWCKUkpmvumeQQUeomEnKLqJt9Akw7e8Xzyk-0UqDa~2IcTEkh2i~abAXwWAhxqdUhAxl1-hgqXcLHmmjFFXRs8AtaC4eFjqjbgQA6pboEv5ka3hTF92RnJTbF7NUwOX8kgiSf6bhr7f05r3UfWtuhiD1WwRloQ0YuiFpnurve93F68ZGYKHsUpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
]

const photoGalleryData = [
  'https://eu-images.contentstack.com/v3/assets/blt781c383a1983f673/blt245c6742ee772ff8/621c7212e5e1d450f5065b23/FestivalImage.png?width=734&auto=webp&format=png',
  'https://xttrawave.com/wp-content/uploads/2019/05/20-Most-Popular-Music-Festivals-In-The-World-Right-Now4545.jpg',
  'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Lo4e47D0B4ZkUSefsHgsww.jpeg',
  'https://www.pioneerdj.com/-/media/pioneerdj/images/landing/beginners/2col-festival.jpg',
  'https://blog.adamhall.com/wp-content/uploads/2019/05/JulianHukePhotography-2321-620x414.jpg',
  'https://vikna.tv/wp-content/uploads/2022/01/31/zirka-na-sczeni-792x528.jpg'
]

const userImagesMap = [
  'https://eu-images.contentstack.com/v3/assets/blt781c383a1983f673/blt245c6742ee772ff8/621c7212e5e1d450f5065b23/FestivalImage.png?width=734&auto=webp&format=png',
  'https://xttrawave.com/wp-content/uploads/2019/05/20-Most-Popular-Music-Festivals-In-The-World-Right-Now4545.jpg',
  'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Lo4e47D0B4ZkUSefsHgsww.jpeg',
  'https://www.pioneerdj.com/-/media/pioneerdj/images/landing/beginners/2col-festival.jpg'
]

const { height, width } = Dimensions.get('screen')

function ProfileScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'profile'>>()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { params } = useRoute<RouteProp<RootStackParamList, 'profile'>>()
  const isFocused = useIsFocused()
  const myUser = useSelector((root: RootState) => root.auth.user)
  const { stories, deleteModal, deleteId } = useSelector(
    (root: RootState) => root.stories
  )
  const [step, setStep] = React.useState(0)
  const [showStoryUrl, setShowStoryUrl] = useState<string | null>(null)
  const [showShare, setShowShare] = useState(false)
  const [picker, setPicker] = useState(false)

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchStoriesThunk())
  }, [])

  const {
    data: otherUser,
    isLoading,
    refetch: refetchOtherUserData
  } = useQuery([QueryKey.userById, params?.user_id], getUserById, {
    enabled: !!params?.user_id
  })

  const { data: connectionsData, refetch: refetchConnection } = useQuery(
    [QueryKey.connections, null, myUser?.id, params?.user_id],
    getConnections,
    { enabled: myUser?.id !== params?.user_id }
  )

  const handleBack = () => navigation.goBack()
  const handleSettings = () => navigation.navigate('settings')
  const handleEditProfile = () => navigation.navigate('profile_edit')
  const handleFollowersPress = () =>
    navigation.dispatch(StackActions.push('followers', { user_id: user?.id }))
  const handleFollowingPress = () =>
    navigation.dispatch(StackActions.push('following', { user_id: user?.id }))

  const updateMyUserData = async () => {
    console.log('Profile updateMyUserData: ')
    const res = await getUser()
    console.log('Profile User Data: ', res)
    if (res) {
      dispatch(setUserData(res))
    }
  }

  const openStoriesCamera = async (params: MediaType) => {
    try {
      const cameraResult: any = await launchCamera({
        mediaType: params,
        durationLimit: 15
      })
      setPicker(false)
      if (cameraResult.didCancel) {
        return
      }
      if (cameraResult.errorMessage) {
        return showToast('error', cameraResult.errorMessage)
      }
      if (cameraResult.assets && cameraResult.assets.length > 0) {
        if (cameraResult?.assets[0].type == 'video/mp4') {
          const url = await videoUpload(cameraResult?.assets[0].uri)
          if (url) {
            //@ts-ignore
            dispatch(postStoryThunk(url))
          }
        } else {
          const url = await imageUpload(cameraResult?.assets[0].uri)
          
          if (url) {
            //@ts-ignore
            dispatch(postStoryThunk(url))
          }
        }
      }
    } catch (error) {
      setPicker(false)
      console.error('An error occurred:', error)
    }
  }

  const showToast = (type: string, text: string) => {
    Toast.show({
      type,
      text1: text
    })
  }

  const onPressStory = (url: string) => {
    setShowStoryUrl(url)
  }

  const goToUserChat = async (user: User) => {
    try {
      const connection = await newConnection({
        partner_id: user.id,
        type: ConnectionType.MESSAGE
      })

      console.log('profile goToUserChat newConnection', connection?.id)
      if (connection && connection?.id) {
        navigation.navigate('chat', {
          connection_id: connection.id,
          userId: connection.partner_id
        })
      }
    } catch (error) {
      console.log('profile goToUserChat error', error)
    }
  }

  const goToUserChatTwilio = async (user: User) => {
    console.log("userID.goToUserChatTwilio:     ===", params?.user_id)
    navigation.navigate('conversation', {
      userId: params?.user_id
    })
  }

  const handleFollow = async () => {
    if (isFollowing && currentConnection) {
      await deleteConnection({ connection_id: currentConnection?.id })
      refetchOtherUserData()
      refetchConnection()
      return
    }
    if (params?.user_id) {
      await newConnection({
        partner_id: params?.user_id,
        type: ConnectionType.REQUESTED
      })
      refetchOtherUserData()
      refetchConnection()
    }
  }

  const currentConnection = useMemo(() => {
    if (
      connectionsData &&
      connectionsData?.connections &&
      connectionsData.connections.length > 0
    ) {
      return connectionsData.connections.find(
        item =>
          item.type === ConnectionType.REQUESTED ||
          item.type === ConnectionType.CONNECTED
      )
    }
    return null
  }, [connectionsData])

  const isFollowing = useMemo(() => {
    return (
      currentConnection &&
      (currentConnection.type === ConnectionType.REQUESTED ||
        currentConnection.type === ConnectionType.CONNECTED)
    )
  }, [currentConnection])

  const followButtonText = useMemo(() => {
    if (currentConnection) {
      if (currentConnection.type === ConnectionType.REQUESTED) {
        return t('Follow requested')
      }
      if (currentConnection.type === ConnectionType.CONNECTED) {
        return t('Following')
      }
    }

    return t('Follow')
  }, [currentConnection])

  const isMyAccount = useMemo(
    () => !params?.user_id || params?.user_id === myUser?.id,
    [myUser, params]
  )

  const isOtherUserPrivate = useMemo(() => {
    if (isMyAccount) {
      return false
    }

    return (
      (otherUser &&
        otherUser.profile &&
        otherUser?.profile?.is_private &&
        currentConnection?.type !== ConnectionType.CONNECTED) ??
      false
    )
  }, [otherUser, currentConnection, isMyAccount])

  const user = useMemo(() => {
    if (params?.user_id && params.user_id !== myUser?.id) {
      return otherUser
    }
    return myUser
  }, [myUser, params?.user_id, otherUser])

  const followCount = useMemo(() => {
    if (params?.user_id && params.user_id !== myUser?.id)
      return {
        followers: user?.followers?.length ?? 0,
        follows: user?.follows?.length ?? 0
      }
    else
      return {
        followers: user?.follow_count?.followers ?? 0,
        follows: user?.follow_count?.follows ?? 0
      }
  }, [user, myUser, otherUser, params])

  const galleryList = useMemo(() => {
    return user?.profile?.photos && user.profile.photos.length >= 2
      ? user.profile.photos.map(convertImgToLink).slice(1)
      : userImagesMap.map(convertImgToLink)
  }, [user])

  useEffect(() => {
    if (isMyAccount && isFocused) {
      updateMyUserData()
    }
  }, [isMyAccount, isFocused])

  const story = isMyAccount ? stories || [] : user?.profile?.stories || []

  const createData = () => {
    const dataValue = story?.length - 1
    const array = []
    for (let i = 0; i <= dataValue; i++) {
      const userImage = story[i]
      const userName = isMyAccount
        ? 'My Story'
        : user?.profile?.firstName + ' ' + user?.profile?.lastName
      const userProfile = convertImgToLink(user?.profile?.photos[0])

      const storyImage = story[i]

      const userObject = {
        user_Profile: userProfile,
        user_id: user?.id,
        user_image: userImage,
        user_name: userName,
        stories: [
          {
            story_id: storyImage,
            story_image: storyImage,
            swipeText: '  ',
            onPress: () => console.log(`story ${storyImage} swiped`)
          }
        ]
      }

      array.push(userObject)
    }

    return array
  }

  const [data, setData] = useState(createData())

  useEffect(() => {
    const newData = createData()
    setData(newData)
  }, [isFocused, story.length])

  return (
    <Fragment>
      <View style={styles.backgroundImageWrapper}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <SafeAreaView style={styles.flex}>
        {isLoading ? (
          <Loading fill />
        ) : (
          <View style={styles.wrapper}>
            <ScrollView
              contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}>
              <StatusBar barStyle={'light-content'} />
              <View
                style={{
                  paddingBottom: 80
                }}>
                {/* HEADER */}
                <View style={styles.headerView}>
                  <View style={styles.headerInnerView}>
                    <TouchableOpacity
                      onPress={handleBack}
                      style={{ padding: 5 }}>
                      <FastImage
                        source={require('../../../../assets/icons/ArrowLeft.png')}
                        style={styles.arrowImage}
                      />
                    </TouchableOpacity>
                    {!isOtherUserPrivate && (
                      <TouchableOpacity onPress={() => setShowShare(true)}>
                        <FastImage
                          source={require('../../../../assets/icons/Share.png')}
                          style={styles.shareImage}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Modal
                    backdropOpacity={0.1}
                    onBackdropPress={() => setPicker(false)}
                    hasBackdrop={true}
                    isVisible={picker}>
                    <View
                      style={{
                        width: 200,
                        height: 100,
                        alignSelf: 'center',
                        backgroundColor: '#252525',
                        borderRadius: 20,
                        position: 'absolute',
                        top: 450
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                          textAlign: 'center',
                          margin: 4
                        }}>
                        {' '}
                        Choose an Option{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => openStoriesCamera('photo')}
                        style={{ margin: 5 }}>
                        <GradientText
                          style={{
                            fontSize: 20,
                            fontWeight: '500',
                            zIndex: 4,
                            textAlign: 'center'
                          }}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#FFCB52', '#FF7B02']}>
                          Photo
                        </GradientText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openStoriesCamera('video')}
                        style={{ margin: 5 }}>
                        <GradientText
                          style={{
                            fontSize: 20,
                            fontWeight: '500',
                            zIndex: 4,
                            textAlign: 'center'
                          }}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#FFCB52', '#FF7B02']}>
                          Video
                        </GradientText>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                  <View style={styles.galleryView}>
                    <LinearGradient
                      colors={['#ffffff', '#ffffff1A']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.linearGallery}>
                      {isOtherUserPrivate ? (
                        <View
                          style={{
                            height: 230,
                            width: width - 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: 50
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '600',
                              color: 'black',
                              marginBottom: 7
                            }}>
                            {t('This profile is private')}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              color: 'black',
                              marginBottom: 11
                            }}>
                            {t(
                              'Follow this account to see their photos and videos'
                            )}
                          </Text>
                          <FastImage
                            source={require('../../../../assets/icons/Lock.png')}
                            style={{ width: 24, height: 24 }}
                          />
                        </View>
                      ) : (
                        <Carousel
                          loop={galleryList.length > 1}
                          enabled={galleryList.length > 1}
                          width={width - 40}
                          height={230}
                          autoPlay={true}
                          data={galleryList}
                          autoPlayInterval={5000}
                          scrollAnimationDuration={200}
                          onSnapToItem={index => setStep(index)}
                          style={styles.carousel}
                          renderItem={({ item }) => (
                            <View>
                              <FastImage
                                source={{ uri: item }}
                                style={styles.carouselImage}
                              />
                            </View>
                          )}
                        />
                      )}
                    </LinearGradient>

                    {galleryList.length > 1 && (
                      <View
                        style={[
                          styles.galleryListView,
                          { display: isOtherUserPrivate ? 'none' : 'flex' }
                        ]}>
                        {galleryList.map(
                          (_: any, index: React.Key | null | undefined) => (
                            <View
                              key={index}
                              style={[
                                {
                                  width: 30,
                                  height: 6,
                                  marginHorizontal: 8,
                                  borderRadius: 4
                                },
                                {
                                  backgroundColor:
                                    index === step
                                      ? 'white'
                                      : 'rgba(104, 104, 104, 1)'
                                }
                              ]}
                            />
                          )
                        )}
                      </View>
                    )}
                  </View>
                  <View style={styles.AvatarView}>
                    <FastImage
                      source={
                        user && user?.profile?.photos?.length > 0
                          ? { uri: convertImgToLink(user?.profile?.photos[0]) }
                          : require('../../../../assets/icons/Avatar.png')
                      }
                      style={styles.avatarImg}
                    />
                  </View>
                  {isMyAccount && (
                    <TouchableOpacity
                      style={styles.myaccountTouchable}
                      onPress={handleSettings}>
                      <FastImage
                        source={require('../../../../assets/icons/Settings.png')}
                        style={styles.arrowImage}
                      />
                    </TouchableOpacity>
                  )}

                  <Text style={styles.firstNametext}>
                    {user?.profile.firstName}
                  </Text>
                  {!isMyAccount ? (
                    <Text style={styles.otheruserText}>{otherUser?.name}</Text>
                  ) : (
                    <View />
                  )}
                  {/* If it is my profile */}
                  {isMyAccount ? (
                    <View style={styles.editProfileWrap}>
                      <View style={styles.editProfileSide} />
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleEditProfile}>
                        <LinearGradient
                          colors={['#FFCB52', '#FF7B02']}
                          start={{ x: 1, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.gradient}>
                          <Text style={styles.buttonText}>
                            {t('Edit Profile')}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      <View style={styles.editProfileSide} />
                    </View>
                  ) : (
                    <View style={styles.followView}>
                      <TouchableOpacity
                        style={[styles.button]}
                        onPress={handleFollow}>
                        <LinearGradient
                          colors={
                            isFollowing
                              ? ['#686868', '#686868']
                              : ['#FFCB52', '#FF7B02']
                          }
                          start={{ x: 1, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.gradient}>
                          <Text style={styles.buttonText}>
                            {followButtonText}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      {!isOtherUserPrivate && (
                        <TouchableOpacity
                          style={[styles.button]}
                          onPress={() => {
                            if (user) {
                              goToUserChatTwilio(user)
                            }
                          }}>
                          <LinearGradient
                            colors={['#252525', '#252525']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradient}>
                            <Text style={styles.buttonText}>
                              {t('Message')}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  <View
                    style={[
                      styles.chkIn,
                      { display: isOtherUserPrivate ? 'none' : 'flex' }
                    ]}>
                    <View style={styles.chkInView}>
                      <Text style={styles.chkInText}>{checkIns}</Text>
                      <Text style={styles.followerText}>{t('Check Ins')}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.chkInView}
                      onPress={handleFollowersPress}>
                      <Text style={styles.chkInText}>
                        {followCount?.followers ?? 0}
                      </Text>
                      <Text style={styles.followerText}>{t('Followers')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.chkInView}
                      onPress={handleFollowingPress}>
                      <Text style={styles.chkInText}>
                        {followCount?.follows ?? 0}
                      </Text>
                      <Text style={styles.followerText}>{t('Following')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* CONTENT */}

                {isOtherUserPrivate ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <FastImage
                      source={require('../../../../assets/icons/wiggleLogo.png')}
                      style={{ width: 100, height: 100 }}
                    />
                  </View>
                ) : (
                  <>
                    {user?.profile && (
                      <View style={styles.userProfile}>
                        {isMyAccount && data?.length < 4 ? (
                          <View style={styles.emptyView}>
                            <LinearGradient
                              colors={['#FFCB52', '#FF7B02', '#252525']}
                              start={{ x: 0, y: 0.5 }}
                              end={{ x: 0, y: 1 }}
                              style={styles.linerStyle}>
                              <TouchableOpacity
                                disabled={!isMyAccount}
                                onPress={() => openStoriesCamera('photo')}
                                activeOpacity={0}
                                style={styles.nostoriesView}>
                                <View style={styles.addstory}>
                                  <FastImage
                                    style={styles.addIcon}
                                    source={require('../../../../assets/images/plusIcon.png')}
                                  />
                                </View>
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>
                        ) : null}
                        <StoryPreview
                          showAvatarText={false}
                          unPressedBorderColor={'transparent'}
                          pressedBorderColor={'transparent'}
                          style={{
                            zIndex: -10,
                            width: data?.length < 4 ? '75%' : '100%'
                          }}
                          data={data}
                          duration={15}
                          avatarWrapperStyle={styles.avatarWrapperStyle}
                          avatarImageStyle={styles.avatarImageStyle}
                          avatarFlatListProps={{}}
                          from={false}
                        />
                      </View>
                    )}

                    <View style={styles.pastEventWrapper}>
                      <Text style={styles.pastEventText}>
                        {t('Past Events and Upcoming Events')}
                      </Text>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.directionRow}>
                          {userPostsMap.map((uri, index) => (
                            <View style={styles.postMap} key={index}>
                              <FastImage
                                key={index}
                                source={{ uri: uri }}
                                resizeMode={FastImage.resizeMode.cover}
                                style={styles.postMapImg}
                              />
                              <View style={styles.clubsView}>
                                <Text style={styles.clubsName}>
                                  Neverland Club
                                </Text>
                                <Text style={styles.clubDate}>28 May</Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      </ScrollView>
                    </View>
                  </>
                )}
              </View>
            </ScrollView>
            <DeleteStoryModal
              isVisible={deleteModal}
              onYesPress={() => {
                dispatch(deleteStoryThunk(deleteId))
              }}
              onNoPress={() => {
                dispatch(setDeleteModal(''))
              }}
            />
          </View>
        )}
        <PhotoModal
          visible={showStoryUrl !== null}
          photoSource={showStoryUrl ?? ''}
          onClose={() => setShowStoryUrl(null)}
        />
        {/* <ShareBottomDL
          opened={showShare}
          onClose={() => setShowShare(false)}
          type={DeepLinkTypes.PROFILE}
          pathId={user?.id ?? (myUser?.id as number)}
        /> */}
      </SafeAreaView>
    </Fragment>
  )
}

export default ProfileScreen
