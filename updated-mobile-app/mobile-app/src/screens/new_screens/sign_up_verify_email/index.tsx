import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import GradientText from '../../../components/GradientText/GradientText'
import { RootState } from '../../../store/store'
import VerifyEmail from '../../../domains/Login/components/VerifyEmail/VerifyEmail'
import styles from './styled'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import React = require('react')
import { ScrollView } from 'react-native-gesture-handler'

function SignUpVerifyEmailScreen(): JSX.Element {
  const navigation = useNavigation()
  const user = useSelector((root: RootState) => root.auth.user)

  const loginMethods = [
    {
      name: 'google',
      img: require('../../../../assets/images/googleLogo.png')
    },
    { name: 'apple', img: require('../../../../assets/images/appleLogo.png') },
    {
      name: 'facebook',
      img: require('../../../../assets/images/facebookLogo.png')
    }
  ]
  const { t } = useTranslation()

  const handleSignUp = () => navigation.navigate('login')

  const onKeyboardDismiss = () => Keyboard.dismiss()

  const onConfirm = () => navigation.navigate('profile_creation')

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/search_background.png')}
      style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <ScrollView>
        <SafeAreaView style={styles.wrapper}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={onKeyboardDismiss}>
            <View style={styles.container}>
              <View style={{ marginBottom: 30 }}>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>
                  {t('Welcome to')}
                </Text>
                <Text
                  style={{
                    fontSize: 32,
                    color: 'white',
                    fontWeight: '800',
                    textTransform: 'uppercase'
                  }}>
                  wiggle
                </Text>
              </View>

              <VerifyEmail email={user?.email} isSignUp onConfirm={onConfirm} />
            </View>

            <View>
              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerContent}>{t('OR')}</Text>
                <View style={styles.divider} />
              </View>

              {/* Login buttons */}
              <View style={styles.loginMethods}>
                {loginMethods.map(method => (
                  <TouchableOpacity style={styles.circleButton} key={method.name}>
                    <Image source={method.img} style={styles.icon} />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.signUpWrapper}>
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {t('Have an Account')}?{' '}
                </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <GradientText
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FFCB52', '#FF7B02']}>
                    {t('Log in')}
                  </GradientText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  )
}

export default SignUpVerifyEmailScreen
