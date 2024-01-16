import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import DatingSwipeable from '../dating_swipeable'
import { DatingProps } from './interface'
import UsersList from './components/UsersList'
import Matches from './components/Matches'
import Header from './components/Header'
import NearList from './components/NearList'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../../RootNavigation'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import DatingSubscribe from '../dating_subscribe'
import { DatingSeeMore } from '../dating_subscribe/DatingSeeMore'
import { DatingSwipesMore } from '../dating_subscribe/DatingSwipesMore'

function DatingScreen({ setHideBottomTabs }: DatingProps): JSX.Element {
  const route = useRoute<RouteProp<RootStackParamList, 'dating'>>()

  const user = useSelector((root: RootState) => root.dating.user)

  const hasGold = user?.user?.premium?.is_premium

  const [step, setStep] = useState(1)
  const [swipeId, setSwipeId] = useState(0)
  const [isOpenSwipe, setIsOpenSwipe] = useState(false)

  const [isOpenGoldPlan, setIsOpenGoldPlan] = useState(false)
  const [isSeeMore, setIsSeeMore] = useState(false)
  const [isSwipeMore, setIsSwipeMore] = useState(false)

  useEffect(() => {
    if (route?.params?.step) {
      setStep(route?.params.step)
    }
  }, [route])

  const handleOpenSwipeable = (id: number) => {
    setHideBottomTabs(true)
    setIsOpenSwipe(true)
    setSwipeId(id)
  }

  const handleCloseSwipeable = () => {
    setHideBottomTabs(false)
    setIsOpenSwipe(false)
  }

  const handleChangeStep = (step: number) => {
    setStep(step)
    if (isOpenSwipe) {
      setHideBottomTabs(false)
      setIsOpenSwipe(false)
    }
  }

  const backgroundImage = require('../../../../assets/images/eventBackground.png')

  const handleOpenGoldPlan = () => setIsOpenGoldPlan(true)
  const handleOpenSeeMore = () => setIsSeeMore(true)
  const handleOpenSwipeMore = () => setIsSwipeMore(true)

  return (
    <FastImage
      resizeMode="cover"
      source={backgroundImage}
      style={{
        backgroundColor: step === 3 ? 'black' : '#0F0F0F',
        height: '100%',
      }}
    >
      <SafeAreaView>
        <DatingSeeMore visible={isSeeMore} onPlanOpen={handleOpenGoldPlan} onCancel={() => setIsSeeMore(false)} />
        <DatingSwipesMore visible={isSwipeMore} onPlanOpen={handleOpenGoldPlan} onCancel={() => setIsSwipeMore(false)} />
        <DatingSubscribe visible={isOpenGoldPlan} onCancel={() => setIsOpenGoldPlan(false)} />
        <Header step={step} isOpenSwipe={isOpenSwipe} onSwipeClose={handleCloseSwipeable} changeStep={handleChangeStep} />
        <View>
          {isOpenSwipe ? <DatingSwipeable isDatings={step === 1} id={swipeId} onClose={handleCloseSwipeable} openGoldPlan={handleOpenSwipeMore} /> :
          step === 1 ? <UsersList openSwipes={handleOpenSwipeable} openGoldPlan={handleOpenSeeMore} /> :
          step === 2 && <NearList openSwipes={handleOpenSwipeable} openGoldPlan={handleOpenSeeMore} />}
          {step === 3 && <Matches />}
        </View>
        {!hasGold && !isOpenSwipe && (step === 1 || step === 2) && <TouchableOpacity
            onPress={handleOpenGoldPlan}
            style={{
              overflow: 'hidden',
              position: 'absolute',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              bottom: '20%',
            }}
        >
            <LinearGradient
                colors={['#FFCB52', '#FF7B02']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  height: 50,
                  width: 192,
                  borderRadius: 10,
                }}
            >
            <Text style={{
              fontSize: 12,
              color: 'white'
            }}>Upgrade Now to finish!</Text>
            </LinearGradient>
        </TouchableOpacity>}
      </SafeAreaView>
    </FastImage>
  )
}

export default DatingScreen