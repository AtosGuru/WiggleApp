import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0F0F0F',
   
  },
  textInputStyle: {
    flex: 1,
    borderRadius: 15,
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'LeagueSpartan-Regular'
  },
  textMessageStyle: {
    fontFamily: 'LeagueSpartan-Light',
    fontSize: 10
  },
  headerName: {
    fontSize: 16,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: '#ffffff'
  },

  chatContainerStyle: {
    height: Dimensions.get('window').height - 150
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
    backgroundColor: '#000000B3',
    alignItems: 'flex-end'
  },
  alertContainer: {
    backgroundColor: '#252525',
    borderRadius: 20,
    padding: 28,
    width: '60%',
    top: '8%',
    right: 60
  },
  messageInputBox: {
    borderRadius: 15,
    backgroundColor: '#252525',
    borderTopWidth: 0,
    marginHorizontal: 32,
    marginBottom: 36,
    height: 70,
    position: "relative",
    bottom: 50
  },
  sendAndCameraView: {
    height: '105%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullImageView: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullImage: {
    width: '90%',
    height: '100%',
    borderRadius: 20
  },
  photoModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 37, 37, 1)',
    opacity: 0.9
  }
})

export default styles
