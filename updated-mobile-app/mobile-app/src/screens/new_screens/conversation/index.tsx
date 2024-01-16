import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  NativeEventEmitter,
  NativeModules,
  LogBox
} from 'react-native'
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useFocusEffect,
  useCallback
} from 'react'
import Toast from 'react-native-toast-message'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  launchCamera,
  launchImageLibrary,
  MediaType
} from 'react-native-image-picker'
import moment from 'moment'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import {
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar
} from 'react-native-gifted-chat'
import { firebase } from '@react-native-firebase/database'
import Hyperlink from 'react-native-hyperlink'

import { RootStackParamList } from '../../../RootNavigation'
import { QueryKey } from '../../../types/enum'
import { getChat, sendMessage } from '../../../api/chat.methods'
import { getUserById } from '../../../api/user.methods'
import { ConversationMessage } from '../../../types/conversation.interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { imageUpload } from '../../../api/images.methods'
import {
  updateReadStatus,
  newChatConnection,
  addComment,
  addMessage
} from '../../../api/connections.methods'
import { ConnectionType } from '../../../types/enum'

import { twilioAccessToken } from '../../../api/user.methods'
import { getEventById } from '../../../api/events.methods'

import styles from './styled'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import { Loading } from '../../../components/Loading'
import {
  deleteStoryThunk,
  fetchStoriesThunk,
  postStoryThunk
} from '../../../store/thunks/fetchStoriesThunk'
import { videoUpload } from '../../../api/video.methods'

import TextMessage from './TextMessage'
import StoryMessage from './StoryMessage'
import EventMessage from './EventMessage'

const { height, width } = Dimensions.get('screen')

type DisplayData = {
  title: string
  location: string
  date: string
  time: string
  about: string
  rating: number | string
}

const ConversationScreen = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'conversation'>>()
  const user = useSelector((root: RootState) => root.auth.user)

  const chatIdToUpdate = useSelector((root: RootState) => root.auth.updateChat)
  const textInputRef = useRef<TextInput | null>(null)
  const messageContainerRef = useRef<FlatList<IMessage>>(null)
  const {
    params: { userId, openPickerOnMount, pretypedText, pathId }
  } = useRoute<RouteProp<RootStackParamList, 'conversation'>>()

  const { stories } = useSelector((root: RootState) => root.stories)

  const [messages, setMessages] = useState<IMessage[]>([])
  const lastMessageId = useRef<number | null>(null)

  const [inputText, setInputText] = useState('')
  const [isKeyboardShow, setIsKeyboardShow] = useState(false)

  const { data: chatUser } = useQuery([QueryKey.userById, userId], getUserById)

  const [isJoinConversation, setIsJoinConversation] = useState(false)

  const [allMessages, setAllMessages] = useState<IMessage[]>([])

  const [picker, setPicker] = useState(false)

  const [isLoadingSendMessage, setIsLoadingSendMessage] = useState(false)

  useEffect(() => {
    //@ts-ignore

    dispatch(fetchStoriesThunk())
  }, [])

  useEffect(() => {
    if (openPickerOnMount && userId) {
      openStoriesCamera()
    }
  }, [userId])

  useEffect(() => {
    if (pretypedText !== undefined) {
      sendEventMessage()
    }
  }, [])

  useEffect(() => {
    console.log('userID.toString:     ===', userId.toString())
    if (Platform.OS === 'ios') {
      NativeModules.Conversations.joinConversationWith(
        'joinConversationWith',
        userId.toString()
      )
    } else {
      NativeModules.Conversations.joinConversationWith(userId.toString())
    }
  }, [])

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.Conversations)
    let eventListener = eventEmitter.addListener(
      'JoinEventReminder',
      event => {}
    )

    let setAllMessagesReadListner = eventEmitter.addListener(
      'SetAllMessagesReadListner',
      event => {}
    )

    let createNewConversationListener = eventEmitter.addListener(
      'CreatedConversationWithParticipant',
      event => {
        handleAddParticipant()
      }
    )

    let sendEventMessageListener = eventEmitter.addListener(
      'SendEventMessageStatus',
      event => {
        //@ts-ignore
        setMessages(prev => [
          {
            _id: event.id,
            id: event.id,
            sender: user?.id == event.user ? 'user1' : 'user2',
            text: '',
            type: 'event',
            createdAt: moment(event.createdAt).toDate(),
            updated_at: moment(event.updatedAt).toDate(),
            image_id: event.storyImgUrl,
            storyId: event.storyId,
            eventId: event.eventId,
            comments: [],
            user: {
              _id: user?.id == event.user ? 'user1' : 'user2'
            }
          },
          ...prev.filter(temp => {
            return temp.image_id !== 'photo'
          })
        ])
      }
    )

    let createdCommentListener = eventEmitter.addListener(
      'CreatedCommentStatus',
      event => {
        console.log('CreatedCommentStatus:   ', event)

        setMessages(prev => [
          ...prev.map(message => ({
            _id: message.id,
            id: message.id,
            sender: message.sender,
            text: message.text,
            createdAt: message.createdAt,
            type: message.type,
            image_id: message.image_id,
            storyId: message.storyId,
            eventId: message.eventId,
            comments:
              event.storyId == message.storyId ? [event] : message.comments,
            user: {
              _id: user?.id == message.user ? 'user1' : 'user2'
            }
          }))
        ])
        handleAddComment(event.storyId, event.id)
      }
    )

    let sendMessageWithImageStatusListener = eventEmitter.addListener(
      'SendMessageWithImageStatus',
      event => {
        setMessages(prev => [
          {
            _id: event.id,
            id: event.id,
            sender: user?.id == event.user ? 'user1' : 'user2',
            text: '',
            type: 'photo',
            createdAt: moment(event.createdAt).toDate(),
            updated_at: moment(event.updatedAt).toDate(),
            image_id: event.storyImgUrl,
            eventId: event.eventId,
            storyId: event.storyId,
            comments: [],
            user: {
              _id: user?.id == event.user ? 'user1' : 'user2'
            }
          },
          ...prev.filter(temp => {
            return temp.image_id !== 'photo'
          })
        ])
      }
    )

    let sendMessageStatusListener = eventEmitter.addListener(
      'SendMessageStatus',
      event => {
        console.log('SendMessageStatus:  ', event)
        setIsLoadingSendMessage(false)
        setMessages(prev => [
          {
            _id: event.id,
            id: event.id,
            sender: user?.id == event.user ? 'user1' : 'user2',
            text: event.message,
            createdAt: moment(event.createdAt).toDate(),
            updated_at: moment(event.updatedAt).toDate(),
            type: 'text',
            image_id: '',
            user: {
              _id: user?.id == event.user ? 'user1' : 'user2'
            }
          },
          ...prev
        ])
      }
    )

    let receivedMessageStatusListener = eventEmitter.addListener(
      'ReceivedMessageStatus',
      event => {
        console.log('ReceivedMessageStatus: ', event)
        if (event.category === 'comment') {
          setMessages(prev => [
            ...prev.map(message => ({
              _id: message.id,
              id: message.id,
              sender: message.sender,
              text: message.text,
              createdAt: message.createdAt,
              type: message.type,
              image_id: message.image_id,
              storyId: message.storyId,
              eventId: message.eventId,
              comments:
                event.storyId == message.storyId ? [event] : message.comments,
              user: {
                _id: user?.id == message.user ? 'user1' : 'user2'
              }
            }))
          ])
        } else {
          setMessages(prev => [
            {
              _id: event.id,
              id: event.id,
              sender: user?.id == event.user ? 'user1' : 'user2',
              text: event.message,
              createdAt: moment(event.createdAt).toDate(),
              updated_at: moment(event.updatedAt).toDate(),
              type:
                event.category === ''
                  ? 'text'
                  : event.category === 'story'
                  ? 'photo'
                  : 'event',
              image_id: event.storyImgUrl,
              storyId: event.storyId,
              eventId: event.eventId,
              comments: [],
              user: {
                _id: user?.id == event.user ? 'user1' : 'user2'
              }
            },
            ...prev
          ])
        }
      }
    )

    let previousMessagesListner = eventEmitter.addListener(
      'PreviousMessages',
      (event: Object) => {
        const commentsData = event.allMessages.filter(
          message => message.category === 'comment'
        )
        const restData = event.allMessages.filter(
          message =>
            message.category !== 'comment' ||
            (message.category === 'event' && message.eventId !== '')
        )

        setMessages(
          //@ts-ignore
          restData
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map(message => ({
              _id: message.id,
              id: message.id,
              sender: user?.id == message.user ? 'user1' : 'user2',
              text: message.message,
              createdAt: moment(event.createdAt).toDate(),
              type:
                message.category === ''
                  ? 'text'
                  : message.category === 'story'
                  ? 'photo'
                  : 'event',
              image_id: message.storyImgUrl,
              storyId: message.storyId,
              eventId: message.eventId,
              comments: commentsData.filter(
                comment => comment.storyId === message.storyId
              ),
              user: {
                _id: user?.id == message.user ? 'user1' : 'user2'
              }
            }))
        )

        setIsJoinConversation(true)
      }
    )

    // Removes the listener once unmounted
    return () => {
      eventListener.remove()
      previousMessagesListner.remove()
      sendMessageStatusListener.remove()
      sendMessageWithImageStatusListener.remove()
      receivedMessageStatusListener.remove()
      createNewConversationListener.remove()
      createdCommentListener.remove()
      sendEventMessageListener.remove()
      setAllMessagesReadListner.remove()
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
    }
  }, [isJoinConversation])

  const handleAddParticipant = async () => {
    try {
      await newChatConnection({
        type: ConnectionType.MESSAGE,
        partner_id: userId.toString()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddComment = async (storyId, commentId) => {
    try {
      await addComment({
        id: storyId.toString(),
        twilio_message_id: commentId.toString()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddMessage = async (partnerId, message) => {
    try {
      await addMessage({
        partner_id: partnerId,
        type: 'text',
        message: message
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleBack = () => {
    if (!isLoadingSendMessage) {
      NativeModules.Conversations.setAllMessageRead('setAllMessageRead', 'read')
      navigation.goBack()
    }
  }
  const onPressUserName = () => {
    if (pathId !== undefined) {
    }
  }

  const addLoadingMessage = (text?: string) => {
    setIsLoadingSendMessage(true)
    handleAddMessage(userId, text)

    if (Platform.OS === 'ios') {
      NativeModules.Conversations.sendMessage('sendMessage', text)
    } else {
      const urlPattern =
        '/^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$/gm'

      if (text.includes('http')) {
        NativeModules.Conversations.sendMessage(pathId + '_' + text)
      } else {
        NativeModules.Conversations.sendMessage(text)
      }
    }
  }

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return
    addLoadingMessage(inputText)
    const textToSend = inputText
    setInputText('')

    return
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  const sendEventMessage = async () => {
    //@ts-ignore
    setMessages(prev => [
      {
        _id: `loading${prev.length}`,
        sender: 'user1',
        text: '',
        type: 'event',
        eventId: pathId === undefined ? '' : pathId,
        image_id: 'photo',
        comments: [],
        user: {
          _id: 'user1'
        }
      },
      ...prev
    ])

    if (Platform.OS === 'ios') {
      NativeModules.Conversations.sendEventMessage(
        'sendEventMessage',
        pathId.toString()
      )
    } else {
      NativeModules.Conversations.sendEventMessage(pathId)
    }
  }

  const openStoriesCamera = async (params: MediaType) => {
    if (user?.profile.stories?.length > 4) {
      return
    }
    try {
      const cameraResult: any = await launchCamera({
        mediaType: params,
        durationLimit: 15
      })
      setPicker(false)
      if (cameraResult.didCancel) {
        return
      }
      if (cameraResult.errorMessage) {
        return showToast('error', cameraResult.errorMessage)
      }
      if (cameraResult.assets && cameraResult.assets.length > 0) {
        if (cameraResult?.assets[0].type == 'video/mp4') {
          const url = await videoUpload(cameraResult?.assets[0].uri)
          if (url) {
            //@ts-ignore
            dispatch(postStoryThunk(url))
          }
        } else {
          setMessages(prev => [
            {
              _id: `loading${prev.length}`,
              sender: 'user1',
              text: '',
              type: 'photo',
              image_id: 'photo',
              comments: [],
              user: {
                _id: 'user1'
              }
            },
            ...prev
          ])
          const url = await imageUpload(cameraResult?.assets[0].uri)
          if (url) {
            if (Platform.OS === 'ios') {
              NativeModules.Conversations.sendMessageWithImage(
                'sendMessageWithImage',
                url,
                convertImgToLink(url)
              )
            } else {
              NativeModules.Conversations.sendMessageWithImage(
                url,
                convertImgToLink(url)
              )
            }
          }
        }
      }
    } catch (error) {
      setPicker(false)
      console.error('An error occurred:', error)
    }
  }

  const showToast = (type: string, text: string) => {
    Toast.show({
      type,
      text1: text
    })
  }

  const _onClose = async () => {
    console.log('on closed')

    const storyId = await AsyncStorage.getItem('storyId')
    const messageBody = await AsyncStorage.getItem('messageBody')
    if (Platform.OS === 'ios') {
      NativeModules.Conversations.sendComment(
        'sendComment',
        messageBody,
        storyId
      )
    } else {
      NativeModules.Conversations.sendComment(messageBody, storyId)
    }
  }

  const [responderFlag, setResponderFlag] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState('')
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown')
      setResponderFlag(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden')
      setResponderFlag(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/search_background.png')}
      style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
          <ActivityIndicator
            style={{ position: 'absolute', bottom: 10, right: 10 }}
            size={'small'}
            color={'black'}
          />
        {!isJoinConversation ? (
          <Loading fill />
        ) : (
          <>
            <View
              style={{
                width,
                height,
                position: 'absolute',
                backgroundColor: '#0F0F0F'
              }}>
              <FastImage
                source={require('../../../../assets/images/eventBackground.png')}
                style={{ width, height }}
              />
            </View>
            <View style={{ flex: 1 }}>
              {/* Header */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60,
                  paddingHorizontal: 20
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    zIndex: 20,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                  <TouchableOpacity onPress={handleBack} style={{ padding: 5 }}>
                    <FastImage
                      source={require('../../../../assets/icons/ArrowLeft.png')}
                      style={{
                        width: 24,
                        height: 24
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 15 }}
                    onPress={onPressUserName}>
                    <Text numberOfLines={1} style={styles.headerName}>
                      {chatUser?.profile.firstName} {chatUser?.profile.lastName}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 5 }} onPress={handleOpen}>
                    <FastImage
                      source={require('../../../../assets/icons/Dots.png')}
                      style={{
                        width: 26,
                        height: 6
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <KeyboardAvoidingView style={{ flex: 1 }}>
                <GiftedChat
                  messageContainerRef={messageContainerRef}
                  removeClippedSubviews={false}
                  messages={messages}
                  infiniteScroll
                  onScroll={e => console.log('e.nativeEvent.contentOffset.y')}
                  user={{
                    _id: 'user1'
                  }}
                  messagesContainerStyle={{ paddingBottom: 40 }}
                  renderMessage={message => {
                    return message.currentMessage?.type === 'photo' ? (
                      <StoryMessage
                        message={message.currentMessage}
                        onCloseComment={_onClose}
                      />
                    ) : message.currentMessage.type === 'text' ? (
                      <TextMessage
                        data={message.currentMessage}
                        isLoading={isLoadingSendMessage}
                      />
                    ) : (
                      <EventMessage
                        message={message.currentMessage}
                        key={message.currentMessage?._id}
                      />
                    )
                  }}
                  renderInputToolbar={props => (
                    <InputToolbar
                      {...props}
                      accessoryStyle={{ backgroundColor: '#fff' }}
                      containerStyle={{
                        borderRadius: 15,
                        backgroundColor: '#252525',
                        borderTopWidth: 0,
                        marginHorizontal: 32,
                        marginBottom: Platform.OS === 'ios' ? 5 : 0,
                        height: 60,
                        position:
                          Platform.OS === 'ios' ? 'relative' : 'absolute',
                        bottom: Platform.OS === 'ios' ? 0 : 10
                      }}
                      renderSend={() => (
                        <View
                          style={{
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                          {inputText.trim().length !== 0 ? (
                            <TouchableOpacity
                              style={{ marginRight: 12 }}
                              onPress={handleSendMessage}>
                              <FastImage
                                source={require('../../../../assets/icons/sendChat.png')}
                                style={{
                                  width: 24,
                                  height: 24
                                }}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{ marginRight: 12 }}
                              onPress={() => {
                                openStoriesCamera('photo')
                              }}>
                              <FastImage
                                source={require('../../../../assets/icons/chatCamera.png')}
                                style={{
                                  width: 24,
                                  height: 24
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                      renderComposer={composerProps => (
                        <Composer
                          {...composerProps}
                          placeholder={t('Send Message')}
                          composerHeight={Platform.OS === 'ios' ? 48 : 60}
                          multiline={false}
                          textInputAutoFocus={Boolean(
                            pretypedText && pretypedText.length > 0
                          )}
                          textInputProps={{
                            onSubmitEditing: handleSendMessage,
                            value: inputText,
                            onChangeText: setInputText
                          }}
                          textInputStyle={{
                            flex: 1,
                            borderRadius: 15,
                            color: '#fff',
                            fontSize: 16,
                            fontFamily: 'LeagueSpartan-Regular'
                          }}
                        />
                      )}
                    />
                  )}
                />
              </KeyboardAvoidingView>
            </View>
          </>
        )}
        <ActionModal onCloseAction={handleClose} visible={isModalOpen} />
      </SafeAreaView>
    </ImageBackground>
  )
}

const ActionModal = props => {
  const { visible, onCloseAction, userId, isDating, uuid } = props
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'chat'>>()

  const { t } = useTranslation()

  const handleOpenProfile = () => {
    if (isDating) {
      navigation.navigate('dating_profile', { id: uuid, openFromChat: true })
    } else {
      navigation.navigate('profile', { user_id: userId })
    }
    onCloseAction()
  }

  const handleBlock = async () => {
    onCloseAction()
  }
  const handleReport = () => {
    // Report
    onCloseAction()
    navigation.navigate('support', { isReport: true })
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCloseAction}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.alertContainer}>
              <TouchableOpacity
                onPress={handleBlock}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <FastImage
                  source={require('../../../../assets/icons/BlockUser.png')}
                  style={{
                    width: 16,
                    height: 20,
                    marginRight: 10
                  }}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}>
                  {t('Block User')}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#686868',
                  height: 1,
                  marginVertical: 16
                }}
              />
              <TouchableOpacity
                onPress={handleReport}
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 4
                }}>
                <FastImage
                  source={require('../../../../assets/icons/Report.png')}
                  style={{
                    width: 18,
                    marginRight: 10,
                    height: 18
                  }}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}>
                  {t('Report a problem')}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ConversationScreen
