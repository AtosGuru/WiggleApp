import {StyleSheet, Dimensions} from 'react-native';
const Height = Dimensions.get('screen').height;
const Width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  bgImageWrapper: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  wrapFill: {
    flex: 1,
    position: 'relative',
  },
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center',
    marginHorizontal: 21,
    marginTop: 30,
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: 150,
    paddingVertical: 18,
    paddingHorizontal: 56,
    color: 'white',
  },
  searchIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
  userSearchItemContainer: {
    position: 'relative',
    flex: 1,
    height: 158,
    marginBottom: 6,
    overflow: 'hidden',
    maxWidth: 116
  },
  userSearchItemDots: {
    position: 'absolute',
    padding: 16,
    right: 0,
    zIndex: 1,
  },
  userSearchItemDotsIcon: {
    width: 16,
    height: 4
  },
  userSearchItemImage: {
    width: '100%',
    height: 158,
    borderRadius: 18,
  },
  userSearchItemGradient: {
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 0,
    borderRadius: 18,
  },
  userSearchItemTextContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    zIndex: 1,
    maxWidth: 90
  },
  userSearchItemText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  userSearchItemTextSecondary: {
    color: 'white',
    fontWeight: '300',
    fontSize: 12,
  },
  userList: {
    marginHorizontal: 21,
    marginTop: 24,
    marginBottom: 100
  },
  userListColumn: {
    gap: 6,
  },
  container: {
    flex: 1,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Height - 320,
    width: Width - 100,
    alignSelf: 'center',
  },
  image: {
    width: 102,
    height: 113,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontFamily: "LeagueSpartan-Regular"
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '70%',
    height: 40,
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
  },
});

export default styles;
