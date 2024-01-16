import { Dimensions, StyleSheet } from 'react-native'

const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  backgroundImageWrapper: {
    width,
    height,
    position: 'absolute',
    backgroundColor: '#0F0F0F'
  },
  container: {
    paddingHorizontal: 8,
    paddingBottom: 18,
    paddingTop: 20
  },
  wrapper: { height: height, width: width },
  button: {
    borderRadius: 9,
    overflow: 'hidden',
    width: 112
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600'
  }
})

export default styles
