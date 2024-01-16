import React, { useState, useEffect, useRef } from 'react'
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Platform,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  NativeModules
} from 'react-native'

//@ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage'
import Video from 'react-native-video'
import { useDispatch, useSelector } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import FastImage from 'react-native-fast-image'

import { useTranslation } from 'react-i18next'

import {
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar
} from 'react-native-gifted-chat'

import { RootState } from '../../../store/store'
import { isNullOrWhitespace, usePrevious } from '../../../helpers'
import {
  convertImgToLink,
  convertVideoToLink
} from '../../../helpers/convertImgToLink'
import { deleteStoryThunk } from '../../../store/thunks/fetchStoriesThunk'
import {
  IUserStoryItem,
  NextOrPrevious,
  StoryListItemProps
} from '../../../interfaces'
import { setDeleteModal } from '../../../store/storiesSlice'

const { width, height } = Dimensions.get('window')

export const StoryListItem = ({
  index,
  key,
  userId,
  profileImage,
  profileName,
  duration,
  onFinish,
  onClosePress,
  stories,
  currentPage,
  onStorySeen,
  renderCloseComponent,
  renderSwipeUpComponent,
  renderTextComponent,
  loadedAnimationBarStyle,
  unloadedAnimationBarStyle,
  animationBarContainerStyle,
  storyUserContainerStyle,
  storyImageStyle,
  storyAvatarImageStyle,
  storyContainerStyle,
  onCloseComment,
  from,
  ...props
}: StoryListItemProps) => {
  const { t } = useTranslation()

  const progress = useRef(new Animated.Value(0)).current
  const video = React.useRef<any>(null)
  const dispatch = useDispatch()
  const [load, setLoad] = useState<boolean>(true)
  const [pressed, setPressed] = useState<boolean>(false)
  const [content, setContent] = useState<IUserStoryItem[]>(
    stories.map(x => ({
      ...x,
      finish: 0
    }))
  )
  const [modal, setModal] = useState<boolean>(false)
  const myUser = useSelector((root: RootState) => root.auth.user)

  const [current, setCurrent] = useState(0)

  const prevCurrentPage = usePrevious(currentPage)

  const [inputText, setInputText] = useState('')

  useEffect(() => {
    let isPrevious = !!prevCurrentPage && prevCurrentPage > currentPage
    if (isPrevious) {
      setCurrent(content.length - 1)
    } else {
      setCurrent(0)
    }

    let data = [...content]
    data.map((x, i) => {
      if (isPrevious) {
        x.finish = 1
        if (i == content.length - 1) {
          x.finish = 0
        }
      } else {
        x.finish = 0
      }
    })
    setContent(data)
    start()
  }, [currentPage])

  const prevCurrent = usePrevious(current)

  useEffect(() => {
    if (!isNullOrWhitespace(prevCurrent)) {
      if (prevCurrent) {
        if (
          current > prevCurrent &&
          content[current - 1].story_image == content[current].story_image
        ) {
          start()
        } else if (
          current < prevCurrent &&
          content[current + 1].story_image == content[current].story_image
        ) {
          start()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const start = () => {
    setLoad(false)
    progress.setValue(0)
    startAnimation()
  }

  const startAnimation = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false
    }).start(({ finished }) => {
      if (finished) {
        next()
      }
    })
  }
  useEffect(() => {
    if (modal) {
      // If 'modal' becomes true, stop the animation
      Animated.timing(progress, {
        toValue: 1,
        duration: duration,
        useNativeDriver: false
      }).stop()
    } else {
      startAnimation()
    }
  }, [modal])

  const boxInterpolation = progress.interpolate({
    inputRange: [-10, 10],
    outputRange: ['#FFCB52', '#FF7B02']
  })

  const onSwipeUp = (_props?: any) => {
    if (onClosePress) {
      onClosePress()
    }
    if (content[current].onPress) {
      content[current].onPress?.()
    }
  }

  const onSwipeDown = (_props?: any) => {
    onClosePress()
  }

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  }

  const next = () => {
    // check if the next content is not empty
    setLoad(true)
    if (current !== content.length - 1) {
      let data = [...content]
      data[current].finish = 1
      setContent(data)
      setCurrent(current + 1)
      progress.setValue(0)
    } else {
      // the next content is empty
      close('next')
    }
  }

  const previous = () => {
    // checking if the previous content is not empty
    setLoad(true)
    if (current - 1 >= 0) {
      let data = [...content]
      data[current].finish = 0
      setContent(data)
      setCurrent(current - 1)
      progress.setValue(0)
    } else {
      // the previous content is empty
      close('previous')
    }
  }

  const close = (state: NextOrPrevious) => {
    let data = [...content]
    data.map(x => (x.finish = 0))
    setContent(data)
    progress.setValue(0)
    if (currentPage == index) {
      if (onFinish) {
        setModal(false)
        onFinish(state)
      }
    }
  }

  const deleteStory = async () => {
    try {
      onClosePress()
      setTimeout(() => {
        dispatch(setDeleteModal(content[current].story_image))
      }, 500)
    } catch (error) {
      console.error(error)
    }
  }

  const swipeText =
    content?.[current]?.swipeText || props.swipeText || 'Swipe Up'

  React.useEffect(() => {
    if (onStorySeen && currentPage === index) {
      onStorySeen({
        user_id: userId,
        user_image: profileImage,
        user_name: profileName,
        story: content[current]
      })
    }
  }, [currentPage, index, onStorySeen, current])

  const handleSendComment = async () => {
    if (inputText.trim() === '') return
    // addLoadingMessage(inputText)
    const textToSend = inputText
    setInputText('')

    const storyId = content[current].story_id

    await AsyncStorage.setItem('storyId', storyId)
    await AsyncStorage.setItem('messageBody', textToSend)
    onClosePress()
    onCloseComment()

    return
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <GestureRecognizer
        key={key}
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        config={config}
        style={[styles.container, storyContainerStyle]}>
        <SafeAreaView>
          <View style={styles.backgroundContainer}>
            {/* <Image
            onLoadEnd={() => start()}
            source={{ uri: convertImgToLink(content[current].story_image) }}
            style={[styles.image, storyImageStyle]}
          /> */}
            {content[current].story_image?.includes('-') ? ( // Check if it's a base64 image
              <Image
                onLoadEnd={() => start()}
                style={[styles.image, storyImageStyle]}
                source={{ uri: convertImgToLink(content[current].story_image) }}
              />
            ) : (
              <Video
                source={{
                  uri: 'https://customer-2supyovcdud62mho.cloudflarestream.com/a92932d2cfdb45ca95731e269ff747b6/watch'
                }}
                ref={video}
                onEnd={() => start()}
                style={[styles.image]}
                resizeMode={''}
                controls={true}
              />
            )}
            {load && (
              <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color={'white'} />
              </View>
            )}
          </View>
        </SafeAreaView>
        <View style={styles.flexCol}>
          <View style={[styles.userContainer, storyUserContainerStyle]}>
            <View style={styles.flexRowCenter}>
              {typeof renderTextComponent === 'function' ? (
                renderTextComponent({
                  item: content[current],
                  profileName
                })
              ) : (
                <Text style={styles.avatarText}>{profileName}</Text>
              )}
            </View>
            <View style={styles.closeIconContainer}>
              {userId == myUser?.id ? (
                <TouchableOpacity
                  style={styles.closeIconButton}
                  onPress={() => {
                    setModal(v => !v)
                  }}>
                  <Image
                    source={require('../../../../assets/icons/Dots.png')}
                    resizeMode="contain"
                    style={styles.closeIconImage}
                  />
                </TouchableOpacity>
              ) : null}

              {typeof renderCloseComponent === 'function' ? (
                renderCloseComponent({
                  onPress: onClosePress,
                  item: content[current]
                })
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (onClosePress) {
                      onClosePress()
                    }
                  }}>
                  <Image
                    source={require('../../../../assets/images/crossIcon.png')}
                    resizeMode="contain"
                    style={styles.crossIconImage}
                  />
                </TouchableOpacity>
              )}
              {modal ? (
                <View
                  style={
                    (Platform.OS = 'ios'
                      ? styles.modalIos
                      : styles.modalContainer)
                  }>
                  <TouchableOpacity
                    onPress={deleteStory}
                    style={styles.modalButton}>
                    <Image
                      source={require('../../../../assets/images/deleteButton.png')}
                      resizeMode="contain"
                      style={styles.modalImage}
                    />
                    <Text style={styles.modalText}>DELETE STORY</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <View
            style={[styles.animationBarContainer, animationBarContainerStyle]}>
            {content.map((index, key) => {
              return (
                <View
                  key={key}
                  style={[
                    styles.animationBackground,
                    unloadedAnimationBarStyle
                  ]}>
                  <Animated.View
                    style={[
                      {
                        flex: current == key ? progress : content[key].finish,
                        height: 4,
                        backgroundColor: boxInterpolation,
                        borderRadius: 3,
                        zIndex: 1
                      },
                      loadedAnimationBarStyle
                    ]}
                  />
                </View>
              )
            })}
          </View>
          <View style={styles.pressContainer}>
            <TouchableWithoutFeedback
              onPressIn={() => progress.stopAnimation()}
              onLongPress={() => setPressed(true)}
              onPressOut={() => {
                setPressed(false)
                startAnimation()
              }}
              onPress={() => {
                if (!pressed && !load) {
                  previous()
                }
              }}>
              <View style={styles.flex} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPressIn={() => progress.stopAnimation()}
              onLongPress={() => setPressed(true)}
              onPressOut={() => {
                setPressed(false)
                startAnimation()
              }}
              onPress={() => {
                if (!pressed && !load) {
                  next()
                }
              }}>
              <View style={styles.flex} />
            </TouchableWithoutFeedback>
            {from ? (
              <InputToolbar
                containerStyle={{
                  borderRadius: 15,
                  backgroundColor: '#252525',
                  borderTopWidth: 0,
                  marginHorizontal: 32,
                  marginBottom: Platform.OS === 'ios' ? 36 : 0,
                  height: 70,
                  position: Platform.OS === 'ios' ? 'absolute' : 'absolute',
                  bottom: Platform.OS === 'ios' ? 50 : 20,
                  zIndex: 20
                }}
                renderSend={() => (
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <TouchableOpacity
                      style={{ marginRight: 12 }}
                      onPress={handleSendComment}>
                      <FastImage
                        source={require('../../../../assets/icons/sendChat.png')}
                        style={{
                          width: 24,
                          height: 24
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                renderComposer={composerProps => (
                  <Composer
                    {...composerProps}
                    placeholder={t('Send Message')}
                    composerHeight={Platform.OS === 'ios' ? 58 : 70}
                    multiline={false}
                    textInputProps={{
                      onSubmitEditing: handleSendComment,
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
            ) : null}
          </View>
        </View>

        {typeof renderSwipeUpComponent === 'function' ? (
          renderSwipeUpComponent({
            onPress: onSwipeUp,
            item: content[current]
          })
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            onPress={onSwipeUp}
            style={styles.swipeUpBtn}>
            <Text style={styles.swipeText} />
            <Text style={styles.swipeText}>{swipeText}</Text>
          </TouchableOpacity>
        )}
      </GestureRecognizer>
    </KeyboardAvoidingView>
  )
}

export default StoryListItem

StoryListItem.defaultProps = {
  duration: 10000
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  flex: {
    flex: 1
  },
  flexCol: {
    flex: 1,
    flexDirection: 'column'
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  spinnerContainer: {
    zIndex: -100,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'black',
    alignSelf: 'center',
    width: width,
    height: height
  },
  animationBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10
  },
  animationBackground: {
    height: 4,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#252525',
    marginHorizontal: 2,
    zIndex: 1
  },
  userContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15
  },
  avatarImage: {
    height: 30,
    width: 30,
    borderRadius: 100
  },
  avatarText: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10
  },
  closeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row'
  },
  pressContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  swipeUpBtn: {
    position: 'absolute',
    right: 0,
    left: 0,
    alignItems: 'center',
    bottom: Platform.OS == 'ios' ? 20 : 50
  },
  whiteText: {
    color: 'white'
  },
  swipeText: {
    color: 'white',
    marginTop: 5
  },
  closeIconButton: { padding: 5, marginRight: 3 },
  closeIconImage: {
    height: 6,
    width: 20
  },
  crossIconImage: {
    height: 24,
    width: 24
  },
  modalContainer: {
    backgroundColor: '#252525',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: -65,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    height: 45,
    zIndex: 1
  },
  modalIos: {
    backgroundColor: '#252525',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    left: -115,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    height: 45,
    zIndex: 1
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45
  },
  modalImage: {
    height: 24,
    width: 24,
    marginRight: 8
  },
  modalText: {
    fontSize: 8,
    color: '#fff',
    fontWeight: '600'
  }
})
