import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'

import CreatePassword from '../../../domains/Login/components/CreatePassword/CreatePassword'
import GradientText from '../../../components/GradientText/GradientText'
import { RootStackParamList } from '../../../RootNavigation'
import styles from './styled'
import { useTranslation } from 'react-i18next'

import React = require('react')

function CreatePasswordScreen(): JSX.Element {
  const { t } = useTranslation()

  const navigation = useNavigation()
  const {
    params: { email, remember_token }
  } = useRoute<RouteProp<RootStackParamList, 'create_password'>>()

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

  const handleSignUp = () => navigation.navigate('sign_up')

  const onKeyboardDismiss = () => Keyboard.dismiss()

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
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

          <CreatePassword email={email} remember_token={remember_token} />

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
  )
}

export default CreatePasswordScreen
