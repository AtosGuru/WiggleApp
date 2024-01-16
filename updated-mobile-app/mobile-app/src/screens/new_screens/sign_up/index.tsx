import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import GradientText from '../../../components/GradientText/GradientText'
import SignUpSimpleForm from '../../../domains/SignUp/components/SignUpSimpleForm/SignUpSimpleForm'
import styles from './styled'
import { AuthSocialButtons } from '../../../components/AuthSocialButtons'

const { height, width } = Dimensions.get('screen')

function SignUpScreen(): JSX.Element {
  const navigation = useNavigation()

  const handleLogin = () => navigation.navigate('login')

  const onKeyboardDismiss = () => Keyboard.dismiss()

  const { t } = useTranslation()

  return (
    <View style={{ flex: 1 }}>
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
      <SafeAreaView style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container} onTouchStart={onKeyboardDismiss}>
          <TouchableOpacity activeOpacity={1} onPress={onKeyboardDismiss}>
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

            <SignUpSimpleForm />

            <View>
              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerContent}>{t('OR')}</Text>
                <View style={styles.divider} />
              </View>

              {/* Login buttons */}
              <AuthSocialButtons />

              <View style={styles.signUpWrapper}>
                <Text style={{ color: 'white', fontSize: 12 }}>
                  {t('Have an Account')}?{' '}
                </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <GradientText
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
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
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default SignUpScreen
