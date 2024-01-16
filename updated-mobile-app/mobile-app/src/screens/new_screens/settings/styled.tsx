import { StyleSheet, Dimensions } from 'react-native';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;


const styles = StyleSheet.create({
  backgroundImageWrapper: {
    width,
    height,
    position: 'absolute',
    backgroundColor: '#0F0F0F',

  },
  container: {
    paddingHorizontal: 30,
    paddingBottom: 100,
    paddingTop: 20
  },
  wrapper: { height: height, width: width },
  selectWrapper: {
    height: 32,
    backgroundColor: '#252525',
    flexDirection: 'row',
    width: '50%',
    borderRadius: 5,
    marginLeft: 47
  },
  privateButtonGradientWrap: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center'
  },
  deleteAccountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#686868',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    flex: 1
  },

  //header

  headerContainer: {
    alignItems: 'center',
    marginBottom: 26,
  },
  headerContent: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
    paddingRight: 24,
  },

  //avatar
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 150,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 20,
  },
  username: {
    fontSize: 14,
    color: '#686868',
    flex: 1,
  },
  editIcon: {
    width: 24,
    height: 24,
  },

  //dating

  datingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datingIcon: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
  datingText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    flex: 1,
  },
  infoIconContainer: {
    borderWidth: 1,
    borderColor: '#252525',
    alignSelf: 'center',
    borderRadius: 100,
    marginRight: 5,
    padding: 3,
    backgroundColor: '#252525',
  },
  infoIcon: {
    width: 12,
    height: 12,
  },
  toggleSwitch: {
    width: 38,
    height: 18,
    borderRadius: 9,
    overflow: 'hidden',
  },
  linearGradient: {
    width: 38,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 2,
  },
  toggleOn: { flexDirection: 'row' },
  toggleOff: {
    flexDirection: 'row',
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 8,
    paddingRight: 5,
    paddingTop: 2
  },
  toggleLeftText: {
    color: '#ffffff',
    fontSize: 8,
    paddingLeft: 4,
    paddingTop: 2
  },
  toggleIndicator: {
    backgroundColor: '#ffffff',
    width: 14,
    height: 14,
    borderRadius: 7
  },
  //private 

  privateContainer: {
    flexDirection: 'column',
  },
  privateHeader: {
    flexDirection: 'row',
  },
  privateIcon: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
  privateLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    color: "#fff"
  },
  privateSelectWrapper: {
    height: 32,
    backgroundColor: '#252525',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    marginLeft: 47,
  },
  selectButton: {
    width: '50%',
  },
  ButtonGradientWrap: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  privateSelectText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  //language 
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIcon: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
  languageInfo: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 6,
  },
  languageText: {
    fontSize: 14,
    color: '#686868',
    flex: 1,
  },

  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
  settingNightIcon: {
    width: 38,
    height: 38,
    marginRight: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    flex: 1,
  },

  //footer
  footerContainer: {
    alignItems: 'center',
  },
  logoutButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '60%',
  },
  logoutGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  logoutText: {
    color: '#000000',
    fontSize: 12,
  },
  content: { rowGap: 28, marginBottom: 28 },

  //deleteModal 

  deleteAccountContainer: {
    flex: 1,
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContainer: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 34,
    paddingBottom: 30,
    paddingTop: 34,
    width: '80%',
    alignSelf: "center"
  },
  titleContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
  },
  titleText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 18,
    marginTop: 3
  },
  main:{
    width: "80%", backgroundColor: "#000",
    borderRadius: 20
  },
  boldTitleText: {
    fontWeight: '600',
  },
  goldText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
    marginTop:3
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmButton: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonGradient: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  deleteAnywayButton: {
    backgroundColor: '#252525',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteAnywayButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  //deleteconfirmationModal


  confirmationContainer: {
    flex: 1,
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationModalContainer: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 34,  
    paddingBottom: 35,
    paddingTop: 30,
    width: width-70,
    justifyContent:"center",
    alignItems:"center"
  },
  confirmationTitleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  confirmationTitleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  confirmationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmationConfirmButton: {
    flex: 1,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmationConfirmButtonGradient: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmationConfirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  confirmationNoButton: {
    backgroundColor: '#252525',
    flex: 1,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmationNoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  //successs
  confirmationSuccessContainer: {
    flex: 1,
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationCloseButton: {
    position: 'absolute',
    zIndex: 100,
    right: 0,
    padding: 10,
  },
  confirmationCloseIcon: {
    width: 44,
    height: 44,
  },
  confirmationLogo: {
    width: 120,
    height: 120,
    resizeMode:"contain"
  },
  confirmationSuccessText: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 15,
    textAlign: 'center',
    fontFamily:"LeagueSpartan-SemiBold",
    lineHeight:14
  },
  backdropStyle:{
    backgroundColor: '#1b1b1bc9',
},
overlayStyle: {
  width: width,
  height: height,
  // flex:1
},

  //Info Modal
  infoModal: {
    position: 'absolute',
    width: 111,
    height: 60,
    backgroundColor: "#252525",
    borderRadius: 8,
    right: 0,
    bottom: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 10,
    color: '#fff',
    width: '90%'
  }
})


export default styles