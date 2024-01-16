import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  appleSocialAuth,
  facebookSocialAuth,
  googleSocialAuth
} from '../../api/socialAuth'
import { User } from '../../types/user.interface'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/auth'
import Toast from 'react-native-toast-message'

const loginMethods = [
  {
    name: 'google',
    img: require('../../../assets/images/googleLogo.png'),
    show: true,
    onPress: async () => {
      const user = await googleSocialAuth()
      return user
    }
  },
  {
    name: 'apple',
    img: require('../../../assets/images/appleLogo.png'),
    show: Platform.OS === 'ios',
    onPress: async () => {
      const user = await appleSocialAuth()
      return user
    }
  },
  {
    name: 'facebook',
    img: require('../../../assets/images/facebookLogo.png'),
    show: true,
    onPress: async () => {
      const user = await facebookSocialAuth()
      return user
    }
  }
]

export const AuthSocialButtons = () => {
  const dispatch = useDispatch()
  const handleSocialLogin = (userData: User | null | undefined) => {
    if (userData) {
      dispatch(setUserData(userData))
    } else {
      Toast.show({
        text1: 'Auth failed',
        type: 'error'
      })
    }
  }

  return (
    <View style={styles.loginMethods}>
      {loginMethods.map(method =>
        method.show ? (
          <TouchableOpacity
            style={styles.circleButton}
            key={method.name}
            onPress={async () => {
              const user = await method.onPress()
              handleSocialLogin(user)
            }}>
            <FastImage source={method.img} style={styles.icon} />
          </TouchableOpacity>
        ) : null
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 19,
    height: 19
  },
  loginMethods: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40
  }
})
