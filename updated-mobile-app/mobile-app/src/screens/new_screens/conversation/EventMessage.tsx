import {
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
  Linking,
  ActivityIndicator
} from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import { IMessage } from 'react-native-gifted-chat'
import Hyperlink from 'react-native-hyperlink'

import { Loading } from '../../../components/Loading'

import StoryPreview from '../stories'

import styles from './styled'
import { convertImgToLink } from '../../../helpers/convertImgToLink'

const { height, width } = Dimensions.get('screen')

import { getEventById } from '../../../api/events.methods'
import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { QueryKey } from '../../../types/enum'
import { getUserById } from '../../../api/user.methods'

type DisplayData = {
  title: string
  location: string
  date: string
  time: string
  about: string
  rating: number | string
}

export interface EventMessageProps {
  message?: IMessage
}

export const EventMessage = ({ message }: EventMessageProps) => {
  const {
    data: eventData,
    refetch,
    isLoading: isEventLoading
  } = useQuery(message?._id, () => getEventById(message.eventId ?? 0), {
    enabled: message.eventId != ''
  })

  const validEventData: DisplayData = useMemo(() => {
    return {
      title: eventData?.title ?? '',
      location: eventData?.location.title ?? '',
      date: eventData?.schedule?.opening_hours?.special_days
        ? eventData?.schedule?.opening_hours?.special_days[0]?.date
        : '',
      time: eventData?.schedule?.opening_hours?.special_days
        ? `${
          eventData?.schedule?.opening_hours?.special_days[0]?.open
              ?.time || ''
          } - ${
            eventData?.schedule?.opening_hours?.special_days[0]?.close
              ?.time || ''
          }`
        : '',
      about: eventData?.description ?? '',
      rating: '',
      imageId: convertImgToLink(eventData?.image_id)
    }
  }, [eventData])

  const isViewed = false

  const { t } = useTranslation()

  return (
    <View
      style={{
        padding: 6,
        alignSelf: message.sender === 'user1' ? 'flex-end' : 'flex-start'
      }}>
      {isEventLoading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            padding: 8,
            borderRadius: 8
          }}>
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
              padding: 0,
              borderRadius: 17,
              maxWidth: width * 0.7,
              width: 210,
              height: 150
            }}>
            <View
              style={{
                height: 97,
                width: 183,
                borderRadius: 13,
                marginTop: 15
              }}>
              <FastImage
                source={{ uri: validEventData.imageId }}
                style={{ flex: 1, borderRadius: 13 }}
              />
              <FastImage />
              <FastImage
                source={require('../../../../assets/images/event_tem_logo.png')}
                style={{
                  position: 'absolute',
                  width: 24,
                  height: 24,
                  marginTop: 10,
                  marginLeft: 10
                }}
              />
              <FastImage />
            </View>
            <View style={{height: 38, width: 183, marginTop: 15}}>
              <Hyperlink linkStyle={{ fontWeight: 'bold' }}>
                <Text
                  style={[
                    {
                      color: '#fff',
                      fontSize: 15,
                      fontFamily: 'LeagueSpartan-Regular',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      alignContent: 'flex-start'
                    }
                  ]}>
                  {validEventData.title}
                </Text>
              </Hyperlink>
            </View>
          </LinearGradient>
          <ActivityIndicator size={'small'} color={'black'} />
        </View>
      )}
    </View>
  )
}

export default EventMessage
