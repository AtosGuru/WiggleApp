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
import {
  isRegistrationFinishedSelector,
  userAtom
} from '../../../../state/user.atom'
import { login, resendPin, verifyPin, verifyRecoveryPin } from '../../../../api'
import { useMutation, useQuery } from 'react-query'

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
import { useSetRecoilState } from 'recoil'

export default function PasswordRecoveryCode() {
  const { mutate, isSuccess, data, isLoading, isError } =
    useMutation(verifyRecoveryPin)

  const {
    mutate: resetMutate,
    isSuccess: isResetSuccess,
    isLoading: isResetLoading
  } = useMutation(resendPin)
  const [pin, setPin] = useState('')
  const setFinishedRegistration = useSetRecoilState(
    isRegistrationFinishedSelector
  )
  const { login = '' } = useLocalSearchParams()
  const [codeTime, setCodeTime] = useState(120)

  const router = useRouter()

  useEffect(() => {
    if (isResetSuccess) {
      setCodeTime(120)
    }
  }, [isResetSuccess])

  useEffect(() => {
    if (pin.length >= 6) {
      mutate({ pin, login: login as string })
    }
  }, [pin])

  useEffect(() => {
    if (isError) {
      setPin('')
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      router.push({
        pathname: '/auth/passwordRecovery/passwordChange',
        params: { login, remember_token: data.remember_token }
      })
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
          <Render>
            <Logo height={100} />
          </Render>
        </Flex>
        <Text
          color={'white'}
          font={'Euclid-Medium'}
          size={22}
          lineHeight={30}
          mb={36}>
          CHANGE PASSWORD
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
          <Render if={isResetLoading}>
            <ActivityIndicator color={Colors.white} />
          </Render>
          <Render if={!isResetLoading}>
            <Pressable onPress={() => codeTime <= 0 && resetMutate()}>
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
          onPress={() =>
            pin.length >= 6 ? mutate({ pin, login: login as string }) : null
          }
          valid={pin.length >= 6}
          loading={isLoading}>
          Continue
        </Button.Gradient>
        <Flex justifyEnd bottom={10}>
          <Link href={'auth/login'} replace>
            <Flex alignEnd row>
              <Text color={'white'} mr={3}>
                Have an account?
              </Text>
              <Text.Gradient>Log In</Text.Gradient>
            </Flex>
          </Link>
        </Flex>
      </StyledScreenWrapper>
    </ImageBackground>
  )
}
