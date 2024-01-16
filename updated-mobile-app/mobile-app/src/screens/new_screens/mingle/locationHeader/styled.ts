import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  locationContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop:20,
    zIndex: -1,
    marginTop: 30,
    marginBottom: 10
  },
  locationImage: {
    width: width - 25,
    height: 180,
    resizeMode: 'contain',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  imageStyle: {borderRadius: 10},
  locationTotalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',    
  },
  locationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignItems: 'center',
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 7,
    fontWeight: '600',
  },
  location: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    maxWidth: width / 2,
  },  
});
export default styles;
