import { Dimensions, StyleSheet } from 'react-native';

import Colors from '../../../../constants/Colors';

const height = Dimensions.get("screen").height

const styles = StyleSheet.create({
  container: {
    height: height / 1.5
  },
  primaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    alignSelf: 'center',
  },
  buttonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 62,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 12,
    lineHeight: 15,
  },
  buttonText2: {
    color: "#FFFFFF",
    fontSize: 12,
    lineHeight: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 8,
    padding: 22,
    borderColor: 'red',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: 'white',
  },
  textInput: {
    backgroundColor: '#252525',
    borderRadius: 8,
    color: 'white',
    padding: 21,
    fontSize: 14,
  },
  emailErrorText: { color: 'red', fontSize: 9 },
});

export default styles;
