import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  arrowIcon: {
    width: 24,
    height: 24,
  },
  wrapper: {
    position: 'absolute',
    zIndex: 1
  }
});

export default styles;
