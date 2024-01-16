import { Dimensions, StyleSheet } from 'react-native'

const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({
  acceptBtnView: {
    paddingVertical: 6
  },
  declineBtnView: {
    paddingVertical: 6
  }, 
  backgroundImageWrapper: {
    width,
    height,
    position: 'absolute',
    backgroundColor: '#0F0F0F'
  },
  container: {
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
  },
  bgImageWrapper: {
    flex: 1,
    backgroundColor: '#0F0F0F'
  },
  wrapFill: {
    flex: 1,
    position: 'relative'
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 26,
    marginTop: 34
  },
  headerText: {
    fontSize: 15,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: '#ffffff'
  },
  headerIcon: {
    width: 24,
    height: 24
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: 'white',
    marginBottom: 13
  },
  notificationWrap: {
    flexDirection: 'row',
    marginBottom: 0,
    marginLeft: 3,
    padding: 12,
    borderRadius: 8
  },
  gradientWrap: {
    padding: 1,
    borderRadius: 40,
    height: 42,
    width: 44,
    marginRight: 16
  },
  notificationAvatarWrap: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    marginRight: 16,
    height: 40,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationAvatar: {
    width: 28,
    height: 22,
    marginBottom: 2
  },
  gradientText: {
    fontSize: 14,
    fontFamily: 'LeagueSpartan-Bold'
  },
  notificationText: {
    color: '#B0B0B0',
    fontSize: 14,
    lineHeight: 24,
    flex: 1,
    fontFamily: 'LeagueSpartan-Light'
  },
  notificationTime: {
    color: '#B0B0B0',
    fontFamily: 'LeagueSpartan-Medium',
    fontSize: 11
  },
  actionButtonWrap: {
    borderRadius: 8,
    marginRight: 8
  },
  actionButtonWrapSecondary: {
    borderRadius: 10,
    paddingHorizontal: 34,
    paddingVertical: 8,
    backgroundColor: '#191919'
  },
  actionButtonGradient: {
    borderRadius: 8,
    paddingHorizontal: 34,
    paddingVertical: 8
  },
  actionButtonText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'LeagueSpartan-Regular'
  },
  actionButtonsWrap: {
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-between'
  },
  confirmModalWrap: {
    flex: 1,
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalContainer: {
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 36,
    width: '80%'
  },
  confirmModalTextWrap: {
    marginBottom: 14,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20
  },
  confirmModalText: {
    fontSize: 16,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: 'white',
    width: 200,
    marginLeft: 10
  },
  computedText: {
    color: 'white',
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: 16
  },
  gradientView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 20
  },
  confirmModalGradientText: {
    fontSize: 16,
    fontFamily: 'LeagueSpartan-SemiBold',
    marginHorizontal: 5
  },
  confirmModalYesButton: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10
  },
  confirmModalNoButton: {
    width: '85%',
    alignSelf: 'center',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#686868',
    paddingVertical: 18
  },
  confirmModalYesButtonGradient: {
    width: '85%',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 12
  },
  confirmModalButtonText: {
    fontSize: 14,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: '#ffffff'
  },
  bottomDeleteButtonWrap: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomDeleteButton: {
    width: '50%',
    marginRight: 0
  },
  bottomDeleteButtonGradient: {
    paddingVertical: 18,
    width: 180
  }
})

export default styles
