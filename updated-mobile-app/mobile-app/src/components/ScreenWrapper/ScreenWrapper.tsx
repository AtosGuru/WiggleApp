import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  StatusBar
} from 'react-native'
import {
  StylableSafeAreaView,
  StyledSafeAreaView,
  StyledScrollView
} from './styled'

import React from 'react'
import { StylableProps } from '../utils/styled'
import { useKeyboardOpen } from '../../../hooks/useKeyboardOpen'

interface ScreenWrapperProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  scroll?: boolean
}

export function ScreenWrapper({
  children,
  ...props
}: ScreenWrapperProps & StylableProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={30}>
      <StatusBar barStyle={'light-content'} />
      <StylableSafeAreaView {...props}>{children}</StylableSafeAreaView>
    </KeyboardAvoidingView>
  )
}
