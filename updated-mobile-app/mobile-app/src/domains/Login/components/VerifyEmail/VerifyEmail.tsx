import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field'
import React, { Fragment, useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { verifyPin, verifyRecoveryPin } from '../../../../api'

import GradientText from '../../../../components/GradientText/GradientText'
import LinearGradient from 'react-native-linear-gradient'
import Timer from '../../../../components/Timer'
import { getUser } from '../../../../api/user.methods'
import { setUserData } from '../../../../store/auth'
import styles from './styled'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

const CELL_COUNT = 6

function VerifyEmail(props: {
  email?: string | null
  onConfirm?: (remember_token?: string) => void
  isSignUp: boolean
}): JSX.Element {
  const { email, isSignUp, onConfirm } = props
  const dispatch = useDispatch()
  
  const [value, setValue] = useState('')
  const [isTimerEnded, setIsTimerEnded] = useState(false)
  const [disableButton, setDisableButton] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [inputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })
  const isSubmitButtonActive = value?.length === 6 && !isTimerEnded
  const { t } = useTranslation()

  const handleConfirm = async () => {
    setDisableButton(true)
    try {
      if (email && !isSignUp) {
        const res = await verifyRecoveryPin({ pin: value, login: email })

        return onConfirm?.(res?.remember_token)
      }
      if (isSignUp) {
        await verifyPin({ pin: value })
        const userRes = await getUser()
        if (userRes && userRes?.id) {
          dispatch(setUserData(userRes))
          setDisableButton(false)
          return onConfirm?.()
        }
      }
      setDisableButton(false)
    } catch (error) {
      setDisableButton(false)
      console.log('error', error)
    }
  }

  return (
    <Fragment>
      {isSignUp ? (
        <View pointerEvents="none">
          <GradientText
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 24
            }}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#FFCB52', '#FF7B02']}>
            {t('Create an Account')}
          </GradientText>
        </View>
      ) : (
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
            {t('Verify Email')}
          </Text>
        </Fragment>
      )}

      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 14
        }}>
        {t('Enter your 6 digit code')}
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontWeight: '600',
          marginBottom: 17
        }}>
        {`${t('Your code was sent to')} ${email}`}
      </Text>

      <CodeField
        ref={ref}
        {...inputProps}
        value={value}
        caretHidden={false}
        onChangeText={setValue}
        autoFocus
        cellCount={CELL_COUNT}
        keyboardType="default"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <TextInput
            key={index}
            autoCapitalize={'none'}
            style={{
              height: 46,
              width: 52,
              backgroundColor: 'rgba(104, 104, 104, 1)',
              borderRadius: 4,
              fontSize: 16,
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </TextInput>
        )}
      />

      <Timer
        setIsTimerEnded={setIsTimerEnded}
        changeCode={setValue}
        seconds={60}
      />

      <TouchableOpacity
        onPress={handleConfirm}
        disabled={disableButton}
        style={styles.primaryButton}
        activeOpacity={isSubmitButtonActive ? 0 : 1}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.buttonGradient,
            { opacity: isSubmitButtonActive ? 1 : 0.4 }
          ]}>
          {disableButton ? (
            <ActivityIndicator size={'small'} color="black" />
          ) : (
            <Text style={styles.buttonText}>{t('Confirm')}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  )
}

export default VerifyEmail
