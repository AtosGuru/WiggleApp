import React, { useEffect, useState } from 'react';
import { View, Dimensions, PanResponder, Animated, Easing, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import SwiperComponent from 'react-native-deck-swiper';
import FastImage from 'react-native-fast-image';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import GradientText from '../../../components/GradientText/GradientText';
import { styles } from './styled';
import Colors from '../../../constants/Colors';
import { useMutation, useQuery } from 'react-query';
import { QueryKey } from '../../../types/enum';
import { getDatings, getMyDatingProfile, getNears, sendDislikeDating, sendLikeDating } from '../../../api/dating.methods';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../RootNavigation';
import { convertImgToLink } from '../../../helpers/convertImgToLink';

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const DatingSwipeable = ({ id = 0, onClose, isDatings, openGoldPlan }: { id: number, onClose: () => void, isDatings: boolean }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const [activeImage, setActiveImage] = useState(0)
  const [cardIndex, setCardIndex] = useState(id)
  const [fadeInAnim] = useState(new Animated.Value(0))
  const [gestureStartY, setGestureStartY] = useState<number | null>(null);

  const { data: datingProfile } = useQuery(QueryKey.myDatingProfile, getMyDatingProfile)

  const hasGold = datingProfile?.user?.premium?.is_premium

  const { data: datings } = useQuery(QueryKey.datings, getDatings)
  const { data: nears } = useQuery(QueryKey.nears, getNears)

  const datingUsers = isDatings ? datings : nears

  const { mutate: sendLike } = useMutation(sendLikeDating)
  const { mutate: sendDislike } = useMutation(sendDislikeDating)

  const users = datingUsers?.datings

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 700,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [])

  const [isMoving, setIsMoving] = useState<number | boolean>(0)

  // set options to fix gesture event conflicts
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsMoving(true);
      },
      onPanResponderRelease: () => {
        setIsMoving(false);
      },
      onPanResponderTerminate: () => {
        setIsMoving(false);
      },
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
    })
  ).current

  // check if the last image is - then close the swiper
  const checkWhenBack = () => {
    if ((cardIndex + 1) === users.length) {
        onClose()
    }
  }

  const checkNoGoldSwipes = () => {
    if (!hasGold && cardIndex > 1) {
      onClose()
      openGoldPlan()
    }
  }

  // send like and check if the user liked you before
  const handleSendLikeAndCheckMatches = async (id: number) => {
    if (datingProfile?.likers?.some((e: User) => e.user_id === id)) {
      const user_avatar = datingProfile?.profile?.photos[0]
      const partner_avatar = users[cardIndex]?.profile.photos[0]
      await sendLike({
        id
      })
      navigation.navigate('dating_matches', {
        partner_id: id,
        user_avatar,
        partner_avatar
      })
      checkNoGoldSwipes()
      return onClose()
    } else {
      checkNoGoldSwipes()
      sendLike({
        id
      })
    }
  }

  // swipe right
  const handleYup = (index: number) => {
    const id = users[index].user_id
    handleSendLikeAndCheckMatches(id)
    setIsMoving(false)
    setCardIndex(index + 1)
    setActiveImage(0)
    checkWhenBack()
  }

  // swipe left
  const handleNope = (index: number) => {
    const id = users[index].user_id
    checkNoGoldSwipes()
    sendDislike({
        id
    })
    setIsMoving(false)
    setCardIndex(index + 1)
    setActiveImage(0)
    checkWhenBack()
  }

  // open the user profile and after like or
  // dislike return to the swipe and skip user
  const handleOpenProfile = () => {
    if (isMoving === 0) {
      const user = users[cardIndex]
      navigation.navigate('dating_profile', {
        id: user.user_id,
        handleBack: (isLike) => {
          if (isLike) {
            handleSwipeRight(user.user_id)
          } else {
            handleSwipeLeft(user.user_id)
          }
        }
      })
    } else {
      setIsMoving(0)
    }
  }

  const carouselRefs = users.map(() => React.useRef<ICarouselInstance | any>(null))
  const swiperRef = React.useRef<any>(null)

  // swiper and carousel images logic
  const handleLogic = (isTop?: boolean) => {
    const currentIndex = carouselRefs[cardIndex].current?.getCurrentIndex() ?? 0

    if (currentIndex <= users[cardIndex].profile.photos?.length) {
        if (currentIndex === 0) {
            setActiveImage(isTop ? 1 : users[cardIndex].profile.photos?.length - 1)
            carouselRefs[cardIndex].current[isTop ? 'next' : 'prev']();
        } else {
            const swipesMath = isTop ? currentIndex + 1 : currentIndex - 1
            if (users[cardIndex].profile.photos?.length === swipesMath) {
                setActiveImage(0)
                carouselRefs[cardIndex].current[isTop ? 'scrollTo' : 'prev']({ index: 0, animated: true })
            } else {
                setActiveImage(swipesMath)
                carouselRefs[cardIndex].current[isTop ? 'next' : 'prev']();
            }
        }
    } else {
        setActiveImage(0)
        carouselRefs[cardIndex].current.prev({ index: 0, animated: true })
    }
  }

  const handleTouchStart = (event: GestureResponderEvent) => {
    setGestureStartY(event.nativeEvent.locationY);
  }

  // open profile by touch
  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (gestureStartY !== null) {
      const gestureEndY = event.nativeEvent.locationY;
      const deltaY = gestureEndY - gestureStartY;
      if (deltaY > 100) {
        handleLogic()
      } else if (deltaY < -100) {
        handleLogic(true)
      }

      setGestureStartY(null);
      handleOpenProfile()
    }
  }

  // swipe left by button
  const handleSwipeLeft = async (id: number) => {
    setIsMoving(false)
    checkNoGoldSwipes()
    if (swiperRef.current) {
      sendDislike({
        id
      })
      await checkWhenBack()
      swiperRef.current?.swipeLeft()
    }
  }

  // swipe right by button
  const handleSwipeRight = async (id: number) => {
    setIsMoving(false)
    if (swiperRef.current) {
      handleSendLikeAndCheckMatches(id)
      await checkWhenBack()
      swiperRef.current?.swipeRight()
    }
  }

  // screen swipe tracking
  const onSwiping = (_: any, isRight: any) => {
    if (!isRight) {
      return setIsMoving(false)
    }
  }

  return (
      <Animated.View style={{ opacity: fadeInAnim }}>
        <View
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            {...panResponder.panHandlers}
            style={styles.swipeView}
        >
            <View>
            <View style={styles.indicators}>
                {users[cardIndex]?.profile.photos?.map((_: never, index: number) => (
                    users[cardIndex].profile.photos.length > 1 && <View
                    key={index}
                    style={{
                            ...styles.indicator,
                            backgroundColor: index === activeImage ? Colors.white : '#252525'
                    }}
                    />
                ))}
            </View>
        <SwiperComponent
            ref={swiperRef}
            cardIndex={cardIndex}
            cards={users}
            onSwipedLeft={handleNope}
            onSwipedRight={handleYup}
            onSwiping={onSwiping}
            stackSize={4}
            verticalSwipe={false}
            stackSeparation={-30}
            renderCard={(card: User, index) => (
                <Carousel
                    ref={carouselRefs[index]}
                    snapEnabled={false}
                    enabled={false}
                    loop
                    width={width}
                    height={height}
                    vertical
                    autoPlayInterval={2000}
                    scrollAnimationDuration={1000}
                    data={card?.profile?.photos}
                    style={{
                        borderRadius: 15,
                        width: width - 22,
                        backgroundColor: '#0F0F0F',
                        height: '93%'
                    }}
                    renderItem={({ item }) => (
                        <View style={{
                            width: width - 22,
                            height: height,
                            borderRadius: 15,
                        }}>
                            <FastImage source={{ uri: convertImgToLink(item) }} style={styles.image}>
                                {cardIndex === index && <View style={styles.card}>
                                      <View>
                                        <View style={styles.userInfo}>
                                            <View style={styles.profileContent}>
                                                <Text numberOfLines={1} style={styles.profileName}>{card?.profile.name}, {card?.profile.age}</Text>
                                                {card?.is_online && <View style={styles.onlineIndicator} />}
                                            </View>
                                            <Text numberOfLines={2} style={styles.profileDescription}>{card?.profile?.title}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        onPressIn={() => setIsMoving(false)}
                                        onPress={() => handleSwipeLeft(card.user_id)}
                                        style={styles.iconView}
                                    >
                                    <GradientText
                                        style={{
                                            fontSize: 24
                                        }}
                                        start={{ x: 1, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={['#FFCB52', '#FF7B02']}>
                                            ×
                                        </GradientText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPressIn={() => setIsMoving(false)}
                                        onPress={() => handleSwipeRight(card.user_id)}
                                        style={styles.iconView}
                                    >
                                        <FastImage
                                            source={require('../../../../assets/images/DatingHeart.png')}
                                            style={styles.heartIcon}
                                        />
                                    </TouchableOpacity>
                                    </View>
                                </View>}
                            </FastImage>
                        </View>
                    )}
                />
            )}
        />
        </View>
        </View>
      </Animated.View>
  )
}

export default DatingSwipeable;