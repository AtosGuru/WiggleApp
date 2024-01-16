import React, { useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { styles } from './styled'
import Carousel from 'react-native-reanimated-carousel'
import GradientText from '../../../components/GradientText/GradientText'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from 'react-query'
import { QueryKey } from '../../../types/enum'
import { getDatingProfile, getMyDatingProfile } from '../../../api/dating.methods'
import { RootStackParamList } from '../../../RootNavigation'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { width, height } = Dimensions.get('screen')

function DatingProfile() {
    const route = useRoute<RouteProp<RootStackParamList, 'dating_profile'>>()
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const id = route.params?.id

    const { data: datingProfile, isLoading: isProfileLoading } = useQuery(QueryKey.datingProfile, () => getDatingProfile(id), {
        enabled: !!id,
        cacheTime: 0
    })
    const { data: myDatingProfile, isLoading: isMyProfileLoading } = useQuery(QueryKey.myDatingProfileScreen, getMyDatingProfile, {
        enabled: !id,
        cacheTime: 0
    })

    const handleBackWithResponse = (isLike: boolean) => () => {
        navigation.goBack()

        route.params.handleBack(isLike)
    }

    const handleOpenSettings = () => {
        navigation.navigate('dating_settings')
    }

    const user = id ? datingProfile : myDatingProfile
    const isLoading = id ? isProfileLoading : isMyProfileLoading

    const [step, setStep] = useState(0)

    const isSettings = !id
    const openFromChat = route.params?.openFromChat

    const backgroundImage = require('../../../../assets/images/eventBackground.png')
    const iconLeft = require('../../../../assets/icons/ArrowLeft.png')

    return (
        <FastImage
        resizeMode="cover"
        source={backgroundImage}
        style={styles.imageScreen}
        >
            <ScrollView >
            <SafeAreaView style={styles.backView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FastImage
                        source={iconLeft}
                        style={styles.headerLeftIcon}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        {!isLoading && <SafeAreaView>
            <ScrollView >
            <View style={styles.scrollWrapper}>
                <Carousel
                    overscrollEnabled={false}
                    snapEnabled={false}
                    enabled={true}
                    loop
                    width={width - 24}
                    height={height / 2}
                    vertical
                    autoPlay={true}
                    data={user?.profile?.photos}
                    autoPlayInterval={5000}
                    scrollAnimationDuration={200}
                    onSnapToItem={index => setStep(index)}
                    style={styles.carousel}
                    renderItem={({ item }) => (
                        <View>
                            <View>
                                <FastImage
                                    source={{ uri: convertImgToLink(item) }}
                                    style={styles.sliderImg}
                                />
                            </View>
                        </View>
                    )}
                />
                <View style={styles.header}>
                    <View>
                        {!isSettings && user?.is_online && <View
                            style={styles.headerContent}
                        >
                            <View style={styles.activeStatus}>
                                <View style={styles.greenBadge} />
                                <Text style={styles.activeText}>Recently active</Text>
                            </View>
                        </View>}
                    </View>
                    {isSettings && <TouchableOpacity onPress={handleOpenSettings}>
                        <View style={styles.settings}>
                            <FastImage
                                source={require('../../../../assets/icons/Settings.png')}
                                style={styles.settingsIcon}
                            />
                        </View>
                    </TouchableOpacity>}
                </View>
                <View style={styles.profileInfo}>
                    <View style={styles.profileWrap}>
                        <Text style={styles.name}>{user?.profile?.name}, <Text style={styles.age}>{user?.profile?.age}</Text></Text>
                    </View>
                    <Text style={styles.description}>{user?.profile?.title}</Text>
                </View>
                {!isSettings && !openFromChat && <View style={styles.buttons}>
                    <View>
                        <TouchableOpacity onPress={handleBackWithResponse(false)} style={styles.button}>
                        <GradientText
                            style={styles.iconsSize}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#FFCB52', '#FF7B02']}>
                                ×
                            </GradientText>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleBackWithResponse(true)} style={styles.button}>
                        <FastImage
                            source={require('../../../../assets/images/DatingHeart.png')}
                            style={styles.heartImage}
                        />
                    </TouchableOpacity>
                </View>}
                <View style={styles.indicatorWrapper}>
                    {user?.profile?.photos?.map((_: never, index: number) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                { backgroundColor: index === step ? 'white' : '#252525' }
                            ]}
                        />
                    ))}
                </View>
            </View>
            <View>
                <Text style={styles.title}>Interest</Text>
                <View style={styles.interests}>
                    {user?.profile?.interest?.map((interes: string, index: number) => (
                        <View key={index} style={styles.interest}>
                            <Text style={styles.title}>{interes}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style={{ paddingBottom:20 }}>
                <Text style={styles.title}>Bio</Text>
                <View style={styles.biography}>
                    <Text style={styles.bioText}>
                        {user?.profile?.bio}
                    </Text>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>}
          </ScrollView>
    </FastImage>
    )
}

export default DatingProfile