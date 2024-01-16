import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { Fragment, useState } from 'react'

import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import styles from './styled'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const { height, width } = Dimensions.get('screen')

const userImagesMap = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwIw4TUNNyavGpNgbeUnWcXS5ixK5Y9wBLo5gIBKqWRtERGay34gjqE-8MvVXhkPV9JA&usqp=CAU',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80',
  'https://media.istockphoto.com/id/1165314750/photo/living-that-urban-life.jpg?s=612x612&w=0&k=20&c=5If9eBsKrj2N0EDx8dvMM6SOEUqNlBTpY-POmwYIt4o=',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
  'https://media.istockphoto.com/id/1208414307/photo/happy-male-executive-in-office.jpg?s=612x612&w=0&k=20&c=3krD8gIdPmHFVwbcHGyQDXUGlcyzmcWQNyRMRp_93P8=',
  'https://media.istockphoto.com/id/1299077582/photo/positivity-puts-you-in-a-position-of-power.jpg?s=170667a&w=0&k=20&c=Ib--rwStdSmJT4GDM8LqIpEyuhD59ROcIlxeEqTNYLM=',
  'https://st4.depositphotos.com/1036367/31538/i/600/depositphotos_315389058-stock-photo-close-up-portrait-of-happy.jpg',
  'https://st4.depositphotos.com/5228995/23884/i/600/depositphotos_238842044-stock-photo-sensual-woman-touching-neck.jpg',
  'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'
]

function DeletedAccountsScreen() {
  const navigation = useNavigation()
  const handleBack = () => navigation.goBack()
  const { t } = useTranslation()

  const [confirmationModal, setConfirmationModal] = useState(false)

  const [selectedUser, setSelectedUser] = useState(false)

  const onUserDelete = (avatarUser, index) => {
    if (selectedUser === avatarUser) {
      setSelectedUser(null)
    } else {
      setSelectedUser(avatarUser)
      handleBlock()
    }
  }
  const handleBlock = () => setConfirmationModal(true)

  const onCancel = () => {
    setSelectedUser(null)
    setConfirmationModal(false)
  }

  return (
    <Fragment>
      <View style={styles.backgroundImageWrapper}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={'light-content'} />

            <View
              style={{
                paddingHorizontal: 4,
                paddingBottom: 80
              }}>
              {/* HEADER */}
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: 26
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                  <TouchableOpacity onPress={handleBack}>
                    <FastImage
                      source={require('../../../../assets/icons/ArrowLeft.png')}
                      style={{
                        width: 24,
                        height: 24
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#ffffff',
                      flex: 1,
                      textAlign: 'center',
                      paddingRight: 24
                    }}>
                    {t('Deleted Accounts')}
                  </Text>
                </View>
              </View>

              {/* CONTENT */}

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {Array.from({ length: 3 }, (_, colIndex) => (
                  <View
                    key={colIndex}
                    style={{
                      flex: 1,
                      gap: 8,
                      alignItems: 'center'
                    }}>
                    {userImagesMap
                      .filter((_, index) => index % 3 === colIndex)
                      .map((imageUrl, rowIndex) => {
                        return (
                          <View
                            style={{ position: 'relative' }}
                            key={`followers-${imageUrl}`}>
                            {/* Buttons */}
                            <TouchableOpacity
                              onPress={() => onUserDelete(imageUrl, rowIndex)}
                              style={{
                                position: 'absolute',
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                right: 0,
                                zIndex: 1
                              }}>
                              <FastImage
                                source={require('../../../../assets/icons/ProfileDelete.png')}
                                style={{
                                  width: 20,
                                  height: 20
                                }}
                              />
                            </TouchableOpacity>

                            {/* User Avatar */}
                            <FastImage
                              key={rowIndex}
                              source={{ uri: imageUrl }}
                              style={{
                                width: width / 3 - 18,
                                height:
                                  colIndex === 1 && rowIndex % 2 === 0
                                    ? 130
                                    : 158,
                                borderRadius: 18,
                                opacity: 0.3
                              }}
                            />
                            {/* Shadow */}
                            <LinearGradient
                              colors={[
                                'rgba(15, 15, 15, 0)',
                                'rgba(15, 15, 15, 1)'
                              ]}
                              start={{ x: 1, y: 0 }}
                              end={{ x: 1, y: 1 }}
                              style={{
                                position: 'absolute',
                                width: width / 3 - 18,
                                height: 80,
                                bottom: 0,
                                borderRadius: 18
                              }}
                            />
                            {/* User data */}
                            <View
                              style={{
                                position: 'absolute',
                                bottom: 12,
                                left: 12,
                                zIndex: 1
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: '300',
                                  fontSize: 12
                                }}>
                                30
                              </Text>
                              <Text
                                style={{
                                  color: 'white',
                                  fontWeight: '600',
                                  fontSize: 14
                                }}>
                                Beth
                              </Text>
                            </View>
                          </View>
                        )
                      })}
                  </View>
                ))}
              </View>
            </View>
            <ConfirmationModal
              avatar={selectedUser}
              visible={confirmationModal}
              onCancel={onCancel}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.navigate('followers')}
        style={{
          borderRadius: 10,
          overflow: 'hidden',
          width: '70%',
          height: 62,
          position: 'absolute',
          top: height - 100,
          alignSelf: 'center'
        }}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            height: 62
          }}>
          <Text style={{ fontSize: 12 }}>{t('See All Friends')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  )
}

const ConfirmationModal = props => {
  const { visible, onCancel, avatar } = props

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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* Wrap the child elements inside a single container */}
              <FastImage
                source={{ uri: avatar }}
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 104,
                  marginBottom: -30,
                  zIndex: 1
                }}
              />
              <View
                style={{
                  backgroundColor: '#000000',
                  borderRadius: 20,
                  paddingHorizontal: 34,
                  paddingBottom: 30,
                  paddingTop: 44,
                  width: '70%'
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#ffffff',
                    marginBottom: 14,
                    textAlign: 'center'
                  }}>
                  {t('Are you sure you want to unblock')}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: 40,
                    textAlign: 'center'
                  }}>
                  Ashley?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 12
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
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
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#ffffff'
                        }}>
                        {t('Yes')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#252525',
                      flex: 1,
                      width: '100%',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center'
                    }}
                    onPress={onCancel}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                      {t('No')}
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

export default DeletedAccountsScreen
