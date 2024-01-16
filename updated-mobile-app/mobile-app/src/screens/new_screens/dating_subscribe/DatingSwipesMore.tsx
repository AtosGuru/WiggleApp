import React, { Fragment, useState } from 'react'
import {
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
  } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styled'
import FastImage from 'react-native-fast-image'
import GradientText from '../../../components/GradientText/GradientText'
import { useNavigation } from '@react-navigation/native'
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet'

export const DatingSwipesMore = (props) => {
    const { visible, onCancel, onPlanOpen } = props

    const navigation = useNavigation()

    const handleOpenPlan = () => {
        onCancel()
        onPlanOpen()
    }
    return (
        <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.overlay}>
            <View>
              <View style={{ ...styles.alertContainer, width: WINDOW_WIDTH - 104 }}>
                  <FastImage
                      source={require('../../../../assets/images/newLogo.png')}
                      style={{ width: 102, height: 113 }}
                  />
                <View style={styles.titleWrapper}>
                  <Text style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: 14
                  }}>Sorry, You have exceeded your free weekly swipe limit!</Text>
                </View>
                <Text style={styles.subtitle}>Get</Text>
                <GradientText
                    style={{ ...styles.subtitle, marginVertical: 20 }}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FFCB52', '#FF7B02']}>
                    WIGGLE GOLD
                </GradientText>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleOpenPlan}
                    style={styles.primaryButton}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradient}>
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Get Wiggle Gold</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
}