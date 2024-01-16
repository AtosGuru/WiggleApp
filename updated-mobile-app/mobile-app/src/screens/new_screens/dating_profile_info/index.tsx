import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import GradientText from "../../../components/GradientText/GradientText"
import { imageUpload } from '../../../api/images.methods'
import Toast from 'react-native-toast-message'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { PERMISSIONS, RESULTS, check, checkNotifications } from 'react-native-permissions'
import { RootStackParamList } from '../../../RootNavigation'
import { useMutation, useQuery } from 'react-query'
import { getMyDatingProfile, updateDatingProfile } from '../../../api/dating.methods'
import { QueryKey } from '../../../types/enum'
import { styles } from './styled'
import { Interest } from './interface'
import { interestData } from './const'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import { Loading } from '../../../components/Loading'
import { PhotoItem } from '../../../domains/Profile/components/ProfileMediaForm/ProfileMediaForm'
import { CoverPhotoUploader } from '../profile_edit'
import { t } from 'i18next'

function DatingProfileInfo() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, 'dating_profileInfo'>>()

    const isSettings = route?.params?.isSettings

    const [photosLoading, setPhotosLoading] = useState(false)
    const [biography, setBiography] = useState('')
    const [title, setTitle] = useState('')
    const [interest, setInterest] = useState<Interest[]>([])

    const [firstCoverPhoto, setFirstCoverPhoto] = useState<PhotoItem[] | null>(
        null
      )
      const [secondCoverPhoto, setSecondCoverPhoto] = useState<PhotoItem[] | null>(
        null
      )
      const [thirdCoverPhoto, setThirdCoverPhoto] = useState<PhotoItem[] | null>(
        null
      )
      const [fourthCoverPhoto, setFourthCoverPhoto] = useState<PhotoItem[] | null>(
        null
      )

    const { data: datingProfile } = useQuery(QueryKey.myDatingProfile, getMyDatingProfile)
    const { mutate, isError } = useMutation(updateDatingProfile)

    const [isKeyboardActive, setIsKeyboardActive] = useState(false);

    const keyboardDidShow = () => {
        setIsKeyboardActive(true);
    };

    const keyboardDidHide = () => {
        setIsKeyboardActive(false);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [])

    useEffect(() => {
        if (route?.params?.isSettings) {
            const resPhotos = datingProfile?.profile.photos
            const photo = (index: number) => {
                return resPhotos?.[index] ? [{ uri: convertImgToLink(resPhotos?.[index]), local: false }] : null
            }
    
            // todo replace arrays for photos to objects
            if (resPhotos && resPhotos.length > 0) {
              setFirstCoverPhoto(photo(0))
              setSecondCoverPhoto(photo(1))
              setThirdCoverPhoto(photo(2))
              setFourthCoverPhoto(photo(3))
            }

            setBiography(datingProfile?.profile.bio)
            setTitle(datingProfile?.profile.title)
            setInterest(datingProfile?.profile.interest)
        }
    }, [datingProfile, route])

    const onSubmit = async () => {
        const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        const result = await check(permission)
        const { status } = await checkNotifications()

        const needAccessPermissions = result !== RESULTS.GRANTED || status !== RESULTS.GRANTED

        setPhotosLoading(true)

        const myPhotos = [
            firstCoverPhoto,
            secondCoverPhoto,
            thirdCoverPhoto,
            fourthCoverPhoto
          ]
            .map(item => item?.[0] ?? null)
            .filter(item => item !== null)
      
          if (myPhotos.length < 2) {
            setPhotosLoading(false)
            return Toast.show({
              type: 'error',
              text1: 'You need to upload minimum 2 photos'
            })
          }
          const myValidPhotos = await Promise.all(
            myPhotos.map(async item => {
              if (item && item?.fileName && item?.type) {
                const uploadedUrl = await imageUpload(item.uri)
                if (uploadedUrl) {
                  return uploadedUrl
                }
              }
      
              return item?.uri
            })
          )
      
          if (myValidPhotos.find(item => item?.includes('file:/'))) {
            setPhotosLoading(false)
            return Toast.show({
              type: 'error',
              text1: "Photos can't be uploaded"
            })
          }

        await mutate({
            id: datingProfile?.uuid,
            profile: {
                photos: myValidPhotos,
                bio: biography,
                title,
                interest
            } as never
        })

        if (needAccessPermissions) {
            return navigation.navigate('dating_requirements')
        }

        setPhotosLoading(false)
        
        if (!isError) {
            if (route?.params?.isSettings) {
                return navigation.goBack()
            }
            return navigation.navigate('dating_finish')
        }
    }

    const handleBack = () => {
        navigation.goBack()
    }

    const isDisabled = biography.trim().length < 1

    const background = require('../../../../assets/images/eventBackground.png')

    return (
    <FastImage
        resizeMode="cover"
        source={background}
        style={styles.screenImage}
      >
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.flex}
      >
        <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll}>
            {isSettings && (
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                    <FastImage
                        source={require('../../../../assets/icons/ArrowLeft.png')}
                        style={styles.headerLeftIcon}
                    />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        Edit Profile
                    </Text>
                </View>
            )}
            <GradientText
                style={styles.title}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                PHOTOS
            </GradientText>
            <View style={{
                marginHorizontal: 21
            }}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 18,
                    marginBottom: 18,
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                    <CoverPhotoUploader
                        photo={firstCoverPhoto}
                        setPhoto={setFirstCoverPhoto}
                        modalText={`${t('Upload Additional Images')} 1/4`}
                        imgHeight={204}
                    />
                    <CoverPhotoUploader
                        photo={secondCoverPhoto}
                        setPhoto={setSecondCoverPhoto}
                        modalText={`${t('Upload Additional Images')} 2/4`}
                        imgHeight={204}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 18,
                    marginBottom: 18,
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                    <CoverPhotoUploader
                        photo={thirdCoverPhoto}
                        setPhoto={setThirdCoverPhoto}
                        modalText={`${t('Upload Additional Images')} 3/4`}
                        imgHeight={204}
                    />
                    <CoverPhotoUploader
                        photo={fourthCoverPhoto}
                        setPhoto={setFourthCoverPhoto}
                        modalText={`${t('Upload Additional Images')} 4/4`}
                        imgHeight={204}
                    />
                </View>
            </View>
            <GradientText
                style={styles.title}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}
            >
                YOUR BEST PICKUP LINE
            </GradientText>
            <TextInput
                maxLength={45}
                placeholder={'...'}
                placeholderTextColor="#fff"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <GradientText
                style={styles.title}                
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                BIO
            </GradientText>
            <TextInput
                value={biography}
                onChangeText={setBiography}
                style={styles.textarea}
                multiline
            />
            <GradientText
                style={styles.title}                
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                INTEREST
            </GradientText>
            <View style={{ marginBottom : 20 }}>
                <FlatList
                    keyExtractor={(e) => e.id.toString()}
                    scrollEnabled={false}
                    data={interestData}
                    contentContainerStyle={styles.interests}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            if (interest?.some(e => e === item.name)) {
                                setInterest(interest.filter(e => e !== item.name))
                            } else {
                                setInterest(prev => [...prev, item.name as never])
                            }
                        }}>
                            <LinearGradient
                                colors={interest?.some(e => e === item.name) ? ['#FFCB52', '#FF7B02'] : ['#252525', '#252525']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.interest}
                            >
                                <Text style={styles.interestName}>{item.name}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
            {!isKeyboardActive && <TouchableOpacity
                onPress={onSubmit}
                disabled={isDisabled || photosLoading}
                style={styles.button}
            >
                <LinearGradient
                    colors={(isDisabled || photosLoading) ? ['#252525', '#252525'] : ['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonView}
                >
                    {photosLoading ? <Loading size={'small'} />
                    : <Text style={{ fontSize: 12, color: isDisabled ? '#686868' : 'white'}}>Confirm</Text>}
                </LinearGradient>
            </TouchableOpacity>}
        </SafeAreaView>
        </KeyboardAvoidingView>
        </FastImage>
    )
}

export default DatingProfileInfo