import {
  Dimensions,
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
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const { height, width } = Dimensions.get('screen')

function FilterScreen(): JSX.Element {
  const navigation = useNavigation()

  const handleBack = () => navigation.goBack()
  const { t } = useTranslation()

  const [selectedKm, setSelectedKm] = useState(10) // Set your initial km value

  // Calculate the position of the circle based on the selectedKm value
  const circlePosition = ((selectedKm - 1) / 19) * (width / 2.4)

  // Function to calculate km value based on tap position
  const handleTap = xPosition => {
    const kmValue = Math.round((xPosition / (width / 2.4)) * 19) + 1
    setSelectedKm(kmValue)
  }

  return (
    <Fragment>
      <View
        style={{
          width,
          height,
          position: 'absolute',
          backgroundColor: '#0F0F0F'
        }}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <SafeAreaView>
        <View style={{ height: height, width: width }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingBottom: 100,
              paddingTop: 20
            }}
            showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={'light-content'} />

            {/* Header */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: 26
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                <TouchableOpacity onPress={handleBack}>
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
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#ffffff',
                    flex: 1,
                    textAlign: 'center',
                    paddingRight: 24
                  }}>
                  {t('Filter')}
                </Text>
              </View>
            </View>

            <View style={{ rowGap: 42 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                  style={{ width: 24, height: 24, marginRight: 14 }}
                  source={require('../../../../assets/icons/LocationFilled.png')}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#ffffff',
                    fontWeight: '600',
                    flex: 1
                  }}>
                  {t('Location')}
                </Text>
                {/* SELECT */}
                <TouchableOpacity
                  style={{ borderRadius: 100, overflow: 'hidden', width: 112 }}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 12,
                      flexDirection: 'row',
                      gap: 10
                    }}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 15,
                        fontWeight: '600'
                      }}>
                      Canada
                    </Text>
                    <FastImage
                      style={{ width: 14, height: 8 }}
                      source={require('../../../../assets/icons/Vector.png')}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <FastImage
                  style={{ width: 24, height: 24, marginRight: 14 }}
                  source={require('../../../../assets/icons/Gps.png')}
                />

                <Text
                  style={{
                    fontSize: 15,
                    color: '#ffffff',
                    fontWeight: '600',
                    flex: 1
                  }}>
                  {t('By Radius')}
                </Text>
                <View style={{ position: 'relative' }}>
                  <View
                    style={{
                      height: 1,
                      width: width / 2.4,
                      alignSelf: 'center',
                      backgroundColor: '#ffffff'
                    }}>
                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        paddingHorizontal: 46
                      }}
                    />
                  </View>
                  <View style={{ position: 'absolute', alignItems: 'center' }}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 16,
                        top: -8,
                        left: circlePosition
                      }}>
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 16
                        }}
                      />
                    </LinearGradient>
                    <Text
                      style={{
                        color: '#ffffff',
                        marginTop: 8,
                        top: -8,
                        left: circlePosition
                      }}>
                      {selectedKm}km
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: 0,
                      right: 0,
                      height: 32,
                      zIndex: 1,
                      opacity: 0
                    }}
                    onPress={e => handleTap(e.nativeEvent.locationX)}>
                    <View style={{ flex: 1 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

export default FilterScreen
