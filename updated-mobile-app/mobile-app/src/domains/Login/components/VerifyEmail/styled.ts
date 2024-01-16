import Colors from '../../../../constants/Colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
    color: Colors.black,
    fontSize: 12,
    lineHeight: 15
  }
})

export default styles
