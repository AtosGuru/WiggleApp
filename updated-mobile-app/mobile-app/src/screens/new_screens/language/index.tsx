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
import GradientText from '../../../components/GradientText/GradientText'
import { LinearGradient } from 'react-native-linear-gradient'
import { languages } from '../../../constants/languages'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { setLang } from '../../../store/langSlice'

const { height, width } = Dimensions.get('screen')

function LanguageScreen(): JSX.Element {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const currLang = useSelector((root: RootState) => root.lang.currentLang)
  const handleBack = () => navigation.goBack()

  const { i18n, t } = useTranslation()
  const [lang, changeLang] = useState(currLang)

  const handleLanguageChange = currentLang => {
    changeLang(currentLang.value)
  }

  const handleSubmit = () => {
    dispatch(setLang(lang))
    i18n.changeLanguage(lang)
    handleBack()
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
                  {t('Language')}
                </Text>
              </View>
            </View>

            <View>
              {languages?.map((item, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent:
                        item.value === lang ? 'space-between' : 'flex-start'
                    }}
                    key={i}
                    onPress={() => handleLanguageChange(item)}>
                    <GradientText
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        flex: 1,
                        padding: 10
                      }}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={
                        item.value === lang
                          ? ['#FFCB52', '#FF7B02']
                          : ['#686868', '#686868']
                      }>
                      {item.label}
                    </GradientText>

                    {item.value === lang && (
                      <FastImage
                        style={{ width: 24, height: 24 }}
                        source={require('../../../../assets/icons/CheckPrimary.png')}
                      />
                    )}
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              width: '70%',
              height: 62,
              bottom: 120,
              alignSelf: 'center'
            }}>
            <LinearGradient
              colors={['#FFCB52', '#FF7B02']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                height: 62
              }}>
              <Text style={{ fontSize: 12 }}>{t('Done')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

export default LanguageScreen
