import React from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { Text, View } from "react-native"
import LinearGradient from 'react-native-linear-gradient'
import GradientText from '../../../components/GradientText/GradientText'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from 'react-query'
import { createSubscribeGold, getMyDatingProfile } from '../../../api/dating.methods'
import { useNavigation } from '@react-navigation/native'
import { QueryKey } from '../../../types/enum'
import { setDatingUser } from '../../../store/datingSlice'

function BuyGold() {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const { mutate: createSub } = useMutation(createSubscribeGold)

    const handleBuyPremium = async () => {
        await createSub()
        const data = await getMyDatingProfile()
        await dispatch(setDatingUser(data))
        navigation.goBack()
    }

    return (
        <SafeAreaView style={{
            backgroundColor: '#0F0F0F',
            height: '100%',
            alignItems: 'center',
        }}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white', marginTop: 24}}>Welcome to</Text>
            <GradientText
                style={{ fontWeight: '800', fontSize: 32, marginTop: 13, marginBottom: 94 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                WIGGLE GOLD
            </GradientText>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Step into the spotlight with</Text>
            <GradientText
                style={{ fontWeight: '700', fontSize: 24, marginTop: 13, marginBottom: 15 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                Wiggle GOLD!
            </GradientText>
            <GradientText
                style={{ fontWeight: '700', fontSize: 16, marginTop: 13, marginBottom: 18 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                Unlimited swipes
            </GradientText>
            <GradientText
                style={{ fontWeight: '700', fontSize: 16, marginTop: 13, marginBottom: 18 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                Real-time event info
            </GradientText>
            <GradientText
                style={{ fontWeight: '700', fontSize: 16, marginTop: 13, marginBottom: 18 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                Check In
            </GradientText>
            <GradientText
                style={{ fontWeight: '700', fontSize: 16, marginTop: 13, marginBottom: 18 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                See Who Pre Checked
            </GradientText>
            <GradientText
                style={{ fontWeight: '700', fontSize: 16, marginTop: 13, marginBottom: 18 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFCB52', '#FF7B02']}>
                See Attending
            </GradientText>
            
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
                marginHorizontal: 76
            }}>
            <TouchableOpacity
                onPress={handleBuyPremium}
                style={{
                    flex: 1,
                    width: '100%',
                    borderRadius: 12,
                    alignItems: 'center',
                }}>
                <LinearGradient
                colors={['#FFCB52', '#FF7B02']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    width: '100%',
                    paddingVertical: 14,
                    borderRadius: 12,
                    alignItems: 'center',
                    height: 62,
                    justifyContent: 'center'
                }}>
                <Text style={{
                    fontSize: 12,
                    color: '#ffffff'
                }}>Enjoy Wiggle GOLD today!</Text>
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default BuyGold