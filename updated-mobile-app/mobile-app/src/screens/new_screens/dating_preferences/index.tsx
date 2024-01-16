import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, Text, TouchableOpacity, View } from "react-native"
import GradientText from '../../../components/GradientText/GradientText'
import { genders  , GendersPreferenceUpdateNames } from '../dating/const'
import { Genders } from './interface'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native'
import FastImage from 'react-native-fast-image'
import { PERMISSIONS, RESULTS, check, checkNotifications } from 'react-native-permissions'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../../RootNavigation'
import { useMutation, useQuery } from 'react-query'
import { QueryKey } from '../../../types/enum'
import { createDatingProfile, getMyDatingProfile, updateDatingProfile } from '../../../api/dating.methods'
import { styles } from './styled'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import moment = require('moment')

const { width } = Dimensions.get("window")

function DatingPreferences() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, 'dating_preferences'>>()

    const myUser = useSelector((root: RootState) => root.auth.user)

    const { data: datingProfile, refetch } = useQuery(QueryKey.myDatingProfile, getMyDatingProfile)
    const { mutate: updateProfile, isError } = useMutation(updateDatingProfile)
    const { mutate: createProfile } = useMutation(createDatingProfile)

    const [activeGender, setActiveGender] = useState<GendersPreferenceUpdateNames | null>(null)

    useEffect(() => {
        if (route?.params?.isSettings) {
            setActiveGender(datingProfile?.profile.gender)
        }
    }, [datingProfile, route])

    const onSubmit = async () => {
        const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        const result = await check(permission)
        const { status } = await checkNotifications()

        const needToAddPhotos = datingProfile?.profile?.photos ? datingProfile?.profile?.photos?.length < 1 : true
        const needToAddBio = datingProfile?.profile?.bio ? datingProfile?.profile?.bio?.trim().length < 1 : true
        const needToFinishProfile = needToAddPhotos || needToAddBio
        
        const needAccessPermissions = result !== RESULTS.GRANTED || status !== RESULTS.GRANTED

        if (datingProfile?.profile) {
            await updateProfile({
                id: datingProfile.uuid,
                profile: {
                    gender: activeGender
                } as never
            })
        } else {
            const currentDate = moment()
            const age = currentDate.diff(myUser?.profile.birthDate, 'years')
            await createProfile({
                profile: {
                    name: `${myUser?.profile?.firstName} ${myUser?.profile?.lastName}`,
                    gender: activeGender,
                    age,
                } as never
            })
        }

        await refetch()

        if (needToFinishProfile) {
            return navigation.navigate('dating_profileInfo')
        }
        if (needAccessPermissions) {
            return navigation.navigate('dating_requirements')
        }
        
        if (!isError) {
            if (route?.params?.isSettings) {
                route.params.refetch()

                return navigation.goBack()
            }

            return navigation.navigate('dating_finish')
        }
    }

    const background = require('../../../../assets/images/eventBackground.png')

    return (
        <FastImage
            resizeMode="cover"
            source={background}
            style={styles.screenImage}
        >
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.header}>
            <Text style={styles.headerText}>My</Text>
            <GradientText
                style={styles.headerTitle}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                PREFERENCES
            </GradientText>
            </View>
            <FlatList
            scrollEnabled={false}
            data={GendersPreferenceUpdateNames}
            keyExtractor={(e) => e.id.toString()}
            renderItem={({item}) => {
                return (
                <TouchableOpacity
                    onPress={() => setActiveGender(item.name)}
                    style={{
                        ...styles.genderBlock,
                        width: width - 42,
                }}>
                    <LinearGradient
                        colors={item.name === activeGender ? ['#FFCB52', '#FF7B02'] : ['#252525', '#252525']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.genderView}
                    >
                        <Text style={styles.genderTitle}>{item.name}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                )
            }}
            />
            <TouchableOpacity
                disabled={!activeGender}
                onPress={onSubmit}
                style={styles.buttonWrap}
            >
                <LinearGradient
                    colors={activeGender ? ['#FFCB52', '#FF7B02'] : ['#252525', '#252525']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonView}
                >
                    <Text style={{ fontSize: 12, color: activeGender ? 'white' : '#686868' }}>Confirm</Text>
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
        </FastImage>
    )
}

export default DatingPreferences