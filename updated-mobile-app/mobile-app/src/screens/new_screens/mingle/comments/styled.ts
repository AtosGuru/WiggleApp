import {Dimensions, StyleSheet, Platform} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black'
  },

  container: {
    height: 'auto',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    bottom: 0,
  },

  // header

  headerContainer: {
    alignItems: 'center',
    marginHorizontal: 26,
    marginTop: 52,
    marginBottom: 26
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
  },
  // header
  bodyContainer: {
    alignItems: "center",
    flex: 1
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 107,
    marginTop: 5,
  },
  content: {
    minHeight: 103,
    width: width - 25,
    marginVertical: 10,
    flexDirection: 'row',
  },
  profileView: {
    width: '12%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 30,
  },
  myProfileView: {
    width: '12%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 30,
    marginTop: -20
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 20
  },
  contentView: {
    width: '88%',
    backgroundColor: '#252525',
    borderRadius: 10,
  },
  info: {
    flexDirection: 'row',
  },
  userName: {
    fontSize: 10,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fff',
  },
  userInfo: {
    width: '50%',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  creationInfo: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  createdAtText: {
    fontSize: 8,
    color: '#686868',
  },
  createdAtView: {
    paddingTop: 10,
    marginRight: 5,
    width: 'auto',
  },
  moreButton: {
    paddingTop: 10,
    width: '10%',
    marginLeft: 7,
    zIndex: Platform.OS == 'ios' ? -1 : 1,
  },
  closeIconButton: {
    padding: 5,
    marginRight: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dotIconImage: {
    height: 4,
    width: 16,
    tintColor: '#d9d9d9',
  },
  postInfo: {
    paddingHorizontal: 15,
    paddingTop: 5,
    zIndex: Platform.OS == 'ios' ? -1 : 0,
  },
  postText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  toggleView: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 8,
    width: '60%',
  },
  toggleIcons: {
    height: 15,
    width: 15,
    tintColor: '#fff',
  },
  toggleIconsNot: {
    height: 15,
    width: 15,
    tintColor: '#000',
  },
  toggleBaseIcons: {
    height: 15,
    width: 15,
  },
  toggleText: {
    fontSize: 10,
    color: '#1B1B1B',
    fontWeight: '600',
  },
  toggleButtonView: {
    width: '20%',
    alignItems: 'flex-start',
  },

  mainContainer: {
    backgroundColor: '#252525',
    opacity: 0.9,
    width: '100%',
    top: "20%",
    height: Platform.OS == "ios" ? height + 210 : height,
    alignItems: 'center', 
  },

  addCommentMainContainer: {    
    width: width - 25,
    paddingBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',        
    flexDirection: 'row',
  },
  addCommentModalContainer: {      
      borderRadius: 10,
      backgroundColor: '#252525',
      width: "88%"
  },  
  addCommentTextInput: {
      fontSize: 12,      
      paddingLeft: 20,
      color: '#ffffff'
  },
  addCommentTextInputcontainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '93%',
      alignSelf: 'center',
  },
  addCommentBtnView: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center'
  },
  addCommentTextInputView: {
      justifyContent: 'center',
      height: 45,
      alignSelf: 'center',
      width: '85%',
  },
  addCommentBtnImage: {
      width: 24,
      height: 24
  },
  addCommentBtn: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  addCommenterrorMsg: {
      zIndex: 1,
      bottom: 50,
      position: "absolute"
  },
  addCommentErrorText: {
      color: '#FE1515',
      fontSize: 10
  }


});

export default styles;
