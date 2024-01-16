import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Fragment, useState } from 'react'

import Carousel from 'react-native-reanimated-carousel'
import Colors from '../../../constants/Colors'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import styles from './styled'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import React = require('react')
import { AuthSocialButtons } from '../../../components/AuthSocialButtons'
import { RootStackParamList } from '../../../RootNavigation'
import { ScrollView } from 'react-native-gesture-handler'

export default function Onboarding() {
  const { t } = useTranslation()

  const imagesMap = [
    require('../../../../assets/images/Onboarding1.png'),
    require('../../../../assets/images/Onboarding2.png'),
    require('../../../../assets/images/Onboarding3.png'),
    require('../../../../assets/images/Onboarding4.png')
  ]

  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'onboarding'>>()
  const { width, height } = Dimensions.get('screen')

  const [step, setStep] = useState(0)

  const handleLogin = () => navigation.navigate('login')
  const handleRegister = () => navigation.navigate('sign_up')

  return (
    <ScrollView>
      <Fragment>
        <View
          style={{
            width,
            height,
            position: 'absolute',
            backgroundColor: '#0F0F0F'
          }}>
          <FastImage
            source={require('../../../../assets/images/search_background.png')}
            style={{ width, height }}
          />
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.langSelectButton}
            onPress={() => navigation.navigate('language')}>
            <FastImage
              source={require('../../../../assets/icons/lang.png')}
              style={styles.langSelectIcon}
            />
          </TouchableOpacity>
          <View style={styles.scrollWrapper}>
            <Carousel
              width={width}
              height={height / 2.2}
              vertical
              autoPlay
              data={imagesMap}
              autoPlayInterval={5000}
              scrollAnimationDuration={200}
              onSnapToItem={index => setStep(index)}
              renderItem={({ item }) => (
                <FastImage source={item} style={styles.sliderImg} />
              )}
            />

            {/* Image indicators */}
            <View style={styles.indicatorWrapper}>
              {imagesMap.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    { backgroundColor: index === step ? 'white' : 'gray' }
                  ]}
                />
              ))}
            </View>

            <View style={styles.textWrapper}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>
                {t('Welcome to')}
              </Text>
              <Text style={{ fontSize: 32, color: 'white', fontWeight: '800' }}>
                WIGGLE
              </Text>
            </View>

            <LinearGradient
              colors={['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 1)']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: 'absolute',
                width: width,
                height: 64,
                bottom: -1,
                zIndex: 2
              }}
            />
          </View>

          <StatusBar barStyle={'light-content'} />

          <View style={styles.contentWrapper}>
            {/* Text */}
            <View style={styles.offset}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: 12
                }}>
                {t('The Night Out Starts Now')}
              </Text>
              <Text style={{ fontSize: 14, color: 'white', marginBottom: 12 }}>
                {t(
                  'This app was designed to help you discover exciting events happening in your city'
                )}
                .
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.alignCenter}>
              <TouchableOpacity
                onPress={handleRegister}
                style={styles.primaryButton}>
                <LinearGradient
                  colors={['#FFCB52', '#FF7B02']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>{t('Create an account')}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                style={styles.secondaryButton}>
                <Text style={[styles.buttonText, { color: Colors.white }]}>
                  {t('Log in')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerContent}>{t('OR')}</Text>
              <View style={styles.divider} />
            </View>

            {/* Login buttons */}
            <AuthSocialButtons />
          </View>
        </View>
      </Fragment>
    </ScrollView>
  )
}
