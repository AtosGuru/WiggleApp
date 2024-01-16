import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  Text
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import Hyperlink from 'react-native-hyperlink'
import { IMessage } from 'react-native-gifted-chat'

import StoryPreview from '../stories'

import styles from './styled'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { height, width } = Dimensions.get('screen')

export interface StoryMessageProps {
  message?: IMessage
  onCloseComment: () => void
}

export const StoryMessage = ({
  message,
  onCloseComment
}: StoryMessageProps) => {
  const isViewed = false

  const { t } = useTranslation()

  const createData = () => {
    const dataValue = 1
    const array = []
    for (let i = 0; i < dataValue; i++) {
      const userImage = message.image_id
      const userName = ''
      const userProfile = convertImgToLink(message.image_id)
      const storyImage = message.image_id
      const storyId = message.storyId

      const userObject = {
        user_Profile: userProfile,
        user_id: message?.user._id,
        user_image: userImage,
        user_name: userName,
        stories: [
          {
            story_id: storyId,
            story_image: storyImage,
            swipeText: '  ',
            onPress: () => console.log(`story ${storyImage} swiped`)
          }
        ]
      }
      array.push(userObject)
    }
    return array
  }

  const [data, setData] = useState(createData())

  const onClosedStory = () => {}

  return (
    <View
      style={{
        padding: 6,
        alignSelf: message.sender === 'user1' ? 'flex-end' : 'flex-start'
      }}>
      <View
        style={{
          padding: 8,
          borderRadius: 8
        }}>
        {message.comments?.length > 0 ? (
          <FastImage
            source={{ uri: message.image_id }}
            style={{
              width: 140,
              height: 140,
              marginBottom: -20,
              borderRadius: 20,
              alignSelf: 'flex-end'
            }}
          />
        ) : null}
        <LinearGradient
          colors={
            message.sender === 'user1'
              ? ['#FFCB52', '#FF7B02']
              : ['#252525', '#252525']
          }
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            maxWidth: width * 0.7,
            minHeight: 44,
            width: message.comments.length > 0 ? 160 : 120
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('story clicked:    ', message)
            }}
            activeOpacity={1}
            disabled={isViewed}
            style={{
              flex: 1,
              padding: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              opacity: isViewed ? 0.3 : 1
            }}>
            {message.comments.length > 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Hyperlink linkStyle={{ fontWeight: 'bold' }}>
                  <Text
                    style={[
                      {
                        color:
                          message.sender === 'user1' ? '#000000' : '#ffffff',

                        fontFamily: 'LeagueSpartan-Light',
                        fontSize: 16
                      },
                      styles.textMessageStyle
                    ]}>
                    {message.comments[0].message}
                  </Text>
                </Hyperlink>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center'
                }}>
                <FastImage
                  source={require('../../../../assets/images/conversation_story_message_icon.png')}
                  style={{ width: 24, height: 24 }}
                />
                <Text
                  color={'#000'}
                  style={{
                    width: 50,
                    height: '100%',
                    opacity: 0.7,
                    textAlign: 'center',
                    lineHeight: 16,
                    fontWeight: 600
                  }}
                  size={12}>
                  {'Photo'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </LinearGradient>
        <View
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            padding: 20
          }}>
          <ActivityIndicator
            color="#000"
            style={{
              marginTop: 30,
              zIndex: message.image_id === 'photo' ? 15 : -15,
              opacity: 0.4
            }}
            animating={message.image_id === 'photo' ? true : false}
            size={'large'}
          />
        </View>
        {message.image_id === 'photo' ? null : (
          <StoryPreview
            onCloseComment={onCloseComment}
            showAvatarText={false}
            unPressedBorderColor={'transparent'}
            pressedBorderColor={'transparent'}
            style={{
              zIndex: 10,
              position: 'absolute',
              opacity: 0.0
            }}
            data={data}
            duration={15}
            onClosedStory={onClosedStory}
            avatarWrapperStyle={{
              width: message.comments.length > 0 ? 160 : 120,
              height: message.comments.length > 0 ? 160 : 44,
              zIndex: -1
            }}
            avatarImageStyle={{
              width: message.comments.length > 0 ? 160 : 120,
              height: message.comments.length > 0 ? 160 : 44,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            avatarFlatListProps={{}}
            from={message.comments.length > 0 ? false : true}
          />
        )}
      </View>
    </View>
  )
}

export default StoryMessage
