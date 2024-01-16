import React, {useMemo} from 'react';
import {View, Text, ImageBackground} from 'react-native';

import FastImage from 'react-native-fast-image';

import {IObject} from '../../../../types/utils';
import styles from './styled';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../RootNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const LocationHeader = (props: IObject) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const user = useSelector((root: RootState) => root.auth.user);
  let imgsrc = require('../../../../../assets/images/Cities/locationBackground.jpg')
  switch (user?.profile?.geolocation?.city) {
    case "Göteborg":
      imgsrc = require('../../../../../assets/images/Cities/Goteborg.jpg')
      break;
    case "Helsingborg":
      imgsrc = require('../../../../../assets/images/Cities/Helsingborg.jpg')
      break;  
    case "Kalmar":
      imgsrc = require('../../../../../assets/images/Cities/Kalmar.jpg')
      break;
    case "Linköping":
      imgsrc = require('../../../../../assets/images/Cities/Linkoping.jpg')
      break;
    case "Malmö":
      imgsrc = require('../../../../../assets/images/Cities/Malmo.jpg')
      break;
    case "Örebro":
      imgsrc = require('../../../../../assets/images/Cities/Orebro.jpg')
      break;
    case "Stockholm":
      imgsrc = require('../../../../../assets/images/Cities/Stockholm.jpg')
      break;
    case "Uppsala":
      imgsrc = require('../../../../../assets/images/Cities/Uppsala.jpg')
      break;
    case "Västerås":
      imgsrc = require('../../../../../assets/images/Cities/Vasteras.jpg')
      break;
    default:      
      break;
  }
  
  return (
    <View style={styles.locationContainer}>
      <ImageBackground
        source={imgsrc}
        style={styles.locationImage}
        imageStyle={styles.imageStyle}>
        <View style={styles.locationWrapper}>
          <FastImage
            source={require('../../../../../assets/icons/locationIcon.png')}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.location}>
            {props.location}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LocationHeader;
