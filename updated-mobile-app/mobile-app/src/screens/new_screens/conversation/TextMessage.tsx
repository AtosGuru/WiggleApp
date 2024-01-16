import {
  ActivityIndicator,
  View,
  Text,
  Linking,
  Dimensions
} from 'react-native'
import React from 'react'
import { LinearGradient } from 'react-native-linear-gradient'
import Hyperlink from 'react-native-hyperlink'
import { IMessage } from 'react-native-gifted-chat'

import styles from './styled'

const { height, width } = Dimensions.get('screen')

export interface TextMessageProps {
  data?: IMessage
  isLoading?: Boolean
}

export const TextMessage = ({ data, isLoading }: TextMessageProps) => {
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
                },
                styles.textMessageStyle
              ]}>
              {data.text}
            </Text>
          </Hyperlink>
        </LinearGradient>
      </View>
    </View>
  )
}

export default TextMessage
