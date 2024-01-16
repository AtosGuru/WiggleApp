import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fragment, useState} from 'react';

import Carousel from 'react-native-reanimated-carousel';
import Colors from '../../constants/Colors';
import FastImage from 'react-native-fast-image';
import {LinearGradient} from 'react-native-linear-gradient';
import styles from './styled';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {LinearTextGradient} from 'react-native-text-gradient';
import React = require('react');
import {ScrollView} from 'react-native-gesture-handler';
import Slider from 'react-native-slider';
import MapboxGL, {Logger} from '@rnmapbox/maps';
export default function Onboarding() {
  const {t} = useTranslation();
  const [value, setValue] = useState<any>();
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiZGV0c3VtaSIsImEiOiJjbGxnaXZta3QwZGg5M2RtcGNkaWk5a242In0.FHD8TFpuSK8qJxmqNjfSww',
  );
  const imagesMap = [
    require('../../../assets/images/Onboarding1.png'),
    require('../../../assets/images/Onboarding2.png'),
    require('../../../assets/images/Onboarding3.png'),
    require('../../../assets/images/Onboarding4.png'),
  ];

  const {width, height} = Dimensions.get('screen');

  const [step, setStep] = useState(0);

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          width,
          height,
          position: 'absolute',
          backgroundColor: '#0F0F0F',
        }}>
        <FastImage
          source={require('../../../assets/images/eventBackground.png')}
          style={{width, height}}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.scrollWrapper}>
          <Carousel
            width={width}
            height={height / 2.2}
            vertical
            autoPlay
            data={imagesMap}
            autoPlayInterval={5000}
            scrollAnimationDuration={200}
            onSnapToItem={index => setStep(index)}
            renderItem={({item}) => (
              <FastImage source={item} style={styles.sliderImg} />
            )}
          />

          {/* Image indicators */}
          <View style={styles.indicatorWrapper}>
            {imagesMap.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {backgroundColor: index === step ? 'white' : 'gray'},
                ]}
              />
            ))}
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
            }}>
            <View style={styles.textWrapper}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
                {t('Lookas Wookie')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',

                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                    fontWeight: '800',
                    margin: 2,
                  }}>
                  Trädgår'n
                </Text>

                <Image
                  style={{
                    width: 30,
                    height: 30,
                    alignSelf: 'flex-end',
                    left: 130,
                  }}
                  source={require('../../../assets/icons/eighteen.png')}></Image>
              </View>

              <Text
                style={{
                  fontSize: 14,
                  color: '#FFCB52',
                  fontWeight: '800',
                  margin: 3,
                }}>
                28
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontWeight: '800',
                  margin: 3,
                }}>
                May
              </Text>
            </View>
          </View>

          <LinearGradient
            colors={['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 1)']}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              position: 'absolute',
              width: width,
              height: 64,
              bottom: -1,
              zIndex: 2,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'column', width: '60%'}}>
              <Text style={{color: '#FFCB52', left: 10}}>Tuesday</Text>
              <Text style={{color: '#FFCB52', left: 10}}>22:00-03:00</Text>
            </View>
            <View
              style={{
                width: '40%',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../assets/icons/Vector.png')}></Image>
                <Text style={{color: '#FFCB52', fontSize: 8}}>488</Text>
                <Text style={{color: '#fff', fontSize: 9}}>Pre-check</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../assets/icons/TagUser.png')}></Image>
                <Text style={{color: '#FFCB52', fontSize: 8}}>284</Text>
                <Text style={{color: '#fff', fontSize: 9}}>At-the club</Text>
              </View>
            </View>
          </View>

          <Slider
            style={{width: 300, alignSelf: 'center'}}
            thumbTintColor="#FFCB52"
            minimumTrackTintColor="#FFCB52"
            maximumTrackTintColor="#FF7B02"
            value={value}
            onValueChange={value => setValue(value)}
          />

          <View style={{width: '80%', alignSelf: 'center'}}>
            <Image
              style={{width: 300, height: 60}}
              source={require('../../../assets/icons/peopleGroup.png')}></Image>
          </View>
          <View style={{width: '80%', alignSelf: 'center', margin: 10}}>
            <Text style={{color: '#fff', fontSize: 12}}>About this Event</Text>
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#252525',
              borderRadius: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 14, padding: 10}}>
              Neverland is a Thameside haven complete with white sand, past
              el-perfect beach huts and, of course, those Instagram-ready rope
              swings beach huts and, of course, those Instagram-ready rope
              swings, course, Read More
            </Text>
          </View>
          <Image
            style={{
              width: 200,
              height: 50,
              alignSelf: 'center',
              marginTop: 30,
            }}
            source={require('../../../assets/icons/groupButton.png')}></Image>
        </View>
      </View>

      <ImageBackground
        source={require('../../../assets/images/eventBackground.png')}
        style={{backgroundColor: '#0F0F0F'}}>
        <MapboxGL.MapView
          centerCoordinate={[18.0686, 59.3293]} // dummy coordinates
          styleURL="mapbox://styles/detsumi/clm5z4nyw00wf01r47opf0y2c"
          showsMyLocationButton={true}
          style={{
            width: '80%',
            height: 200,

            alignSelf: 'center',
          }}>
          <MapboxGL.Camera
            zoomLevel={15.9}
            bearing={40}
            centerCoordinate={[18.0686, 59.3293]}
            pitch={18}
            heading={120}
            animationMode={'flyTo'} // Use 'flyTo' for smooth animation
            animationDuration={5000} // Animation duration in milliseconds
          />
        </MapboxGL.MapView>
        <View style={{height:100}}></View>
      </ImageBackground>
    </ScrollView>
  );
}
