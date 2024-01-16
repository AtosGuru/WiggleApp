import React from 'react';
import {
  TouchableOpacity
} from 'react-native';

import FastImage from 'react-native-fast-image';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../RootNavigation';
import styles from './styled';
import { IObject } from '../../../../types/utils';
import { View } from 'lucide-react-native';

const BackButton = (props: IObject) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <TouchableOpacity onPress={handleBack} style={styles.wrapper}>
      <FastImage
        source={require('../../../../../assets/icons/ArrowLeft.png')}
        style={[styles.arrowIcon, {marginTop: props?.top, marginLeft: props?.left}]}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
