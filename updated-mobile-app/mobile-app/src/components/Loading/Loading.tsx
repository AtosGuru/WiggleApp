import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native'

interface LoadingProps extends ActivityIndicatorProps {
  fill?: boolean
}

export const Loading = ({ fill = false, size = 'large', ...props }: LoadingProps) => {
  return (
    <View
      style={[
        { paddingVertical: 15 },
        fill && { flex: 1, alignItems: 'center', justifyContent: 'center' }
      ]}>
      <ActivityIndicator size={size} color="#FFCB52" {...props} />
    </View>
  )
}
