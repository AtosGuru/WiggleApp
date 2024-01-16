import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  tabContainer: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  shadowContainer: {
    position: 'absolute',
    height: 80,
    width: '100%',
    justifyContent: 'center',
    bottom: 0,
    shadowOffset: { width: 2, height: 4 }
  },
  buttonContainer: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 37, 37, 1)',
    paddingBottom: 8
  },
  focusButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 28,
    width: 28,
    marginBottom: 0
  },
  badgeWrapper: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  addContainer: {
    zIndex: 4,
    position: 'absolute',
    bottom: 30,
    width: 58,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54
  },
  addWrapper: {
    width: 75,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  svgWrapper: { position: 'absolute', zIndex: 2 },
  selectedWrapper: {
    zIndex: 4,
    position: 'absolute',
    bottom: 50,
    width: 58,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 54
  },
  selectedIconWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 54,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 37, 37, 1)'
  },
  gradientText: {
    fontSize: 12,
    paddingTop: 40,
    zIndex: 4,
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-Medium'
  }
})

export const svgProps = {
  d: `M75 0v80 H0V0 0 7.4 3.1 7.9 7.1C12 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 35.8-24.9.5-0 3.9-7.1 7.9-7.1h-.1z`,
  fill: 'rgba(37, 37, 37, 1)'
}
