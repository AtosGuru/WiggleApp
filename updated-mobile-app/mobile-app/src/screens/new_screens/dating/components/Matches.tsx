import React from 'react'
import { FlatList, Image, RefreshControl, ScrollView, Text, TouchableOpacity } from "react-native"
import { styles } from "../styled"
import { UserSearchItem } from '../../search'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import GradientText from '../../../../components/GradientText/GradientText'
import FastImage from 'react-native-fast-image'
import { useQuery } from 'react-query'
import { ConnectionType, QueryKey } from '../../../../types/enum'
import { getMyDatingProfile } from '../../../../api/dating.methods'
import moment from 'moment'
import { convertImgToLink } from '../../../../helpers/convertImgToLink'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../../RootNavigation'
import { newConnection } from '../../../../api/connections.methods'
import Toast from 'react-native-toast-message'

function Matches() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const { data: datingProfile, refetch, isRefetching } = useQuery(QueryKey.myDatingProfile, getMyDatingProfile)

    function hasMatch(matches, chats) {
        return matches?.some((match) => chats?.some(chat => match?.user_id === chat?.partner_id));
    }
      
    const hasMessages = hasMatch(datingProfile?.matches, datingProfile?.chats)

    const handleOpenChat = (user, openPicker = false) => () => {
        navigation.navigate('chat', {
          connection_id: user?.pivot.connection_id,
          userId: user.partner.id,
          openPickerOnMount: openPicker,
          uuid: user?.user_id !== datingProfile?.user_id ? user?.user_id : user?.partner_id,
          isDating: true,
        })
    }

    const handleCreateChat = async (user: User) => {
        try {
          const connection = await newConnection({
            partner_id: user.user_id,
            type: ConnectionType.DATING
          })
    
          if (connection && connection?.id) {
            navigation.navigate('chat', {
              connection_id: connection.id,
              userId: connection.partner_id
            })
          }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: `${error}`
            })
        }
      }

      const cameraImage = require('../../../../../assets/icons/CameraWhite.png')

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    tintColor={'#FFCB52'}
                    colors={['#FFCB52']}
                />
            }
            style={styles.listWrap}
        >
            {!hasMessages && <FlatList
                horizontal
                data={datingProfile?.matches}
                showsHorizontalScrollIndicator={false}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        height: 168,
                        width: 125,
                        marginRight: 6
                    }}>
                        <UserSearchItem
                            imageUrl={convertImgToLink(item.dating?.profile.photos?.[0])}
                            name={item.dating.profile.name}
                            age={item.dating.profile.age}
                            onPress={() => handleCreateChat(item)}
                            dots={false}
                            maxWidth={125}
                        />
                    </View>
                )}
            />}
            <View style={styles.footerView}>
                {datingProfile?.chats?.length ? <Text style={styles.matchesTitle}>Matches</Text> : null}
                {datingProfile?.chats?.length < 1 && (
                    <View>
                        <Text style={{ ...styles.matchesTitle, fontSize: 18, textAlign: 'center', marginTop: '30%' }}>No matches</Text>
                    </View>
                )}
                <FlatList
                    scrollEnabled={false}
                    keyExtractor={({ id }) => id.toString()}
                    data={datingProfile?.chats}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={handleOpenChat(item)}
                            activeOpacity={1}
                            style={styles.chatWrapper}
                        >
                            <View style={styles.chat}>
                                <Image
                                    source={{ uri: convertImgToLink(item.partner?.profile.photos?.[0]) }}
                                    style={styles.chatImage}
                                />
                                {item.unread?.count ? <LinearGradient
                                    style={styles.newMessage}
                                    colors={["#FFCB52", "#FF7B02"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                <Text style={styles.chatMessage}>{item.unread.count}</Text>
                                </LinearGradient> : null}
                                {item?.messages?.length < 1 ? (
                                <View>
                                    <GradientText
                                        style={styles.newMatch}
                                            start={{ x: 1, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            colors={['#FFCB52', '#FF7B02']}
                                        >
                                        New Match!
                                    </GradientText>
                                    <Text style={styles.chatName}>{item.partner.profile.firstName} {item.partner.profile.lastName}</Text>
                                </View>
                                ) : (
                                <View style={styles.chatContent}>
                                    <Text numberOfLines={1} style={styles.chatName}>{item.partner.profile.firstName} {item.partner.profile.lastName}</Text>
                                    <Text numberOfLines={1} style={styles.chatLastMessage}>{item.messages[0]?.image?.id ? <Text style={styles.chatName}>image</Text> : item.messages[0]?.message}</Text>
                                </View>
                                )}
                            </View>
                            <View>
                            </View>
                            <View style={styles.endBlock}>
                                <TouchableOpacity onPress={handleOpenChat(item, true)}>
                                    <FastImage
                                        source={cameraImage}
                                        style={styles.cameraImage}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.time}>{moment(item.updated_at).format('hh:mm a')}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    )
}

export default Matches