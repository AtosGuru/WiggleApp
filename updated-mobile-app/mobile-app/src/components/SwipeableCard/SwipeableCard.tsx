import { Animated, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'

import FastImage from 'react-native-fast-image'
import NativeSwipeable from 'react-native-gesture-handler/Swipeable'

const SwipeableCard = props => {
  const {
    children,
    onRemove,
    onPress,
    onLongPress,
    style,
    activeOpacity,
    borderRadius,
    onSwipe,
    onSwipeBack
  } = props

  const handleSwipe = () => {
    onSwipe?.()
  }

  const handleSwipeBack = () => {
    onSwipeBack?.() // Trigger onSwipeBack callback if provided
  }

  return (
    <Swipeable
      onSwipeableClose={handleSwipeBack}
      onSwipeableRightOpen={handleSwipe}
      actionWidth="auto"
      rightActions={onClose => (
        <View
          style={{
            flexDirection: 'row'
          }}>
          <TouchableOpacity
            style={{
              height: '100%',
              width: 76,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: borderRadius || 8,
              paddingBottom: 16
            }}
            onPress={() => {
              onRemove?.()
              onClose()
            }}>
            <Text style={{ color: 'white', fontSize: 12, marginBottom: 6 }}>
              Delete
            </Text>
            <FastImage
              style={{
                width: 24,
                height: 24
              }}
              source={require('../../../assets/icons/TrashFilled.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      overshootRight={true}>
      <TouchableOpacity
        style={style}
        activeOpacity={activeOpacity || 1}
        onPress={onPress}
        onLongPress={onLongPress}>
        {children}
      </TouchableOpacity>
    </Swipeable>
  )
}

const Swipeable = props => {
  const {
    children,
    rightActions,
    leftActions,
    actionWidth = '20%',
    leftActionsContainerProps,
    rightActionsContainerProps,
    disabled,
    ...rest
  } = props

  const swipeableRow = useRef(null)

  const closeItems = () => swipeableRow.current.close()

  return (
    <NativeSwipeable
      ref={!disabled ? swipeableRow : undefined}
      renderRightActions={
        !disabled &&
        rightActions &&
        (progress => (
          <SwipeableItem
            progress={progress}
            onClose={closeItems}
            actionWidth={actionWidth}
            {...rightActionsContainerProps}>
            {rightActions}
          </SwipeableItem>
        ))
      }
      renderLeftActions={
        !disabled &&
        leftActions &&
        (progress => (
          <SwipeableItem
            progress={progress}
            onClose={closeItems}
            actionWidth={actionWidth}
            isLeft
            {...leftActionsContainerProps}>
            {leftActions}
          </SwipeableItem>
        ))
      }
      {...rest}>
      {children}
    </NativeSwipeable>
  )
}

const SwipeableItem = props => {
  const { progress, onClose, isLeft, actionWidth, style, children, ...rest } =
    props

  const [itemWidth, setItemWidth] = useState(0)

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [isLeft ? -itemWidth : itemWidth, 0]
  })

  const getItemWidth = event => setItemWidth(event.nativeEvent.layout.width)

  return (
    <Animated.View
      onLayout={getItemWidth}
      style={[
        {
          width: actionWidth,
          flexDirection: 'row',
          transform: [{ translateX }]
        },
        isLeft ? { marginRight: 10 } : { marginLeft: 10 },
        style
      ]}
      {...rest}>
      {children(onClose)}
    </Animated.View>
  )
}

export default SwipeableCard
