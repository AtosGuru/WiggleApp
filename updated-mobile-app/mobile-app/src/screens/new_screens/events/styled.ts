import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  // events
  backgroundImageWrapper: {
    width,
    height,
    position: 'absolute',
    backgroundColor: '#0F0F0F'
  },
  scrollContainer: {
    // paddingHorizontal: 8,
    paddingBottom: 40
  },
  container: {
    paddingBottom: 40,
    paddingTop: 50
  },
  paddingView: {
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 22
  },
  wrapper: { height: height, width: width },
  headerWrapper: { marginBottom: 30, marginHorizontal: 10 },
  text: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14
  },
  button: {
    borderRadius: 100,
    overflow: 'hidden',
    width: 112
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12
  },
  buttonText: { color: '#FFFFFF', fontSize: 12, lineHeight: 15 },

  // events list
  eventWrapper: {
    position: 'relative',
    width: '100%',
    height: 220,
    justifyContent: 'flex-end'
  },
  eventBgImageWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#0F0F0F'
  },
  eventBgImage: { width: '100%', height: '100%' },
  badge: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d0d0d033',
    backgroundColor: '#000000',
    position: 'absolute',
    top: 12,
    left: 20,
    borderRadius: 50
  },
  badgeText: { fontSize: 18, fontWeight: '600', color: 'white' },
  contentWrapper: {
    position: 'relative',
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 14
  },
  descriptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  descriptionBackground: {
    backgroundColor: '#ffffff33',
    width: 1,
    height: 50,
    marginRight: 14
  },
  data: {
    color: 'white',
    fontSize: 11,
    fontWeight: '300',
    lineHeight: 18
  },
  time: {
    color: 'white',
    fontSize: 11,
    fontWeight: '300',
    lineHeight: 18
  },

  // header
  headerContainer: {},
  headerContent: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 22
  },
  greeting: {
    marginBottom: 8,
    fontSize: 18,
    fontFamily: 'LeagueSpartan-SemiBold',
    color: '#ffffff',
    maxWidth: width / 2
  },
  locationWrapper: { flexDirection: 'row', justifyContent: 'center' },
  locationIcon: { width: 12, height: 'auto', marginRight: 8 },
  location: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'LeagueSpartan-SemiBold',
    maxWidth: width / 2
  },
  actionsWrapper: { flexDirection: 'row', alignItems: 'center' },
  notificationBtn: {
    padding: 8,
    backgroundColor: '#252525',
    marginRight: 14,
    borderRadius: 38,
    position: 'relative'
  },
  notificationIcon: { width: 22, height: 22 },
  notificationIndicator: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#F3D385',
    position: 'absolute',
    top: 10,
    right: 10
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  searchWrapper: { position: 'relative', justifyContent: 'center' },
  searchInput: {
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: 150,
    paddingVertical: 15,
    paddingHorizontal: 56,
    color: 'white',
    fontFamily: "LeagueSpartan-Regular",
    height: 58
  },
  searchIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16
  },
  filterBtn: { position: 'absolute', right: 16 },
  filterIcon: {
    width: 24,
    height: 24
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
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 36,
    paddingBottom: 36,
    paddingTop: 8,
    width: '68%'
  },
  message: {
    fontSize: 18,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  logo: { height: 100, width: 100 },
  logoWrapper: { alignItems: 'center', marginBottom: 4 },
  modalText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 34
  },
  btnText: { fontSize: 12, color: '#ffffff', fontWeight: '600' },
  gradientButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'LeagueSpartan-SemiBold'
  }
})

export default styles
