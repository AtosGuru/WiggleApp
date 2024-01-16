import React, { FC, PropsWithChildren } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import { StyleProp, Text, TextStyle } from 'react-native'

type GradientTextProps = {
  start: {
    x: number
    y: number
  }
  end: {
    x: number
    y: number
  }
  colors: (string | number)[]
  style?: StyleProp<TextStyle>
}

const GradientText: FC<PropsWithChildren<GradientTextProps>> = props => {
  const { end, start, colors } = props

  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient colors={colors} start={start} end={end}>
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  )
}

export default GradientText
