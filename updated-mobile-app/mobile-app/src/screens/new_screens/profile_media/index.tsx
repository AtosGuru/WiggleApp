import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import ProfileMediaForm from '../../../domains/Profile/components/ProfileMediaForm/ProfileMediaForm'
import styles from './styled'
import { useTranslation } from 'react-i18next'

import React = require('react')

function ProfileMediaScreen(): JSX.Element {
  const onKeyboardDismiss = () => Keyboard.dismiss()
  const { t } = useTranslation()

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../../assets/images/search_background.png')}
      style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <SafeAreaView style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onKeyboardDismiss}
            style={{ height: '100%' }}>
            <StatusBar barStyle={'light-content'} />
            <View style={{ marginBottom: 30 }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>
                {t('Welcome to')}
              </Text>
              <Text
                style={{
                  fontSize: 32,
                  color: 'white',
                  fontWeight: '800',
                  textTransform: 'uppercase'
                }}>
                wiggle
              </Text>
            </View>
            <ProfileMediaForm />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default ProfileMediaScreen
