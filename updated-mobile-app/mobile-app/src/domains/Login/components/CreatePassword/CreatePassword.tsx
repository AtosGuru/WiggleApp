import { Image, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import React, { Fragment, useState } from 'react'

import GradientText from '../../../../components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import { RootStackParamList } from '../../../../RootNavigation'
import { TextInput } from 'react-native'
import { resetPassword } from '../../../../api'
import styles from './styled'
import { useTranslation } from 'react-i18next'

function CreatePassword({
  email,
  remember_token
}: {
  email?: string
  remember_token?: string
}): JSX.Element {
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  })
  const { t } = useTranslation()

  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleConfirm = async () => {
    if (email && remember_token) {
      await resetPassword({
        login: email,
        password: passwordData.password,
        password_confirmation: passwordData.confirmPassword,
        remember_token
      })

      navigation.navigate('login')
    }
  }

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1)
  }

  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2)
  }

  const inputIcon1 = showPassword1
    ? require('../../../../../assets/icons/EyeOpen.png')
    : require('../../../../../assets/icons/EyeClose.png')
  const inputIcon2 = showPassword2
    ? require('../../../../../assets/icons/EyeOpen.png')
    : require('../../../../../assets/icons/EyeClose.png')

  const primaryColors = ['#FFCB52', '#FF7B02']
  const secondaryColors = ['#686868', '#686868']

  const isContainText = /[a-zA-Z]/g.test(passwordData?.password)
  const isContainNumbers = /\d/.test(passwordData?.password)
  const isContainCapitalLetter = /[A-Z]/.test(passwordData?.password)

  const isDataValid =
    passwordData.confirmPassword.length > 0 &&
    passwordData.password.length > 0 &&
    passwordData.confirmPassword === passwordData.password &&
    isContainText &&
    isContainNumbers &&
    isContainCapitalLetter

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
          marginBottom: 38
        }}>
        {t('Create new password')}
      </Text>

      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 10
        }}>
        {t('New Password')}
      </Text>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          marginBottom: 26
        }}>
        <TextInput
          secureTextEntry={!showPassword1}
          style={styles.textInput}
          placeholderTextColor="#686868"
          onChangeText={text =>
            setPasswordData(prev => ({ ...prev, password: text }))
          }
        />
        {passwordData.password.length ? (
          <TouchableOpacity
            style={{ position: 'absolute', right: 24 }}
            onPress={handleTogglePassword1}>
            <Image
              source={inputIcon1}
              style={{
                width: 20,
                height: 20,
                tintColor: showPassword1 ? 'white' : '#686868'
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 10
        }}>
        {t('Re-enter new password')}
      </Text>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          marginBottom: 22
        }}>
        <TextInput
          secureTextEntry={!showPassword2}
          style={styles.textInput}
          placeholderTextColor="#686868"
          onChangeText={text =>
            setPasswordData(prev => ({ ...prev, confirmPassword: text }))
          }
        />
        {passwordData.confirmPassword.length ? (
          <TouchableOpacity
            style={{ position: 'absolute', right: 24 }}
            onPress={handleTogglePassword2}>
            <Image
              source={inputIcon2}
              style={{
                width: 20,
                height: 20,
                tintColor: showPassword2 ? 'white' : '#686868'
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={{ marginBottom: 16, justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{
            height: 25,
            justifyContent: "center"
          }}>
            <Image
              source={isContainText ?
                require('../../../../../assets/images/tickcircle.png') :
                require('../../../../../assets/images/tickcircleUnchecked.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <View style={{
            height: 25,
            justifyContent: "center",
            marginLeft: 4,
          }}>
            <GradientText
              style={{
                fontSize: 12,
                textAlignVertical: 'center'
              }}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={isContainText ? primaryColors : secondaryColors}
            >{t('Must Contain text')}
            </GradientText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{
            height: 25,
            justifyContent: "center"
          }}>
            <Image
              source={isContainNumbers ?
                require('../../../../../assets/images/tickcircle.png') :
                require('../../../../../assets/images/tickcircleUnchecked.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <View style={{
            height: 25,
            justifyContent: "center",
            marginLeft: 4,
          }}>
            <GradientText
              style={{
                fontSize: 12,
                textAlignVertical: 'center'
              }}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={isContainNumbers ? primaryColors : secondaryColors}>

              {t('Must Contain numbers')}
            </GradientText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{
            height: 25,
            justifyContent: "center"
          }}>
            <Image
              source={isContainCapitalLetter ?
                require('../../../../../assets/images/tickcircle.png') :
                require('../../../../../assets/images/tickcircleUnchecked.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <View style={{
            height: 25,
            justifyContent: "center",
            marginLeft: 4,
          }}>
            <GradientText
              style={{
                fontSize: 12,
                textAlignVertical: 'center'
              }}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={isContainCapitalLetter ? primaryColors : secondaryColors}>
              {t('Must Contain a capital letter')}
            </GradientText>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleConfirm}
        style={styles.primaryButton}
        activeOpacity={isDataValid ? 0 : 1}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonGradient, { opacity: isDataValid ? 1 : 0.4 }]}>
          <Text style={styles.buttonText}>{t('Confirm')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  )
}

export default CreatePassword
