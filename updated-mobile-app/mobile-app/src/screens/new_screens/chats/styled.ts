import { Dimensions, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window')
export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  cameraIcon: {
    width: 21,
    height: 21,
    marginBottom: 5
  },
  emptyListText: {
    fontSize: 12,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: 'white'
  },
  wiggleLogo: {
    width: 100,
    height: 100
  },
  chatListView: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  activeUserView: {
    position: 'relative',
    marginRight: 10,
    marginTop: 20
  },
  listFooterStyling: {
    height: 90
  },
  cameraView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: -10,
  },
  backgroundImageWrapper: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#0F0F0F',
    opacity: 0.5,
    width: width,
    height: height
  },
  headerContainer: {
    paddingHorizontal: 20
  },
  headerContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 22,
    alignItems: 'center'
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff'
  },
  locationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  locationIcon: {
    width: 12,
    height: 'auto',
    marginRight: 8
  },
  activeUserIcon: {
    width: 50,
    height: 50,
    borderRadius: 65,
    marginRight: 8
  },
  location: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    maxWidth: '50%'
  },
  actionsWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notificationBtn: {
    padding: 8,
    backgroundColor: '#252525',
    marginRight: 14,
    borderRadius: 38,
    position: 'relative'
  },
  notificationIcon: {
    width: 22,
    height: 22
  },
  notificationIndicator: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#F3D385',
    position: 'absolute',
    top: 10,
    right: 10
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 25
  },
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center'
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: 150,
    paddingVertical: 18,
    paddingHorizontal: 56,
    color: 'white'
  },
  searchIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16
  },
  filterBtn: {
    position: 'absolute',
    right: 16
  },
  filterIcon: {
    width: 24,
    height: 24
  },
  badgeWrap: {
    position: 'absolute',
    width: 21,
    height: 21,
    backgroundColor: '#FFCB52',
    borderRadius: 11
  },
  badgeText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center'
  },
  messageText: {
    color: 'white',
    fontFamily: 'LeagueSpartan-Regular',
    fontSize: 16
  },
  messageUsername: {
    color: '#686868',
    fontFamily: 'LeagueSpartan-Regular',
    fontSize: 14,
    marginBottom: 6
  },
  messageTime: {
    color: '#686868',
    fontFamily: 'LeagueSpartan-Regular',
    fontSize: 10,
  },
  onlineBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#31FF10',
    position: 'absolute',
    bottom: 0,
    right: 10
  }
})
