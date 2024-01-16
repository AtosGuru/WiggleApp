import { LayoutAnimation, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import CustomTabItem from './TabItem'
import { logout } from '../../api'
import { setUserData } from '../../store/auth'
import styles from './styles'
import { useDispatch } from 'react-redux'

const BottomTabs = props => {
  const dispatch = useDispatch()

  const { state, navigation, colorTitle } = props
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState(null)

  const stateIndex = state.index
  const customRoutes = [...state.routes]
  const routesCount = customRoutes.length

  const handleItemPress = _routeName => {
    const params = { prevRouteName: customRoutes[stateIndex]?.name }
    navigation.navigate(_routeName, params)
  }
  const getIsFocus = (routeIndex, _routeName) => {
    return state.routes[routeIndex].name === _routeName
  }

  const renderTabItem = (route, index) => (
    <CustomTabItem
      key={index}
      focus={getIsFocus(stateIndex, route.name)}
      routeName={route.name}
      selectedScreen={selectedScreen}
      onPress={handleItemPress}
      customRoutes={customRoutes}
      setSelectedScreen={setSelectedScreen}
    />
  )

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      LayoutAnimation.linear()
      setIsMenuVisible(false)
    })

    return blur
  }, [isMenuVisible, navigation])

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      LayoutAnimation.linear()
      setIsMenuVisible(true)
    })

    return focus
  }, [isMenuVisible, navigation])

  return (
    <>
      <View style={styles.shadowContainer}>
        <View style={styles.tabContainer}>
          {customRoutes.map(renderTabItem)}
        </View>
      </View>
    </>
  )
}

export default BottomTabs
