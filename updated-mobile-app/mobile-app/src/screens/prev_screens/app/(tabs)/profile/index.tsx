import Animated, {
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import {
  Pressable,
  ScrollView,
  StatusBar,
  useWindowDimensions
} from 'react-native'
import React, { useRef } from 'react'

import Colors from '../../../../../constants/Colors'
import { Connections } from '../../../../../components/ProfileTabs/connections'
import { Events } from '../../../../../components/ProfileTabs/events'
import FastImage from 'react-native-fast-image'
import { Flex } from '../../../../../components/utils/styled'
import PagerView from 'react-native-pager-view'
import { ProfilePhotoCarousel } from '../../../../../components/ProfilePhotoCarousel'
import { ProfileTab } from '../../../../../components/ProfileTabs/profile'
import { ScreenWrapper } from '../../../../../components/ScreenWrapper'
import { Tabs } from 'expo-router'
import { Text } from '../../../../../components'
import colors from '../../../../../constants/Colors'
import styled from 'styled-components/native'
import { usePageScrollHandler } from '../../../../../hooks/usePageScrollHandler'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../../../../state/user.atom'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const routes = [
  { key: 'profile', title: 'Information' },
  { key: 'friends', title: 'Friends' },
  { key: 'events', title: 'My Events' }
]

export default function Profile() {
  const { height } = useWindowDimensions()
  const user = useRecoilValue(userAtom)
  const pagerRef = useRef<PagerView>(null)
  const [index, setIndex] = React.useState(0)
  const tab = useSharedValue(0)
  const [animatedLineWidth, setAnimatedLineWidth] = React.useState(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tab.value <= 1 ? -tab.value * 250 : -250 }]
    }
  })

  const animatedLineStyles = useAnimatedStyle(() => {
    return {
      width: animatedLineWidth,
      backgroundColor: Colors.white,
      height: 1,
      transform: [
        {
          translateX: 6 * tab.value + tab.value * animatedLineWidth
        }
      ],
      bottom: 20,
      left: 23
    }
  })

  const pageScrollHandler = usePageScrollHandler(
    {
      onPageScroll: e => {
        'worklet'
        tab.value = e.offset + e.position
      }
    },
    []
  )

  return (
    <StyledScreenWrapper>
      <Tabs.Screen
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.black2,
            paddingHorizontal: 10,
            height: 76,
            borderTopWidth: 0
          }
        }}
      />
      <StatusBar
        barStyle={tab.value > 0.1 ? 'dark-content' : 'light-content'}
      />
      <Animated.View style={animatedStyles}>
        <ProfilePhotoCarousel user={user} />
      </Animated.View>
      <Animated.View style={[animatedStyles, { height: height }]}>
        <AnimatedPagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          onPageScroll={pageScrollHandler}
          onPageSelected={e => {
            setIndex(e.nativeEvent.position)
          }}>
          <ProfileTab key={'1'} />
          <Connections key={'2'} />
          <Events key={'3'} />
        </AnimatedPagerView>
      </Animated.View>
      <Flex
        row
        style={{
          position: 'absolute',
          bottom: 0,
          padding: 20,
          paddingTop: 10,
          backgroundColor: Colors.black2
        }}>
        <AnimatedActiveLine style={[animatedLineStyles]} />
        {routes.map((el, i) => {
          const focused = index === i
          return (
            <Pressable
              onPress={() => pagerRef.current?.setPage(i)}
              style={{ flex: 1 }}>
              <TabBarItem>
                <Text
                  style={{
                    color: 'white',
                    minWidth: 100,
                    textAlign: 'center',
                    marginBottom: 10
                  }}
                  font={focused ? 'Euclid-Bold' : 'Euclid-Light'}>
                  {el.title}
                </Text>
                <StyledLine
                  focused={false}
                  onLayout={({ nativeEvent }) =>
                    setAnimatedLineWidth(nativeEvent.layout.width)
                  }
                />
              </TabBarItem>
            </Pressable>
          )
        })}
      </Flex>
    </StyledScreenWrapper>
  )
}

const StyledScreenWrapper = styled(ScreenWrapper)`
  padding: 0;
`

const TabBarItem = styled.View`
  flex: 1;
  justify-content: center;
  margin: 0 3px;
`

const StyledLine = styled.View<{ focused: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 20;
`

const ActiveLine = styled(StyledLine)`
  background-color: ${Colors.white};
`

const AnimatedActiveLine = Animated.createAnimatedComponent(ActiveLine)
