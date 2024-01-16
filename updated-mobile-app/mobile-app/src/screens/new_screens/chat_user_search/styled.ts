import { Dimensions, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window')
export default StyleSheet.create({
  backgroundImageWrapper: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#0F0F0F',
    width: width,
    height: height
  },
  headerContainer: {
    marginBottom: 22,
    marginHorizontal: 10
  },
  headerContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 22
  },
  greeting: {
    // marginBottom: 8,
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    maxWidth: '50%'
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
    width: 65,
    height: 65
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
    width: 50,
    height: 50
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
    fontWeight: '400',
    fontSize: 16
  },
  messageUsername: {
    color: '#686868',
    fontWeight: '400',
    fontSize: 14
  },
  messageTime: {
    color: '#686868',
    fontWeight: '400',
    fontSize: 10
  }
})
