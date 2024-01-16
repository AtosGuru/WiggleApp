import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    bottom: 0,
  },
  LinearGradient: {
    width: width,
    height: height / 6 - 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddPostBtn: {
    width: 64,
    height: 66,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  crossIcon: {
    width: 30,
    height: 30,
  },
});

export default styles;
