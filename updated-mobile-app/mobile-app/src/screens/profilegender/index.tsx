import React = require('react');
import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

import SignUpGenderInfo from '../../domains/Profile/components/SignUpGenderInfo/SignUpGenderInfo';

import styles from './styled';

function SignUpGenderScreen(): JSX.Element {
  const {t} = useTranslation();
  const onKeyboardDismiss = () => Keyboard.dismiss();

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../../../assets/images/search_background.png')}
      style={styles.backgroundContainer}>
      <SafeAreaView style={styles.wrapper}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity activeOpacity={1} onPress={onKeyboardDismiss}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>{t('Welcome to')}</Text>
              <Text style={styles.wiggleText}>wiggle</Text>
            </View>
            <SignUpGenderInfo />
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default SignUpGenderScreen;
