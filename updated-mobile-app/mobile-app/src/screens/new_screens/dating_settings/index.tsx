import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import { Slider } from '@miblanchard/react-native-slider';
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Text, View } from "react-native"
import FastImage from 'react-native-fast-image'
import { RootStackParamList } from '../../../RootNavigation'
import LinearGradient from 'react-native-linear-gradient';
import { useMutation, useQuery } from 'react-query';
import { QueryKey } from '../../../types/enum';
import { deleteDatingProfile, getMyDatingProfile, updateDatingProfile } from '../../../api/dating.methods';
import { styles } from './styled';
import { convertImgToLink } from '../../../helpers/convertImgToLink';
import { setDatingUser } from '../../../store/datingSlice';
import { useDispatch } from 'react-redux';
import DeleteMediaModal from '../../../domains/Profile/components/DeleteMediaModal/DeleteMediaModal';

function DatingSettings() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const dispatch = useDispatch()

    const { data: myDatingProfile, refetch } = useQuery(QueryKey.myDatingProfile, getMyDatingProfile)
    const { mutate: updateMyDatingProfile } = useMutation(updateDatingProfile)

    const [age, setAge] = useState<[number, number]>([16, 100])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    useEffect(() => {
        if (myDatingProfile?.profile.ageFilter) {
            setAge(myDatingProfile.profile.ageFilter)
        }
    }, [myDatingProfile])

    const changeAgeFilter = (item: [number, number]) => {
        setAge(item)
    }

    const handleChangeProfileInfo = () => {
        navigation.navigate('dating_profileInfo', {
            isSettings: true,
        })
    }

    const handleUpdateAgeFilter = () => {
        updateMyDatingProfile({
            id: myDatingProfile.uuid,
            profile: {
                ageFilter: [Math.round(age[0]), Math.round(age[1])]
            }
        })
    }

    const handleChangeGender = () => navigation.navigate('dating_preferences', {
        isSettings: true,
        refetch
    })

    const handleRemoveDatingProfile = async () => {
        await deleteDatingProfile(myDatingProfile.uuid)
        await dispatch(setDatingUser(null))
        navigation.navigate('events' as never)
    }

    const handleBack = () => navigation.goBack()

    const ageFilter = `${Math.round(age[0])}-${Math.round(age[1])}`
    const gender = `${myDatingProfile?.profile?.gender}`
    const genderTitle = gender.charAt(0).toUpperCase() + gender.slice(1);

    return (
        <SafeAreaView style={styles.settings}>
            <DeleteMediaModal
                title='Dating Profile'
                visible={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                onDelete={handleRemoveDatingProfile}
            />
            <View>
                <View style={styles.content}>
                <View
                    style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                    <FastImage
                        source={require('../../../../assets/icons/ArrowLeft.png')}
                        style={styles.leftIcon}
                    />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {t('Settings')}
                    </Text>
                </View>
                </View>
                <View style={styles.userInfo}>
                    <View style={styles.userAvatar}>
                        <FastImage
                            source={{ uri: convertImgToLink(myDatingProfile?.profile?.photos?.[0]) }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>{myDatingProfile?.profile.name}</Text>
                    </View>
                    <TouchableOpacity onPress={handleChangeProfileInfo}>
                        <FastImage
                            source={require('../../../../assets/icons/UserEdit.png')}
                            style={styles.editIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.userGender}>
                    <Text style={styles.title}>Preferences</Text>
                    <TouchableOpacity  onPress={handleChangeGender} style={styles.currentGender}>
                        <Text style={styles.grayTitle}>{genderTitle}</Text>
                        <FastImage
                            source={require('../../../../assets/icons/ArrowRight.png')}
                            style={styles.rightIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.ageView}>
                    <Text style={styles.title}>Age</Text>
                    <Text style={styles.grayTitle}>{ageFilter}</Text>
                </View>
                <Slider
                    value={age}
                    onValueChange={changeAgeFilter}
                    onSlidingComplete={handleUpdateAgeFilter}
                    minimumValue={18}
                    maximumValue={100}
                    renderThumbComponent={() => (
                        <LinearGradient
                            colors={['#FFCB52', '#FF7B02']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientSlider}
                        />
                    )}
                    containerStyle={styles.sliderMargin}
                    trackStyle={styles.sliderBackgroundColor}
                    minimumTrackStyle={styles.sliderBackgroundColor}
                />
            </View>
            <TouchableOpacity onPress={() => setOpenDeleteModal(true)} style={styles.deleteButtonView}>
                <Text style={styles.deleteButton}>Delete Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default DatingSettings