import {Dimensions, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: 'rgba(15, 15, 15, 1)',
    height: height,
    width: width,
  },
  scrollView: {height: height / 2.2, position: 'relative'},
  sliderImg: {height: height / 2.2, width: width},
  scrollWrapper: {height: height / 2.2, width: width},
  indicatorWrapper: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    bottom: '30%',
    gap: 12,
  },
  indicator: {
    width: 6,
    height: 30,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  offset: {marginBottom: 24},
  alignCenter: {alignItems: 'center'},
  loginMethods: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  textWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    zIndex: 2,

    width: '50%',
  },
  contentWrapper: {flex: 1, margin: 20},
  primaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    marginBottom: 18,
    flexDirection: 'column',
  },
  secondaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    backgroundColor: '#252525',
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 62,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 12,
    lineHeight: 15,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#686868',
    marginHorizontal: 5,
  },
  dividerContent: {
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
    marginHorizontal: 10,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 19,
    height: 19,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 100,
  },
  flex: {flex: 1},
  bg: {
    width,
    height,
    position: 'absolute',
    backgroundColor: '#0F0F0F',
  },
  eventView: {
    width: '100%',
    flexDirection: 'row',
  },
  clubText: {fontSize: 16, color: 'white', fontWeight: '500'},
  clubEvent: {
    flexDirection: 'row',
    width: '90%',

    justifyContent: 'space-between',
  },
  eventText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '800',
    margin: 2,
  },
  img18: {
    width: 30,
    height: 30,
    alignSelf: 'flex-end',
    left: 130,
  },
  eightText: {
    fontSize: 14,
    color: '#FFCB52',
    fontWeight: '800',
    margin: 3,
  },
  mayText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '800',
    margin: 3,
  },
  gradient: {
    position: 'absolute',
    width: width,
    height: 64,
    bottom: -1,
    zIndex: 2,
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  people: {flexDirection: 'column', width: '60%'},
  time: {color: '#FFCB52', left: 10},
  groupView: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  centerView: {flexDirection: 'column', alignItems: 'center'},
  icon2: {width: 20, height: 20},
  groupcount: {color: '#FFCB52', fontSize: 8},
  groupCount2: {color: '#fff', fontSize: 9},
  TagUser: {flexDirection: 'column', alignItems: 'center'},
  EventMangr: {width: '80%', alignSelf: 'center'},
  peopleImage: {width: 300, height: 60},
  aboutEvent: {width: '80%', alignSelf: 'center', margin: 10},
  aboutText: {color: '#fff', fontSize: 12},
  dummyText: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#252525',
    borderRadius: 20,
  },
  neverView: {color: '#fff', fontSize: 14, padding: 10},
  groupButton: {
    width: 200,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
  },
  map: {
    width: '80%',
    height: 200,

    alignSelf: 'center',
  },
  h:{height: 200},
  bg:{backgroundColor: '#0F0F0F'}
});

export default styles;
