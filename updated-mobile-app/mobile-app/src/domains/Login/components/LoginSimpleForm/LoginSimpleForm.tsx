import * as yup from 'yup'

import { Controller, useForm, useWatch } from 'react-hook-form'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Fragment, useState } from 'react'

import GradientText from '../../../../components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import { RootStackParamList } from '../../../../RootNavigation'
import { TextInput } from 'react-native'
import { login } from '../../../../api'
import { setUserData } from '../../../../store/auth'
import styles from './styled'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      // todo ad correct validation later
      // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/g, { message: 'No match for rules' })
      .required()
  })
  .required()

type FormData = yup.InferType<typeof schema>

function LoginSimpleForm(): JSX.Element {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleLogin = () => navigation.navigate('profile_creation')
  const handleForgotPassword = () => navigation.navigate('forgot_password')

  const [showPassword, setShowPassword] = useState(false)
  const [isMatch, setIsMatch] = useState(true)
  const [disableButton, setDisableButton] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [password] = watch(['password'])

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const inputIcon = showPassword
    ? require('../../../../../assets/icons/EyeOpen.png')
    : require('../../../../../assets/icons/EyeClose.png')

  const onSubmit = async (data: FormData) => {
    setDisableButton(true)
    const { email, password } = data
    if (isValid) {
      try {
        const res = await login({ login: email, password })

        if (res && res.user) {
          dispatch(setUserData(res.user))
        }
        setDisableButton(false)
      } catch (error) {
        setDisableButton(false)
        console.log('error', error)
      }
    }
    setDisableButton(false)
  }

  return (
    <Fragment>
      <View pointerEvents="none">
        <GradientText
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: 20
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
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 10
        }}>
        {t('Email')}
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={'Enter your email....'}
            placeholderTextColor="#686868"
            style={[styles.textInput, { marginBottom: 28 }]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 10
        }}>
        {t('Password')}
      </Text>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          marginBottom: isMatch ? 38 : 16
        }}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={!showPassword}
              style={[styles.textInput, { borderWidth: isMatch ? 0 : 1 }]}
              placeholder={`${t('Enter your password')}....`}
              placeholderTextColor="#686868"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {password?.length ? (
          <TouchableOpacity
            style={{ position: 'absolute', right: 24 }}
            onPress={handleTogglePassword}>
            <Image
              source={inputIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: showPassword ? 'white' : '#686868'
              }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      {!isMatch ? (
        <Text style={styles.errorText}>{t('Password didn’t match')}</Text>
      ) : null}

      <View style={styles.alignCenter}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.primaryButton}
          disabled={disableButton}
          activeOpacity={isValid ? 0 : 1}>
          <LinearGradient
            colors={['#FFCB52', '#FF7B02']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.buttonGradient, { opacity: isValid ? 1 : 0.4 }]}>
            {disableButton ? (
            <ActivityIndicator size={'small'} color="black" />
          ) : (
            <Text style={styles.buttonText}>{t('Confirm')}</Text>
          )}
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
            {t('Forgot password')}?
          </Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

export default LoginSimpleForm
