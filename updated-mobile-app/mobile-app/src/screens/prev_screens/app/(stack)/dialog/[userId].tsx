import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { Stack, useSearchParams } from 'expo-router'
import { getChat, getChats, sendMessage } from '../../../../../api/chat.methods'
import { useMutation, useQuery } from 'react-query'

import { BottomTabBar } from '../../../../../components/BottomTabBar'
import Camera from '../../../../assets/icons/Camera.svg'
import ChatMessage from '../../../../../components/ChatMessage'
import { Flex } from '../../../../../components/utils/styled'
import Microphone from '../../../../assets/icons/Microphone.svg'
import { QueryKey } from '../../../../../types/enum'
import { Render } from '../../../../../components/utils/Render'
import { Screen } from 'react-native-screens'
import { ScreenWrapper } from '../../../../../components/ScreenWrapper'
import Send from '../../../../assets/icons/Send.svg'
import { Text } from '../../../../../components'
import { TextInput } from '../../../../../components/TextInput'
import colors from '../../../../../constants/Colors'
import { getConnections } from '../../../../../api/connections.methods'
import { getUserById } from '../../../../../api/user.methods'
import styled from 'styled-components/native'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { userAtom } from '../../../../../state/user.atom'

const DialogScreen = () => {
  const { control, handleSubmit, setValue } = useForm()
  const { connection_id, userId } = useSearchParams<{
    connection_id: string
    userId: string
  }>()
  const { data: chatData, refetch } = useQuery(
    [QueryKey.chat, connection_id],
    getChat
  )
  const { data: chatUser } = useQuery([QueryKey.userById, userId], getUserById)
  const { mutateAsync, isLoading: isSending } = useMutation(sendMessage)
  const { messages } = chatData || {}

  const handleSend = async ({ message }: { message: string }) => {
    if (!connection_id) {
      return
    }

    await mutateAsync({
      connection_id,
      message
    })

    refetch()

    setValue('message', '')
  }

  const { bottom } = useSafeAreaInsets()

  const user = useRecoilValue(userAtom)

  useEffect(() => {
    const interval = setInterval(refetch, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleCamera = () => {}
  const handleMicrophone = () => {}

  const isSendButton = !!control?._formValues?.message

  const sendButton = () =>
    isSending ? (
      <ActivityIndicator color="white" />
    ) : (
      <TouchableOpacity onPress={handleSubmit(handleSend)}>
        <Send />
      </TouchableOpacity>
    )

  const chatActions = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleCamera} style={{ marginRight: 8 }}>
        <Camera />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMicrophone}>
        <Microphone />
      </TouchableOpacity>
    </View>
  )

  return (
    <StyledContainer>
      <Stack.Screen
        options={{
          headerTitle:
            user?.profile?.username ||
            user?.profile?.firstName + ' ' + user?.profile?.lastName
        }}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={50 + bottom}
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <StyledScroll
          contentContainerStyle={{
            padding: 15,
            paddingBottom: 0,
            flex: 1,
            justifyContent: 'flex-end'
          }}>
          {messages &&
            messages.map(el => {
              return (
                <ChatMessage
                  message={el}
                  connectionId={connection_id || ''}
                  avatar={chatUser?.profile.photos[0]}
                />
              )
            })}
        </StyledScroll>
        <Flex f={false} row>
          <StyledInput
            control={control}
            name={'message'}
            placeholder={'Send message'}
            fontFamily="Euclid-Bold"
            style={{ flex: 1 }}
            right={isSendButton ? sendButton() : chatActions()}
          />
        </Flex>
      </KeyboardAvoidingView>
    </StyledContainer>
  )
}

const StyledContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.black2};
`

const StyledScroll = styled.ScrollView`
  flex: 1;
`

const StyledInput = styled(TextInput)`
  border: 0;
  margin: 15px;
`

const StyledAvatar = styled.Image`
  height: 40px;
  width: 40px;
`

export default DialogScreen
