import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
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
  StackActions,
  useNavigation,
  useRoute
} from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { deleteConnection, getConnections } from '../../../api/connections.methods'
import { ConnectionType, QueryKey } from '../../../types/enum'
import { RootStackParamList } from '../../../RootNavigation'
import { UserSearchItem } from '../search'
import { convertImgToLink } from '../../../helpers/convertImgToLink'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

function BlockedScreen() {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'following'>>()
  const { t } = useTranslation()
  const user = useSelector((root: RootState) => root.auth.user)
  const [selectedUser, setSelectedUser] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, refetch: refetchBlocked } = useQuery({
    queryKey: [QueryKey.connections, ConnectionType.BLOCK, user?.id ?? 0],
    queryFn: getConnections
  })

  const handleBack = () => navigation.goBack()

  const handleOpenModal = imageUrl => {
    setIsModalOpen(true)
    setSelectedUser(imageUrl)
  }
  const onCancel = () => setIsModalOpen(false)

  const onPressUser = (user_id: number) => {
    navigation.dispatch(StackActions.push('profile', { user_id }))
  }

  const onPressUnblock = async (connection_id: number) => {
    await deleteConnection({ connection_id })
    refetchBlocked()
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/eventBackground.png')}
      style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 32,
            marginTop: 20,
            marginHorizontal: 21
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
            <TouchableOpacity onPress={handleBack} >
              <FastImage
                source={require('../../../../assets/icons/ArrowLeft.png')}
                style={{
                  width: 24,
                  height: 24
                }}
              />
            </TouchableOpacity>
            <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#ffffff',
                lineHeight:18.4
              }}>
              {t('Blocked Accounts')}
            </Text>
            </View>
            <View/>
          </View>
        </View>
        <FlatList
          data={data?.connections ?? []}
          style={{ marginHorizontal: 21, marginTop: 24 }}
          columnWrapperStyle={{ gap: 6 }}
          numColumns={3}
          renderItem={({ item }) => (
            <UserSearchItem
              imageUrl={convertImgToLink(item.partner?.profile?.photos?.[0])}
              name={`${item.partner?.profile?.firstName}`}
              onPress={() => onPressUser(item.partner_id)}
              isBlocked
              onPressIcon={() => onPressUnblock(item.id)}
            />
          )}
        />
        {/* <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={'light-content'} />

            <View
              style={{
                paddingHorizontal: 4,
                paddingBottom: 80
              }}>
              <View style={{ alignItems: 'center', marginBottom: 32 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                  <TouchableOpacity onPress={handleBack} style={{ flex: 2 }}>
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
                      fontSize: 20,
                      fontWeight: '600',
                      color: '#ffffff',
                      flex: 3
                    }}>
                    {t('Following')}
                  </Text>
                </View>
              </View>

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
                            key={`following-${imageUrl}`}>
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

                            <FastImage
                              key={rowIndex}
                              source={{ uri: imageUrl }}
                              style={{
                                width: width / 3 - 18,
                                height:
                                  colIndex === 1 && rowIndex % 2 === 0
                                    ? 130
                                    : 158,
                                borderRadius: 18
                              }}
                              resizeMode="cover"
                            />

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
            <UserInfoModal
              data={selectedUser}
              visible={isModalOpen}
              onCancel={onCancel}
            />
          </ScrollView> */}
      </SafeAreaView>
    </ImageBackground>
  )
}

export default BlockedScreen
