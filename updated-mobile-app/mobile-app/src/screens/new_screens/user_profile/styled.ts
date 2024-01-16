import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

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
    paddingTop: 30
  },
  wrapper: { height: height, width: width },
  button: {
    width: 112,
    backgroundColor: 'black'
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600'
  },

  // Modal
  modalBtn: {
    flex: 1,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center'
  },
  overlay: {
    flex: 1,
    backgroundColor: '#252525B3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    backgroundColor: '#252525',
    borderRadius: 20,
    padding: 28,
    width: '60%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  btnText: { fontSize: 14, color: '#ffffff', fontWeight: '600' },
  gradientButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  }
})

export default styles
