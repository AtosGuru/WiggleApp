import Colors from '../../../../constants/Colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  primaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    marginBottom: 18
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
  },
  alignCenter: {
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: '#252525',
    borderRadius: 8,
    color: 'white',
    padding: 24,
    fontSize: 14,
    borderColor: 'red'
  },
  errorText: { color: 'red', fontSize: 12, fontWeight: '600', marginBottom: 26 }
})

export default styles
