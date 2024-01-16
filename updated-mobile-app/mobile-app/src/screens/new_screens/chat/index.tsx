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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
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
import { ChatMessage } from '../../../types/chat.interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { imageUpload } from '../../../api/images.methods'
import { updateReadStatus } from '../../../api/connections.methods'

import styles from './styled'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { height, width } = Dimensions.get('screen')

const ChatScreen = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'chat'>>()
  const user = useSelector((root: RootState) => root.auth.user)
  const chatIdToUpdate = useSelector((root: RootState) => root.auth.updateChat)
  const textInputRef = useRef<TextInput | null>(null)
  const messageContainerRef = useRef<FlatList<IMessage>>(null)
  const {
    params: { connection_id, userId, openPickerOnMount, pretypedText }
  } = useRoute<RouteProp<RootStackParamList, 'chat'>>()

  const [messages, setMessages] = useState<IMessage[]>([])
  const lastMessageId = useRef<number | null>(null)

  const [inputText, setInputText] = useState('')
  const [isKeyboardShow, setIsKeyboardShow] = useState(false)
  const RTDatabase = firebase
    .app()
    .database(
      'https://wiggleapp-85eb7-default-rtdb.europe-west1.firebasedatabase.app/'
    )
  const reference = RTDatabase.ref(`chatList/${connection_id}`)

  const {
    data: chatData,
    refetch,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: [QueryKey.chat, connection_id],
    queryFn: ({ meta, queryKey, pageParam }) =>
      getChat({ queryKey, meta, pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.meta.current_page < lastPage.meta.last_page) {
        return lastPage.meta.current_page + 1
      }
    }
  })

  const { data: chatUser } = useQuery([QueryKey.userById, userId], getUserById)
  const { mutateAsync } = useMutation(sendMessage)

  useEffect(() => {
    if (chatData?.pages) {
      let allMessages: ChatMessage[] = []

      chatData.pages.forEach(item => {
        if (item.messages && item.messages.length > 0) {
          allMessages = [...allMessages, ...item.messages]
        }
      })

      if (allMessages.length > 0) {
        lastMessageId.current = allMessages[0].id
      }

      setMessages(
        allMessages.map(
          ({
            id,
            message,
            user_id,
            image_id,
            created_at,
            updated_at
          }: ChatMessage) => ({
            _id: id,
            id: id,
            sender: user?.id === user_id ? 'user1' : 'user2',
            createdAt: moment(created_at).toDate(),
            updated_at,
            text: message,
            type: image_id ? 'photo' : 'text',
            image_id,
            user: {
              _id: user?.id === user_id ? 'user1' : 'user2'
            }
          })
        )
      )
    }
  }, [chatData])

  useEffect(() => {
    if (pretypedText) {
      setInputText(pretypedText)
    }

    const onValueChange = reference.on('value', snapshot => {
      const res = snapshot.val()

      if (
        lastMessageId.current !== null ||
        res?.lastMessageId !== lastMessageId.current
      ) {
        refetch()
      }
    })
    return () =>
      RTDatabase.ref(`chatList/${connection_id}`).off('value', onValueChange)
  }, [connection_id])

  useEffect(() => {
    if (messages && messages.length > 0) {
      const lastMessage = messages[0]
      if (lastMessage && lastMessage?.updated_at) {
        updateReadStatus({
          connection_id: connection_id,
          updated_at: lastMessage?.updated_at
        })
      }
    }
  }, [messages])

  useEffect(() => {
    if (openPickerOnMount && connection_id && userId) {
      handleOpenImagePicker()
    }
  }, [connection_id, userId])

  useEffect(() => {
    const keyboardShowSub = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShow(true)
    })
    const keyboardHideSub = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShow(false)
    })

    return () => {
      keyboardShowSub.remove()
      keyboardHideSub.remove()
    }
  }, [])

  const isAccepted = true

  const addLoadingMessage = (text?: string) => {
    setMessages(prev => [
      {
        _id: `loading${prev.length}`,
        sender: 'user1',
        createdAt: new Date(),
        updated_at: new Date(),
        text: text ?? '',
        type: 'loading',
        user: {
          _id: 'user1'
        }
      },
      ...prev
    ])
  }

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return
    addLoadingMessage(inputText)
    const textToSend = inputText
    setInputText('')

    if (!connection_id) {
      return
    }

    const res = await mutateAsync({
      connection_id: String(connection_id),
      message: textToSend
    })

    if (res?.data?.id) {
      reference.set({ lastMessageId: res?.data?.id })
    }
  }

  const handleBack = () => navigation.goBack()

  const onPressUserName = () => {
    navigation.navigate('profile', { user_id: userId })
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  const handleOpenImagePicker = async () => {
    await launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false
      },
      async response => {
        if (response.didCancel) {
          // User cancelled image picker
          console.error('Image picker cancelled')
        } else if (response?.error) {
          // ImagePicker error
          console.error('ImagePicker Error: ', response?.error)
        } else if (response.assets && response.assets?.length > 0) {
          const image = response.assets[0]

          if (image && image.uri) {
            const imageUploadId = await imageUpload(image.uri, true)

            if (!connection_id || !imageUploadId) {
              return
            }

            await mutateAsync({
              connection_id: String(connection_id),
              message: '',
              image_id: imageUploadId
            })

            reference.set({ update: true })
          }
        }
      }
    )
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/search_background.png')}
      style={styles.background}>

      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
                <Text
                  numberOfLines={1}
                  style={styles.headerName}>
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
              messages={messages}
              infiniteScroll
              onLoadEarlier={fetchNextPage}
              user={{
                _id: 'user1'
              }}
              messagesContainerStyle={{ paddingBottom: 60 }}
              renderMessage={ message  => {
                return message.currentMessage?.image_id ? (
                  <PhotoMessage data={message.currentMessage} />
                ) : (
                  <TextMessage
                    data={message.currentMessage}
                    isLoading={message.currentMessage?.type === 'loading'}
                  />
                )
              }}
              renderInputToolbar={props => (
                <InputToolbar
                  {...props}
                  containerStyle={{
                    borderRadius: 15,
                    backgroundColor: '#252525',
                    borderTopWidth: 0,
                    marginHorizontal: 32,
                    marginBottom: 36,
                    height: 70,
                    position: "relative",
                    bottom: 50
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
                          onPress={handleOpenImagePicker}>
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
                      composerHeight={Platform.OS === 'ios' ? 58 : 70}
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
                        color: '#686868',
                        fontSize: 13,
                        fontFamily: 'LeagueSpartan-Regular'
                      }}
                    />
                  )}
                />
              )}
            />
          </KeyboardAvoidingView>

        </View>
        <ActionModal onClose={handleClose} visible={isModalOpen} />
      </SafeAreaView>
    </ImageBackground>
  )
}

const LoadingMessage = () => {
  return (
    <View
      style={{
        padding: 6,
        alignSelf: 'flex-end'
      }}>
      <View
        style={{
          padding: 8,
          borderRadius: 8
        }}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderRadius: 8,
            maxWidth: width * 0.7
          }}>
          <ActivityIndicator size={'large'} color="black" />
        </LinearGradient>
      </View>
    </View>
  )
}

const TextMessage = ({ data, isLoading = false }) => {
  const handleLink = async (url: string) => {
    if (url) {
      Linking.openURL(url)
    }
  }

  return (
    <View
      style={{
        padding: 6,
        alignSelf: data.sender === 'user1' ? 'flex-end' : 'flex-start'
      }}>
      <View
        style={{
          padding: 8,
          borderRadius: 8
        }}>
        <LinearGradient
          colors={
            data.sender === 'user1'
              ? ['#FFCB52', '#FF7B02']
              : ['#252525', '#252525']
          }
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderRadius: 8,
            maxWidth: width * 0.7
          }}>
          <Hyperlink linkStyle={{ fontWeight: 'bold' }} onPress={handleLink}>
            <Text
              style={[{
                color: data.sender === 'user1' ? '#000000' : '#ffffff'
              }, styles.textMessageStyle]}>
              {data.text}
            </Text>
          </Hyperlink>
        </LinearGradient>
        {isLoading && (
          <ActivityIndicator
            style={{ position: 'absolute', bottom: 10, right: 10 }}
            size={'small'}
            color={'black'}
          />
        )}
      </View>
    </View>
  )
}

const PhotoMessage = ({ data }) => {
  const isViewed = false
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpen = () => setIsModalOpen(true)
  const onClose = () => setIsModalOpen(false)

  const { t } = useTranslation()

  return (
    <View
      style={{
        padding: 6,
        alignSelf: data.sender === 'user1' ? 'flex-end' : 'flex-start'
      }}>
      <View
        style={{
          padding: 8,
          borderRadius: 8
        }}>
        <LinearGradient
          colors={
            data.sender === 'user1'
              ? ['#FFCB52', '#FF7B02']
              : ['#252525', '#252525']
          }
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            maxWidth: width * 0.7
          }}>
          <TouchableOpacity
            onPress={onOpen}
            activeOpacity={1}
            disabled={isViewed}
            style={{
              padding: 5,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              opacity: isViewed ? 0.3 : 1
            }}>
            <FastImage
              resizeMode="cover"
              source={{
                uri: `https://imagedelivery.net/wXG-Ds-607bgN2v8An8cmw/${data?.image_id}/Profile`
              }}
              style={{
                width: '100%',
                height: 150
              }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <PhotoModal
        visible={isModalOpen}
        onClose={onClose}
        photoSource={convertImgToLink(data?.image_id)}
      />
    </View>
  )
}

type PhotoModalProps = {
  visible: boolean
  onClose: () => void
  photoSource: string
}

export const PhotoModal = ({
  visible,
  onClose,
  photoSource
}: PhotoModalProps) => (
  <Modal visible={visible}
    transparent={Platform.OS == "ios" ? false : true}
    animationType="fade">
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.photoModalView}>
        <View style={styles.fullImageView}>
          <FastImage
            source={{ uri: photoSource }}
            style={styles.fullImage}
            resizeMode="stretch"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
)

const AudioMessage = ({ data }) => {
  // Replace with your video rendering logic
  return (
    <View
      style={{
        padding: 6,
        alignSelf: data.sender === 'user1' ? 'flex-end' : 'flex-start'
      }}>
      <View
        style={{
          padding: 8,
          borderRadius: 8
        }}>
        <LinearGradient
          colors={
            data.sender === 'user1'
              ? ['#FFCB52', '#FF7B02']
              : ['#252525', '#252525']
          }
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 22,
            borderRadius: 8,
            maxWidth: width * 0.7,
            flexDirection: 'row'
          }}>
          <Audio length={70} sender={data?.sender} />
          <TouchableOpacity style={{ padding: 5 }}>
            <FastImage
              source={require('../../../../assets/icons/Play.png')}
              style={{
                width: 24,
                height: 24
              }}
              tintColor={data.sender === 'user1' ? '#000000' : '#ffffff'}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}

const Audio = ({ length, sender }) => {
  const renderAudioLines = () => {
    const lines = []
    for (let i = 0; i < length; i++) {
      const size = Math.floor(Math.random() * 3) + 1 // Random size between 1 and 3
      lines.push(
        <View
          key={i}
          style={[
            {
              width: 2,
              backgroundColor: sender === 'user1' ? '#000000' : '#ffffff',
              marginVertical: 1,
              marginHorizontal: 2,
              height: size * 10
            }
          ]}
        />
      )
    }
    return lines
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 8,
          padding: 10,
          overflow: 'hidden',
          maxWidth: width * 0.4
        }}>
        {renderAudioLines()}
      </View>
    </View>
  )
}

const ActionModal = props => {
  const { visible, onClose, userId, isDating, uuid } = props
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'chat'>>()

  const { t } = useTranslation()

  const handleOpenProfile = () => {
    if (isDating) {
      navigation.navigate('dating_profile', { id: uuid, openFromChat: true })
    } else {
      navigation.navigate('profile', { user_id: userId })
    }
    onClose()
  }

  const handleBlock = async () => {
    if (!isDating) {
      await newConnection({
        type: ConnectionType.BLOCK,
        partner_id: userId
      })
    }
    onClose()
  }
  const handleReport = () => {
    // Report
    onClose()
    navigation.navigate('support', { isReport: true })
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => { }}>
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

export default ChatScreen