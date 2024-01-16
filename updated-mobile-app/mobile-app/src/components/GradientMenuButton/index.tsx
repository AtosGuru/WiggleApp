import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

type Props = {
  onPress: () => void
  label: string
  isActive: boolean
}

const width = Dimensions.get('screen').width

export const GradientMenuButton = ({ label, onPress, isActive }: Props) => {
  const gradientColors = isActive
    ? ['#FFCB52', '#FF7B02']
    : ['#252525', '#252525']

  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <LinearGradient
        style={styles.gradient}
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
    height: 41,
    minWidth: width/3 - 16,
    marginRight: 4
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white'
  }
})
