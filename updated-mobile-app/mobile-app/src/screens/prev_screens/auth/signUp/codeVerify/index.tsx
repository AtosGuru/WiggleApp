import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import { Button, Text } from '../../../../components'
import {
  Link,
  Stack,
  useLocalSearchParams,
  useRouter,
  useSearchParams
} from 'expo-router'
import React, { useEffect, useState } from 'react'
import { isError, useMutation, useQuery } from 'react-query'
import {
  isRegistrationFinishedSelector,
  userAtom
} from '../../../../state/user.atom'
import { resendPin, verifyPin } from '../../../../api'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { CodeInput } from '../../../../components/CodeInput'
import Colors from '../../../../constants/Colors'
import { Feather } from '@expo/vector-icons'
import { Flex } from '../../../../components/utils/styled'
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../../../../assets/images/Logo.svg'
import MaskedView from '@react-native-masked-view/masked-view'
import { Render } from '../../../../components/utils/Render'
import { ScreenWrapper } from '../../../../components/ScreenWrapper'
import { StyledScreenWrapper } from './styled'
import { TextInput } from '../../../../components/TextInput'
import { User } from '../../../../types/user.interface'
import { useForm } from 'react-hook-form'
import { useKeyboardOpen } from '../../../../hooks/useKeyboardOpen'

export default function SignUpCode() {
  const { mutate, isSuccess, isLoading, isError, data } = useMutation(verifyPin)
  const {
    mutate: resendMutate,
    reset: resetResend,
    isSuccess: isResendSuccess,
    isLoading: isResendLoading,
    data: resendData
  } = useMutation(resendPin)
  const [pin, setPin] = useState('')
  const [codeTime, setCodeTime] = useState(120)
  const [user, setUser] = useRecoilState(userAtom)

  const params = useLocalSearchParams()
  const login = user?.phone || user?.email || params.login || ''

  const { replace } = useRouter()

  useEffect(() => {
    if (!user?.isCodeSent && !resendData) {
      // @ts-ignore
      setUser(prev => ({
        ...(prev || {}),
        isCodeSent: true
      }))
      resendMutate()
    }
  }, [resendData, user])

  useEffect(() => {
    if (pin.length >= 6) {
      mutate({ pin })
    }
  }, [pin])

  useEffect(() => {
    if (isResendSuccess) {
      setCodeTime(120)
    }
  }, [isResendSuccess])

  useEffect(() => {
    if (isError) {
      setPin('')
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      setUser(prev => ({
        ...(prev || {}),
        email_verified_at: Date.now().toString(),
        phone_verified_at: Date.now().toString()
      }))
      replace('auth/informationForm')
    }
  }, [isSuccess])

  useEffect(() => {
    const interval = setInterval(() => {
      if (codeTime > 0) {
        setCodeTime(prev => {
          if (prev > 0) return prev - 1
          return prev
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const renderCodeTime = () => {
    const minutes = Math.floor(codeTime / 60)
    const seconds = codeTime % 60
    return codeTime !== 0
      ? `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
      : ''
  }

  const handleLoginRedirect = () => {
    setUser(null)
    replace('auth/login')
  }

  const keyboardOpen = useKeyboardOpen()

  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: Colors.black }}
      imageStyle={{ opacity: 0.1 }}
      source={require('../../../../assets/images/loginBackground.png')}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle={'light-content'} />
      <StyledScreenWrapper>
        <Flex mt={10}>
          <Render if={!keyboardOpen}>
            <Logo height={100} />
          </Render>
        </Flex>
        <Text
          color={'white'}
          font={'Euclid-Medium'}
          size={22}
          lineHeight={30}
          mb={30}>
          SIGN UP
        </Text>
        <Text
          color={'white'}
          font={'Euclid-SemiBold'}
          size={16}
          lineHeight={20}
          mb={15}>
          Enter your 6-digit code
        </Text>
        <Text
          color={'white'}
          font={'Euclid-Medium'}
          size={13}
          lineHeight={14}
          mb={15}>
          Your code was sent to{' '}
          <Text size={13} font={'Euclid-Medium'} color={'white'}>
            {login}
          </Text>
        </Text>
        <CodeInput length={6} onChange={setPin} value={pin} />
        <Flex f={null} row spaceBetween pb={40} style={{ width: '100%' }}>
          <Text color={Colors.white}>
            Send code again:{' '}
            <Text color={Colors.white} font={'Euclid-SemiBold'}>
              {renderCodeTime()}
            </Text>
          </Text>
          <Render if={isResendLoading}>
            <ActivityIndicator color={Colors.white} />
          </Render>
          <Render if={!isResendLoading}>
            <Pressable onPress={() => codeTime <= 0 && resendMutate()}>
              <Flex row>
                <Text color={codeTime <= 0 ? Colors.white : Colors.white5}>
                  Send code
                </Text>
                <Feather
                  name="chevron-right"
                  size={24}
                  color={codeTime <= 0 ? Colors.white : Colors.white5}
                />
              </Flex>
            </Pressable>
          </Render>
        </Flex>
        <Button.Gradient
          onPress={() => (pin.length >= 6 ? mutate({ pin }) : null)}
          valid={pin.length >= 6}
          loading={isLoading}>
          Continue
        </Button.Gradient>
        <Flex justifyEnd bottom={10}>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Flex alignEnd row>
              <Text color={'white'} mr={3}>
                Have an account?
              </Text>
              <Text.Gradient>Log In</Text.Gradient>
            </Flex>
          </TouchableOpacity>
        </Flex>
      </StyledScreenWrapper>
    </ImageBackground>
  )
}
