import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  wrapper: {
    height: height,
    width: width
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginHorizontal: 20
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
  loginMethods: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40
  },
  signUpWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
})

export default styles
