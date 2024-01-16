import { StyleSheet } from 'react-native'

const dynamicStyles = props => {
  const { isTimerEnds } = props || {}

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 28,
      marginTop: 24,
      justifyContent: 'space-between'
    },
    timerText: {
      color: 'white',
      fontSize: 18
    },
    resendText: {
      fontSize: 14,
      fontWeight: '600',
      color: isTimerEnds ? 'white' : 'rgba(104, 104, 104, 1)'
    }
  })
}

export default dynamicStyles
