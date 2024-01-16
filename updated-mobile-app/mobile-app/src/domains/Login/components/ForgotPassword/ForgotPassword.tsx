import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { Fragment, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import GradientText from '../../../../components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import { RootStackParamList } from '../../../../RootNavigation'
import { TextInput } from 'react-native'
import { sendRecoveryPin } from '../../../../api'
import styles from './styled'
import { useTranslation } from 'react-i18next'

function ForgotPassword(): JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [email, setEmail] = useState('')
  const handleVerify = async () => {
    try {
      await sendRecoveryPin({ login: email })
      navigation.navigate('verify_email', {
        forgotPassMode: true,
        email: email
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const { t } = useTranslation()

  return (
    <Fragment>
      <View pointerEvents="none">
        <GradientText
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: 14
          }}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#FFCB52', '#FF7B02']}>
          {t('Log in')}
        </GradientText>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 74
        }}>
        {t('Forgot Password')}
      </Text>

      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 14
        }}>
        {t('Enter your email')}
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontWeight: '600',
          marginBottom: 17
        }}>
        {t('A six-digit verification code will be sent to your email')}
      </Text>

      <TextInput
        placeholder={`${t('Enter your email')}....`}
        placeholderTextColor="#686868"
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity onPress={handleVerify} style={styles.primaryButton}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}>
          <Text style={styles.buttonText}>{t('Forgot password')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  )
}

export default ForgotPassword
