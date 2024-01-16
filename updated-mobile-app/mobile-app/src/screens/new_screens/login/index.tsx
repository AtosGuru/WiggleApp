import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import GradientText from '../../../components/GradientText/GradientText'
import LoginSimpleForm from '../../../domains/Login/components/LoginSimpleForm/LoginSimpleForm'
import styles from './styled'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import React = require('react')
import { AuthSocialButtons } from '../../../components/AuthSocialButtons'

function LoginScreen(): JSX.Element {
  const navigation = useNavigation()

  const handleSignUp = () => navigation.navigate('sign_up')

  const onKeyboardDismiss = () => Keyboard.dismiss()

  const { t } = useTranslation()

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/search_background.png')}
      style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={30}>
          <SafeAreaView style={styles.wrapper}>
            <ScrollView
              contentContainerStyle={styles.container}
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={onKeyboardDismiss}>
                <View style={styles.container}>
                  <View style={{ marginBottom: 30 }}>
                    <Text
                      style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>
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

                  <LoginSimpleForm />
                </View>

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
                      {t('Don`t have an Account')}?{' '}
                    </Text>
                    <TouchableOpacity onPress={handleSignUp}>
                      <GradientText
                        style={{
                          fontSize: 14,
                          fontWeight: '600'
                        }}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#FFCB52', '#FF7B02']}>
                        {t('Sign Up')}
                      </GradientText>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  )
}

export default LoginScreen
