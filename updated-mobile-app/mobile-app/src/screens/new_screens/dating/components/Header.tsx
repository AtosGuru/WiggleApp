import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { screenTabs } from "../const"
import { styles } from '../styled'
import LinearGradient from 'react-native-linear-gradient'
import { HeaderProps } from '../interface'
import { useQuery } from 'react-query'
import { getMyDatingProfile } from '../../../../api/dating.methods'
import { QueryKey } from '../../../../types/enum'
import FastImage from 'react-native-fast-image'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../../RootNavigation'
import { convertImgToLink } from '../../../../helpers/convertImgToLink'

function Header({ step, changeStep, onSwipeClose, isOpenSwipe }: HeaderProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const { data: myDatingProfile } = useQuery(QueryKey.myDatingProfile, getMyDatingProfile)

    const handleOpenProfile = () => {
        navigation.navigate('dating_profile')
    }
    
    const userAvatar = convertImgToLink(myDatingProfile?.profile?.photos?.[0])

    return (
      <View>
        <FlatList
          scrollEnabled={false}
          data={screenTabs}
          keyExtractor={({ id }) => id.toString()}
          contentContainerStyle={styles.screenButtons}
          renderItem={({ item }) => (
            <TouchableOpacity
              disabled={!isOpenSwipe && item.id === step}
              onPress={() => (isOpenSwipe && item.id === step) ? onSwipeClose() : changeStep(item.id)}
            >
              <LinearGradient
                style={styles.buttonTitle}
                colors={item.id === step ? ["#FFCB52", "#FF7B02"] : ['#252525', '#252525']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonName}>{item.name}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={handleOpenProfile} style={styles.headerAvatar}>
          <FastImage
              source={{ uri: userAvatar }}
              style={styles.avatar}
            />
        </TouchableOpacity>
      </View>
    )
}

export default Header