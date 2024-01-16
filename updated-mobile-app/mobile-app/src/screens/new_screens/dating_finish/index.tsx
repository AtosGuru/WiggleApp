import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView, View } from "react-native"
import FastImage from "react-native-fast-image"
import GradientText from '../../../components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../RootNavigation'
import { styles } from './styled'

function DatingFinish() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const handleFinish = () => {
        navigation.navigate('dating')
    }

    const background = require('../../../../assets/images/eventBackground.png')
    const logo = require('../../../../assets/images/newLogo.png')

    return (
        <FastImage
          resizeMode="cover"
          source={background}
          style={styles.screenImage}
        >
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
                <GradientText
                    style={styles.title}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FFCB52', '#FF7B02']}>
                    {'YOU’RE ALL SET'}
                </GradientText>
                <FastImage
                    style={styles.image}
                    source={logo}
                />
                <Text style={styles.subtitle}>Be nice</Text>
                <Text style={styles.text}>and</Text>
                <Text style={styles.subtitle}>Shoot your shot</Text>
            </View>
            <TouchableOpacity
                onPress={handleFinish}
                style={styles.button}
              >
                <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonWrap}
                >
                    <Text style={styles.buttonTitle}>{'Take me there'}</Text>
                </LinearGradient>
            </TouchableOpacity>
          </SafeAreaView>
          </FastImage>
      )
}

export default DatingFinish