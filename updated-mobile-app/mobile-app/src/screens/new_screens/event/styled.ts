import { Dimensions, StyleSheet } from 'react-native'

import Colors from '../../../constants/Colors'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  scrollView: { height: height / 2, position: 'relative' },
  sliderImg: { height: height / 2, width: width },
  scrollWrapper: { height: height / 2, width: width, marginBottom: 62 },
  indicatorWrapper: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    bottom: '38%',
    gap: 12
  },
  indicator: {
    width: 6,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5
  },
  offset: { marginBottom: 24 },
  alignCenter: { alignItems: 'center' },
  loginMethods: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12
  },
  textWrapper: { position: 'absolute', bottom: 30, left: 20, zIndex: 2 },
  contentWrapper: { flex: 1, margin: 20 },
  primaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    marginBottom: 18
  },
  secondaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    backgroundColor: '#252525',
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#686868',
    marginHorizontal: 5
  },
  dividerContent: {
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
    marginHorizontal: 10
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 19,
    height: 19
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 100
  },
  submitButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '70%',
    height: 62,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20
  },
  submitGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    height: 62
  }
})

export default styles
