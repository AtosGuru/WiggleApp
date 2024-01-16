import {
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useMemo, useState } from 'react'

import FastImage from 'react-native-fast-image'
import GradientText from '../../../components/GradientText/GradientText'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { RootStackParamList } from '../../../RootNavigation'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { emailRegex } from '../../../constants/regex'
import { sendSupport } from '../../../api/support.methods'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

const primaryColors = ['#FFCB52', '#FF7B02']
const disableColors = ['#252525', '#252525']

function Support() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { params } = useRoute<RouteProp<RootStackParamList, 'support'>>()
  const user = useSelector((root: RootState) => root.auth.user)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: params?.isReport ? 'report' : 'support',
    description: ''
  })

  const handleBack = () => navigation.goBack()

  const onChangeFormData = (key: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSendSupport = async () => {
    const { description, email, name, type } = formData
    try {
      const res = await sendSupport({
        email,
        description,
        type,
        name,
        user_id: user?.id ?? null
      })
      console.log('resposn', res)
      if (navigation.canGoBack()) {
        navigation.goBack()
      }
    } catch (err) {
      console.log('err', err)
    }
  }

  const isFieldsValid = useMemo(() => {
    const isEmailValid = emailRegex.test(formData.email)
    const isNameValid = formData.name.length > 1
    const isDescriptionValid = formData.description.length > 1

    return isEmailValid && isNameValid && isDescriptionValid
  }, [formData])

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/eventBackground.png')}
      style={styles.imageBg}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={{ flex: 2 }}>
            <FastImage
              source={require('../../../../assets/icons/ArrowLeft.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerLabel}>
              {params?.isReport ? t('Report a problem') : t('Support')}
            </Text>
            <GradientText
              style={{ fontSize: 12 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={primaryColors}>
              {t('Get in Touch with us')}
            </GradientText>
          </View>
          <View style={{ flex: 2 }} />
        </View>
        {/* {MAIN CONTENT} */}
        <View style={{ flex: 1, padding: 24 }}>
          <Text style={styles.inputLabel}>{t('Name')}</Text>
          <TextInput
            placeholderTextColor="#686868"
            style={[styles.textInput, { marginBottom: 26 }]}
            onChangeText={text => {
              // Use a regular expression to allow only alphabetic characters (A-Z, a-z)
              const alphabeticText = text.replace(/[^A-Za-z\s]/g, '');;

              // Update the state with the filtered text
              onChangeFormData('name',  alphabeticText )
            }}
            value={formData.name}
          />

          <Text style={styles.inputLabel}>{t('Email')}</Text>
          <TextInput
            placeholderTextColor="#686868"
            style={[styles.textInput, { marginBottom: 26 }]}
            onChangeText={text => onChangeFormData('email', text)}
            value={formData.email}
          />

          <Text style={styles.inputLabel}>{t('Tell us about your issue')}</Text>
          <TextInput
            placeholderTextColor="#686868"
            style={[styles.textInput, styles.textArea]}
            onChangeText={text => onChangeFormData('description', text)}
            value={formData.description}
            multiline
            numberOfLines={12}
            blurOnSubmit
          />
          <TouchableOpacity
            onPress={handleSendSupport}
            disabled={!isFieldsValid}
            style={styles.primaryButton}>
            <LinearGradient
              colors={isFieldsValid ? primaryColors : disableColors}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.buttonGradient]}>
              <Text
                style={[
                  styles.buttonText,
                  { color: isFieldsValid ? 'black' : 'white' }
                ]}>
                {t('Confirm')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Support

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    backgroundColor: '#0F0F0F'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 50,
    marginTop: 36,
    paddingHorizontal: 24
  },
  headerLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    flex: 3
  },
  headerIcon: {
    width: 24,
    height: 24
  },
  inputLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 9
  },
  textInput: {
    backgroundColor: '#252525',
    borderRadius: 8,
    color: 'white',
    padding: 21,
    fontSize: 12
  },
  primaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    marginBottom: 18,
    alignSelf: 'center'
  },
  buttonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 62
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
    lineHeight: 15
  },
  textArea: {
    marginBottom: 26,
    textAlignVertical: 'top',
    flex: 1
  }
})
