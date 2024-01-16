import { Dimensions, StyleSheet } from 'react-native'

import Colors from '../../../../constants/Colors'

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
  },
  textInput: {
    backgroundColor: '#252525',
    borderRadius: 8,
    color: 'white',
    padding: 24,
    fontSize: 14
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 8,
    padding: 22,
    borderColor: 'red'
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'white'
  }
})

export default styles
