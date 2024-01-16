import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { Fragment, useState } from 'react'

import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import UserInfoModal from '../../../domains/Profile/components/UserInfoModal/UserInfoModal'
import styles from './styled'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { ConnectionType, QueryKey } from '../../../types/enum'
import { getEventParticipants } from '../../../api/connections.methods'
import { RootStackParamList } from '../../../RootNavigation'
import { UserSearchItem } from '../search'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { height, width } = Dimensions.get('screen')

function ParticipantsScreen() {
  const { t } = useTranslation()
  const { params } = useRoute<RouteProp<RootStackParamList, 'participants'>>()
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'participants'>>()

  const [selectedUser, setSelectedUser] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(ConnectionType.PRECHECK)

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.connections, activeTab],
    queryFn: () =>
      getEventParticipants({ event_id: params?.event_id, type: activeTab })
  })

  const handleBack = () => navigation.goBack()

  const handleOpenModal = imageUrl => {
    setIsModalOpen(true)
    setSelectedUser(imageUrl)
  }

  const onPressUser = (user_id: number) => {
    navigation.navigate('profile', { user_id })
  }

  const onCancel = () => setIsModalOpen(false)

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
              <View style={{ alignItems: 'center', marginBottom: 26 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                  <TouchableOpacity onPress={handleBack} style={{ flex: 1 }}>
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
                      flex: 3
                    }}>
                    {t('Participants of this event')}
                  </Text>
                </View>
              </View>

              {/* CONTENT */}
              <View
                style={{
                  justifyContent: 'center',
                  gap: 20,
                  flexDirection: 'row',
                  marginBottom: 20
                }}>
                <TouchableOpacity
                  onPress={() => setActiveTab(ConnectionType.PRECHECK)}
                  style={{
                    borderRadius: 12,
                    alignItems: 'center'
                  }}>
                  <LinearGradient
                    colors={
                      activeTab === ConnectionType.PRECHECK
                        ? ['#FFCB52', '#FF7B02']
                        : ['#252525', '#252525']
                    }
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center',
                      padding: 10
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                      {t('Pre-Checked')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab(ConnectionType.CHECKIN)}
                  style={{
                    borderRadius: 12,
                    alignItems: 'center'
                  }}>
                  <LinearGradient
                    colors={
                      activeTab === ConnectionType.CHECKIN
                        ? ['#FFCB52', '#FF7B02']
                        : ['#252525', '#252525']
                    }
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center',
                      padding: 10
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>
                      {t('Checked in')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  position: 'relative',
                  justifyContent: 'center',
                  marginBottom: 24
                }}>
                <TextInput
                  placeholder={`${t('Search')} ....`}
                  placeholderTextColor="#B0B0B0"
                  style={{
                    width: '100%',
                    backgroundColor: '#252525',
                    borderRadius: 150,
                    paddingVertical: 18,
                    paddingHorizontal: 56,
                    color: 'white'
                  }}
                />
                <FastImage
                  source={require('../../../../assets/icons/Search.png')}
                  style={{
                    width: 24,
                    height: 24,
                    position: 'absolute',
                    left: 16
                  }}
                />
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <FlatList
                  data={data?.connections ?? []}
                  style={{}}
                  columnWrapperStyle={{ gap: 6 }}
                  numColumns={3}
                  refreshControl={
                    <RefreshControl
                      refreshing={isLoading}
                      tintColor={'#FFCB52'}
                      colors={['#FFCB52']}
                    />
                  }
                  renderItem={({ item }) => (
                    <UserSearchItem
                      imageUrl={convertImgToLink(
                        item?.user?.profile?.photos?.[0]
                      )}
                      name={`${item?.user?.profile.firstName}`}
                      onPress={() => onPressUser(item.id)}
                    />
                  )}
                />
              </View>
            </View>
            <UserInfoModal
              data={selectedUser}
              visible={isModalOpen}
              onCancel={onCancel}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

const ParticipantsList = ({ handleOpenModal, data }) => {
  return Array.from({ length: 3 }, (_, colIndex) => (
    <View
      key={colIndex}
      style={{
        flex: 1,
        gap: 8,
        alignItems: 'center'
      }}>
      {data
        .filter((_, index) => index % 3 === colIndex)
        .map((imageUrl, rowIndex) => {
          return (
            <View
              style={{ position: 'relative' }}
              key={`${colIndex}-${rowIndex}`}>
              <TouchableOpacity
                onPress={() => handleOpenModal(imageUrl)}
                style={{
                  position: 'absolute',
                  padding: 16,
                  right: 0,
                  zIndex: 1
                }}>
                <FastImage
                  source={require('../../../../assets/icons/Dots.png')}
                  style={{
                    width: 16,
                    height: 4
                  }}
                />
              </TouchableOpacity>

              {/* User Avatar */}
              <Image
                key={rowIndex}
                source={{ uri: imageUrl }}
                style={{
                  width: width / 3 - 18,
                  height: colIndex === 1 && rowIndex % 2 === 0 ? 130 : 158,
                  borderRadius: 18
                }}
                resizeMode="cover"
              />
              {/* Shadow */}
              <LinearGradient
                colors={['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 1)']}
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
  ))
}

export default ParticipantsScreen
