import Colors from '../../../constants/Colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  // info
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

  // media
  uploaderWrapper: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 18,
    width: '100%',
    justifyContent: 'space-between'
  },
  imageUploader: {
    width: 'auto',
    flex: 1,
    height: 94,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  image: {
    width: 24,
    height: 24,
    resizeMode:"contain",
  },
  avatarUploader: {
    width: 96,
    height: 96,
    backgroundColor: '#252525',
    borderRadius: 48,
    marginBottom: 42
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12
  },
  trashIcon: { width: 14, height: 14 },
  avatarTrashIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  trashIconWrapper: {
    borderRadius: 14,
    backgroundColor: '#252525',
    padding: 6,
    position: 'absolute',
    top: 12,
    right: 12
  },

  // uploading modal
  button: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 24
  },
  btnText: { fontSize: 12, color: '#ffffff' },
  overlay: {
    flex: 1,
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 34,
    paddingBottom: 30,
    paddingTop: 34,
    width: '70%'
  },
  buttonContainer: {
    flexDirection: 'column'
  },
  confirmButton: {
    backgroundColor: '#252525'
  },
  titleWrapper: { marginBottom: 24, alignItems: 'center' },
  editPicturesContinueBtn: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1
  },
  backBtn: {
    padding: 5,
    flex: 1,
    width: '36%'
  },
  editProfileView: {
    fontSize: 20,
    fontWeight: '500',
    color: '#ffffff',
    width: '64%'
  }
})

export default styles
