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
  editProfileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 20,

  },
  editProfileSide: {
    marginHorizontal: 24,
    minWidth: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  cameraIcon: {
    width: 24,
    height: 24
  },
  flex: {
    flex: 1
  },
  chkInView: { alignItems: 'center' },
  chkIn: { flexDirection: 'row', gap: 28 },
  chkInText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4
  },
  userProfile: {
    marginBottom: 40,
    width: "100%",
    flexDirection: "row",
  },
  followerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4
  },
  followView: {
    flexDirection: 'row',
    gap: 17,
    marginBottom: 28
  },
  headerView: { alignItems: 'center', marginBottom: 24 },
  headerInnerView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 12,
    zIndex: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 0
  },
  arrowImage: {
    width: 24,
    height: 24
  },
  shareImage: {
    width: 44,
    height: 44
  },
  galleryView: { marginBottom: -64, alignItems: 'center' },
  linearGallery: {
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 54,
    borderBottomRightRadius: 54
  },
  carousel: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 54,
    borderBottomRightRadius: 54
  },
  carouselImage: { width: '100%', height: '100%' },
  headerScroll: {
    paddingHorizontal: 24,
    paddingBottom: 80
  },
  AvatarView: {
    flex: 3,
    backgroundColor: '#0F0F0F',
    marginBottom: 20,
    paddingTop: 16,
    paddingHorizontal: 8,
    borderRadius: 150
  },
  avatarImg: {
    width: 150,
    height: 150,
    flex: 1,
    borderRadius: 150
  },
  galleryListView: {
    position: 'absolute',
    flexDirection: 'row',
    top: 12
  },
  myaccountTouchable: {
    position: 'absolute',
    top: 260,
    right: 0,
    backgroundColor: '#252525',
    padding: 10,
    borderRadius: 44
  },
  firstNametext: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10
  },
 otheruserText:{
  color:'#686868',
  fontSize:10,
  marginBottom:15,
  
 },

  storiesMain: {
    flex: 1,
    marginBottom: 40,
    paddingHorizontal: -24
  },
  storiesText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 16,
    fontWeight: '600'
  },
  userView: { marginHorizontal: -30 },
  storiesProfile: {
    flexDirection: 'row',
    columnGap: 20,
    marginHorizontal: 30
  },
  linearStories: {
    padding: 2,
    borderRadius: 8
  },
  storiesTouchable: {
    overflow: 'hidden',
    borderRadius: 8
  },
  imageBg: {
    width: 87,
    height: 117
  },
  storiesInnerView: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden'
  },
  plusImage: {
    width: 22,
    height: 22,
    alignSelf: 'flex-end',
    borderRadius: 8,
    zIndex: 1
  },
  avatarWrapperStyle: {
    width: 87,
    height: 117,
    borderRadius: 8,
    zIndex: -1,
  },
  avatarImageStyle: {
    width: 84,
    height: 113,
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scroll: { marginHorizontal: -30 },
  emptyView: {
    flexDirection: 'row',
    columnGap: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linerStyle: {
    borderRadius: 10,
    height: 118,
    width: 89.8,
    borderWidth: 1.3,
    borderColor: "transparent",
  },
  nostoriesView: {
    borderRadius: 10,
    height: 117,
    width: 87,
    backgroundColor: '#252525',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: "#252525",
    justifyContent: 'center',
    alignItems: 'center'
  },
  addstory: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addStoryTextView: { width: '58%', marginLeft: 11 },
  taptoAdd: { fontSize: 8, color: '#686868' },
  addIcon: {
    width: 22,
    height: 22,
    alignSelf: 'flex-end',
    borderRadius: 8,
    zIndex: 1
  },
  useStoriesButton: {
    zIndex: 1,
    top: -34,
    right: 5
  },
  plusStoryButton: {
    width: 22,
    height: 22,
    alignSelf: 'flex-end',
    borderRadius: 8,
    zIndex: 1
  },
  storiesCameraView: {
    width: 84,
    height: 25,
    marginLeft: 13
  },
  pastEventWrapper: { flex: 1, marginBottom: 40 },
  pastEventText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600'
  },
  directionRow: {
    flexDirection: 'row'
  },
  postMap: { position: 'relative' },
  postMapImg: {
    width: width - 100,
    height: 124,
    borderRadius: 26
  },
  clubsView: {
    position: 'absolute',
    bottom: 18,
    left: 18
  },
  clubsName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white'
  },
  clubDate: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white'
  },
  clubPhotos: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 16,
    fontWeight: '600'
  },
  galleryWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6
  },
  galleryContainer: {
    borderRadius: 10,
    width: width / 3 - 26,
    height: width / 3 - 26
  },
  galleryContainerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
})

export default styles
