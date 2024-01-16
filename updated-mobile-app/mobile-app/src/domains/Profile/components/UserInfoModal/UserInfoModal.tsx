import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import React from 'react'
import { useTranslation } from 'react-i18next'

const { width } = Dimensions.get('screen')

const UserInfoModal = props => {
  const { visible, onCancel, data } = props
  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#252525E6',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: '#000000',
                borderRadius: 20,
                paddingBottom: 30,
                width: '70%'
              }}>
              <FastImage
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/c10b/e00c/faf3235c4edef94e85945f124ccef4df?Expires=1691971200&Signature=BVfN-TUyaQFbxOaQY6z3zKuP1HLze8cAA6l2IyZZb0GmD2aKEUMKGE4XNGvfcqTf55X-Kjc824~-tajszkC8qL-wfJTor3CJXZXHs1nxQZbQ~0E4a4HXvcMf~U1KQ4O02yysMeQuZYNSF~xnofTi5m6m1Lifgi~2GYqPZBhahxw-lTdq3gTR0KkK7jqNLroouTnhU7mWIHrgHaHKfmp-waem29tq0v8JhXt67H7mCJkczeJIXVvUdyUPDU1~mnJRo4Jjd~OHBUUpVJuqYCwx-bK0Tetqz9xDhI-ShL1L6sk5Ls9GlbDZKWD6KHfb~GRvNYalE-ZL3UNBOV4vazyI5Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                }}
                style={{
                  width: '100%',
                  height: width / 2,
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                  zIndex: 1,
                  marginBottom: 32
                }}
              />
              <FastImage
                source={{ uri: data }}
                style={{
                  width: 104,
                  alignSelf: 'center',
                  top: width / 3.5,
                  height: 104,
                  borderRadius: 104,
                  zIndex: 1,
                  position: 'absolute'
                }}
              />
              <View
                style={{
                  paddingHorizontal: 34
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#ffffff',
                    marginBottom: 22,
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                  Luna
                </Text>

                <View
                  style={{
                    justifyContent: 'space-between',
                    gap: 12
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '100%',
                      borderRadius: 12,
                      alignItems: 'center'
                    }}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: '100%',
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center'
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#ffffff'
                        }}>
                        {t('Message')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#252525',
                      width: '100%',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center'
                    }}
                    onPress={onCancel}>
                    <Text style={{ fontSize: 12, color: '#ffffff' }}>
                      {t('Unfriend')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default UserInfoModal
