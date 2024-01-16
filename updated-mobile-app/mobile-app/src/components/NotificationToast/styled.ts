import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    // paddingVertical: 2,
    zIndex: 10
  },
  touchable: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    minHeight: 40
  },
  text: {
    color: '#ffffff',
    flex: 1
  }
})

export default styles
