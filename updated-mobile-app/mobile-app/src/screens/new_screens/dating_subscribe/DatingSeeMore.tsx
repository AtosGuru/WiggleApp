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

export const DatingSeeMore = (props) => {
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
                  <Text style={styles.subtitle}>You need</Text>
                  <GradientText
                      style={styles.subtitle}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      colors={['#FFCB52', '#FF7B02']}>
                      WIGGLE GOLD
                  </GradientText>
                  <Text style={styles.subtitle}>to see more users</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleOpenPlan}
                    style={styles.primaryButton}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradient}>
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>BUY NOW</Text>
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