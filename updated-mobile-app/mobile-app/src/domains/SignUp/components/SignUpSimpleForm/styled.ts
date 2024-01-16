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
  },
  textInput: {
    backgroundColor: '#252525',
    borderRadius: 8,
    color: 'white',
    padding: 21,
    fontSize: 14
  },
  errorText: { color: 'red', fontSize:9, position:"absolute", bottom:"-19%" },
  emailErrorText : { color: 'red', fontSize:9 ,bottom:"2.9%" }
})

export default styles
