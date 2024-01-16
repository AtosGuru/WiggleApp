import React from 'react'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import { useMutation } from 'react-query'
import FastImage from 'react-native-fast-image'

import { RootStackParamList } from '../../../RootNavigation'
import LinearGradient from 'react-native-linear-gradient'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import { createDatingChat } from '../../../api/dating.methods'
import { styles } from './styled'

function DatingMatches() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, 'dating_matches'>>()

    const { mutate: createChat } = useMutation(createDatingChat)

    const handleCloseModal = () => {
        navigation.goBack()
    }

    const isNoGold = false

    const handleCreateChat = async () => {
        const partner_id = route?.params.partner_id
        await createChat({
            id: partner_id
        })
        navigation.navigate('dating', {
            step: 3
        })
    }

    const backgroundImage = require('../../../../assets/images/eventBackground.png')
    const closeIcon = require('../../../../assets/icons/close.png')

    return (
        <FastImage
            resizeMode="cover"
            source={backgroundImage}
            style={{
                ...styles.background,
                justifyContent: isNoGold ? 'center' : 'flex-start'
            }}
        >
            {!isNoGold && <View style={styles.styledNoGoldContent}>
                <FastImage
                    source={{ uri: convertImgToLink(route?.params.partner_avatar) }}
                    style={styles.avatar}
                />
                <FastImage
                    source={{ uri: convertImgToLink(route?.params.user_avatar) }}
                    style={styles.avatar}
                />
                <LinearGradient
                    colors={['transparent', 'black']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientShadow}
                />
            </View>}
            <SafeAreaView style={styles.closeView}>
                <TouchableOpacity onPress={handleCloseModal}>
                    <FastImage
                        source={closeIcon}
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>
            </SafeAreaView>
            <View style={{
                ...styles.infoBlock,
                backgroundColor: isNoGold ? 'transparent' : 'black',
            }}>
                {isNoGold && <FastImage
                    source={require('../../../../assets/images/newLogo.png')}
                    style={styles.logo}
                />}
                <Text style={{ color: 'white', fontSize: 36, fontWeight: '600' }}>You have a match!</Text>
                <Text style={{ color: 'white', fontSize: 20, marginTop: isNoGold ? 39 : 12, marginBottom: 23 }}>Shoot your shot</Text>
                <TouchableOpacity
                    onPress={handleCreateChat}
                    style={styles.button}
                >
                    <LinearGradient
                        colors={['#FFCB52', '#FF7B02']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientButton}
                    >
                    <Text style={styles.buttonTitle}>Message</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </FastImage>
    )
}

export default DatingMatches