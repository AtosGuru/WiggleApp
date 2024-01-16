import React, { createRef, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import {
  NavigationProp,
  RouteProp,
  StackActions,
  useIsFocused,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { RootStackParamList } from '../../RootNavigation'
import {
  ToasterBase,
  ToasterMethods,
  useToast,
  Swipeable,
  ToastItemProps
} from 'react-native-customizable-toast'
import { BlurView } from '@react-native-community/blur'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  Extrapolate,
  interpolate,
  SlideInLeft,
  SlideOutRight
} from 'react-native-reanimated'
import GradientText from 'react-native-gradient-texts'
import FastImage from 'react-native-fast-image'

import { ConnectionType, QueryKey } from '../../types/enum'
import {
  deleteConnection,
  getConnections,
  newConnection
} from '../../api/connections.methods'

import styles from './styled'

type NotificationToaster = {
  title: string
  body: string
  type: number
  sender: number
  dismissible?: boolean
  backgroundColor?: string
}

const NotificationToasterRef = createRef<ToasterMethods<NotificationToaster>>()

export const NotificationToasterHelper = {
  show: (options: NotificationToaster) =>
    NotificationToasterRef.current?.show(options)!,
  hide: (id: string) => NotificationToasterRef.current?.hide(id),
  filter: (fn: (value: NotificationToaster, index: number) => void) =>
    NotificationToasterRef.current?.filter(fn),
  update: (id: string, options: Partial<NotificationToaster>) =>
    NotificationToasterRef.current?.update(id, options),
  hideAll: () => NotificationToasterRef.hideAll()
}

export const clamp = (
  value: number,
  lowerBound: number,
  upperBound: number
) => {
  'worklet'
  return Math.min(Math.max(lowerBound, value), upperBound)
}

export const customStyleWorklet = ({
  itemLayout: { y },
  gesture: { translationY },
  properties: { index },
  displayFromBottom
}: ToastItemProps) => {
  'worklet'

  return {
    transform: [
      {
        translateY: clamp(translationY.value, -y.value, 0)
      },
      {
        translateX: interpolate(
          -translationY.value - y.value,
          [0, 100],
          [0, index % 2 ? 1000 : -1000],
          Extrapolate.CLAMP
        )
      },
      displayFromBottom ? { rotate: '-180deg' } : { rotate: '0deg' }
    ]
  }
}

const NotificationToastComponent = () => {
  const {
    id,
    title,
    body,
    type,
    sender,
    hide,
    dismissible,
    backgroundColor = '#222'
  } = useToast<NotificationToaster>()

  const navigation = useNavigation()

  const [expand, setExpand] = useState(false)

  const handleAcceptFollow = async () => {
    if (sender) {
      hide()
      await newConnection({
        partner_id: sender,
        type: 2
      })
    }
  }

  const handleDeclineFollow = async () => {
    if (sender) {
      hide()
      await newConnection({
        partner_id: sender,
        type: 0
      })
    }
  }

  const handleReply = async () => {
    hide()
    navigation.navigate('conversation', {
      userId: sender
    })
  }

  const handleMute = async () => {
    hide()
  }

  return (
    <Swipeable onSwipe={hide} disabled={false}>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={true}
          style={[
            styles.touchable,
            {
              height: !expand ? 75 : 114,
              margin: 24,
              padding: 0
            }
          ]}
        >
          <View
            style={{
              borderRadius: !expand ? 85 : 20,
              overflow: 'hidden',
              flex: 1,
              backgroundColor: 'transparent'
            }}>
            <BlurView
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: 'transparent'
              }}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white">
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  backgroundColor: 'transparent'
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <View style={{ flex: 2, backgroundColor: 'transparent' }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start'
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#FFC34A',
                          fontWeight: '400',
                          fontFamily: 'LeagueSpartan-Regular',
                          marginLeft: 30,
                          textAlign: 'left'
                        }}>
                        {title}
                      </Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'white',
                          fontWeight: '600',
                          fontFamily: 'LeagueSpartan-SemiBold',
                          marginLeft: 30
                        }}>
                        {body}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      backgroundColor: 'transparent',
                      marginRight: 10
                    }}>
                    {type === 1 ? (
                      <View
                        style={{
                          width: 90,
                          height: 42,
                          flexDirection: 'row',
                          justifyContent: 'space-between'
                        }}>
                        <TouchableOpacity
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            backgroundColor: '#252525',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => {
                            console.log('decline')
                            handleDeclineFollow()
                          }}>
                          <FastImage
                            source={require('../../../assets/icons/close.png')}
                            style={{ width: 25, height: 25 }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            backgroundColor: '#FF840B',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => {
                            console.log('accept')
                            handleAcceptFollow()
                          }}>
                          <FastImage
                            source={require('../../../assets/icons/check_white.png')}
                            style={{ width: 11, height: 11 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    {type === 5 ? (
                      <View
                        style={{
                          width: 42,
                          height: 42,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          backgroundColor: 'transparent'
                        }}>
                        <TouchableOpacity
                          style={{
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            // backgroundColor: '#252525',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                          onPress={() => {
                            console.log('expand flag: ', !expand)
                            setExpand(!expand)
                          }}>
                          <FastImage
                            source={
                              !expand
                                ? require('../../../assets/icons/ArrowDown.png')
                                : require('../../../assets/icons/ArrowTop.png')
                            }
                            style={{ width: 25, height: 25 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
                {expand ? (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: 'transparent'
                    }}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          width: 130,
                          height: 30,
                          borderRadius: 8,
                          backgroundColor: '#FF7B02',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        onPress={() => {
                          console.log('reply')
                          handleReply()
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#fff',
                            fontWeight: '400',
                            fontFamily: 'LeagueSpartan-Regular'
                          }}>
                          {'Reply'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <TouchableOpacity
                        style={{
                          width: 130,
                          height: 30,
                          borderRadius: 8,
                          backgroundColor: '#252525',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        onPress={() => {
                          console.log('mute')
                          handleMute()
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#fff',
                            fontWeight: '400',
                            fontFamily: 'LeagueSpartan-Regular'
                          }}>
                          {'Mute'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            </BlurView>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  )
}

interface NotificationToasterProps {
  displayFromBottom?: boolean
  useSafeArea?: boolean
}
export const NotificationToaster = ({
  useSafeArea,
  displayFromBottom
}: NotificationToasterProps) => {
  return (
    <ToasterBase
      entering={SlideInLeft}
      exiting={SlideOutRight}
      onSwipeEdge={({ filter }) => filter(e => e.dismissible)}
      ref={NotificationToasterRef}
      render={NotificationToastComponent}
      itemStyle={customStyleWorklet}
      displayFromBottom={displayFromBottom}
      useSafeArea={true}
    />
  )
}
