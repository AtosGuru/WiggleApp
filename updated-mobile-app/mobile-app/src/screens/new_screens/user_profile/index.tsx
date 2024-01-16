import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { Fragment, useState } from 'react'

import Carousel from 'react-native-reanimated-carousel'
import FastImage from 'react-native-fast-image'
import GradientText from '../../../components/GradientText/GradientText'
import { LinearGradient } from 'react-native-linear-gradient'
import styles from './styled'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const { height, width } = Dimensions.get('screen')

function UserProfileScreen() {
  const navigation = useNavigation()
  // Mocked data
  const followers = 68
  const following = 1009
  const userPostsMap = [
    'https://s3-alpha-sig.figma.com/img/1abd/a25a/b895b95185c6d20426e710fb4ccbc39d?Expires=1691366400&Signature=jxfsz5Hrq-uE2BWkWNJbybfZJsRZ7Eo~9iYtLfZdLo~GIR71UpQ9PbqzBQGgARk~wM8Nu-m0uRRD0QKKxv1oaD2XDHH9LZbyMsJYd2hHd4i-riffyH6KT~gWWwgX3ycM1uGAovqEevGVlOw9LRgyyiydLxgjHy8739MMUzmGF0mP4MrRUsMyMaZxmSSEptI9OaOKuuwkC5yvQoh5E1~qChkdQ5NKRF5mu3~4zUoR2VZTWr68acBso8-h2Brzhurbsx85K~E3lnRKX3R0lGwIuezmYz1mhKNP4gmWBDw0KNEJkV2zx1NJLbtNJ874xk-gkZCmLI8C~34pVSR2F9xqgw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/c705/b199/189d19709e60751f8c18fed1615c9ea0?Expires=1691366400&Signature=jDh6VL2e3nb7KfUDrEXgX3mX7QOgnKIi1JOjtzTtqqWJpo-7T~Y9fZrjbat-PXpfxDGEed4aoiNIVs-2rkeWLhN59Upm4b4XUCSEAk2Rx5J4SoSPKi~PQP4vTS0EHgJDANmsbAUGX0GujOPlukE81VZ1Z3L4LO2Grebtz3cZ9E48lxl98nyCon09QxVYrij8oIXRYoXdY6A13EBxsOZdIHtkzrzCxWxlsfoaApiiwZOah~WHN4pwww7WAwtsrO1m9UzUPxKzHPCXE3AR7eXpRN0JIhacvb95hriX4dBaXAK9nbTD6E8ssw5IVk5D3UpFWnj3QP5brRMI-eGR8CovBQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/5e1e/b7f9/19fe1b9eeb81a96889d895699c502333?Expires=1691366400&Signature=UYi-2tgSknbPBqTBdzwsrVh8Pak-MvLTpJ-cwUoY7IKfOeni7IIUJ55DRkc9sqLJddPPKCMp8OM39TR6NOhB0VM6MS1niLw726WwOqOx-LEBVbBBRDNRsS4dn7RxtqJ6P5PFfh2gZikHmqEEZ1zHIbaUMK9gw8hT0knJbA1xGDiwU9tefUZseXXew2vPpZbtDuCsrcL2kMoqJRcDanbuVOdUQGaUNh21NBLpCAxE2zqsjCm40HV553KQBe5XYhpY6wg65BWdANSjEfG3JtiihZI-gKzrgRwMJUOTLSl7Vp-8eLD~Zadm28WwkSBowOHwPc5afWqkDDsrqobVH8xZ8g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/121d/8085/d7154ecef772ec6db1a57250d6aec21e?Expires=1691366400&Signature=iPup6pmO3kPWInD08OQheWh-c8i-WgeKtMAoBHCjUrVm7Xrl8hxvf6~6hUhxYBOWNrCQYD3L~pKC6MONsLqAq2ZJY1ZVA3wcb-rTD0R0vBAHEpvfJoc9qXWRfjyMpFEoq-R6LvYA3~~gRMTugsPBC4fRG~TOOLTg3ixx0OSwXkgw1IA8GvUX4rpBSdtWEz4k61iITcCwQCiWmwQ--cE0Q7IO5xVJc0sg3UdlegM5WdmKyMLDGglVCtFO6o5iN2t50l-~MuYySRopLz7ELN-NXTWZzsacqC94CPA1QkvLU4I~ELhgwBqHhKdNc6nXtEl-MEdbH4XDAa8x3N5kzh1A6g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/08f9/51cf/ac04a08af5149ab918721229cdb63c7f?Expires=1691366400&Signature=GXSYW~hy6rJBCD8~By8czYo1Q4Tdy1~Q47U5J2SBOUcJieSTBqh2AfiHVVpfpOXXkc6F0~e~x6go1H1OL15mv8ZSqguejF3zElzg8iHlHJ69KpYsuBuosBOJsJ8ihQD9uFDHq5LUvc47Xoo8BF2AcV5dhQK5WjIv78EjbD-ARmqe1vkH2mTArjmJ97nlZc7xigyaZ0howxSoTMY8PjvGaHUi9fyn~rwbx-B7rV4k3XT7us0Ou2nALyf5slU9XimQOuXl3fpCm2xp9R2DYlcPH~VY8akbjFWMsKuRP140YMA1RoMQkb4RFR9yAgMGoLiLcPCWO5Z6bA1K1HK4VAH9NQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/cf34/7636/7ae9ff5c1ef5d1ea7d5fe4e6a2d8b25a?Expires=1691366400&Signature=fYxJGh~7MJkaNVYFJngiOnpsgM4MkupYQiizOnfyB0WMGicT0VpYF4LZRRg-xWbnRmsGCqSTlQTlgraamS58fiWEVTN4cQSbHtuQh5hh1SHaMhtzhE0HBTZH-8iIewqUVV60yjbw6tTvjjL5DiWibmQpspMOdW21oV7zHzDCKQJbQ6v8Iv4MIAaaXu0IBGZewghcPTSnCFZUSvlkMSlpjdLtjr-YsRjFYJjaeid48SRuOnDmtfvWFrx-rkHGtsJLRjAx0erbvDkanfX9Fvt6J-sEqy~BMY2heOlbbwjzAciHG1m2EVvW62Bdz01vr8~5AqTDfFew8EEl1cifBn9gNA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    'https://s3-alpha-sig.figma.com/img/ceda/6d7b/39e478774252fdc1559c4b8cdf94a109?Expires=1691366400&Signature=TJL7AVokaTluTYelaZEXFPHPlqL-VpPsN7waekahpQ3qReWBnBWYx~PZEfbN3zj2ccolTekKmpharSuiBk~H0wXReKZ6jKOGRhNtewkdZybXjjDqFtDBeRQuYL1gS0f9seNDwPSls4kqLnHlO1T8qOGeDQCRVLaWCKUkpmvumeQQUeomEnKLqJt9Akw7e8Xzyk-0UqDa~2IcTEkh2i~abAXwWAhxqdUhAxl1-hgqXcLHmmjFFXRs8AtaC4eFjqjbgQA6pboEv5ka3hTF92RnJTbF7NUwOX8kgiSf6bhr7f05r3UfWtuhiD1WwRloQ0YuiFpnurve93F68ZGYKHsUpg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
  ]

  const photoGalleryData = [
    'https://eu-images.contentstack.com/v3/assets/blt781c383a1983f673/blt245c6742ee772ff8/621c7212e5e1d450f5065b23/FestivalImage.png?width=734&auto=webp&format=png',
    'https://xttrawave.com/wp-content/uploads/2019/05/20-Most-Popular-Music-Festivals-In-The-World-Right-Now4545.jpg',
    'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Lo4e47D0B4ZkUSefsHgsww.jpeg',
    'https://www.pioneerdj.com/-/media/pioneerdj/images/landing/beginners/2col-festival.jpg',
    'https://blog.adamhall.com/wp-content/uploads/2019/05/JulianHukePhotography-2321-620x414.jpg',
    'https://vikna.tv/wp-content/uploads/2022/01/31/zirka-na-sczeni-792x528.jpg'
  ]

  const userImagesMap = [
    'https://eu-images.contentstack.com/v3/assets/blt781c383a1983f673/blt245c6742ee772ff8/621c7212e5e1d450f5065b23/FestivalImage.png?width=734&auto=webp&format=png',
    'https://xttrawave.com/wp-content/uploads/2019/05/20-Most-Popular-Music-Festivals-In-The-World-Right-Now4545.jpg',
    'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Lo4e47D0B4ZkUSefsHgsww.jpeg',
    'https://www.pioneerdj.com/-/media/pioneerdj/images/landing/beginners/2col-festival.jpg'
  ]

  const [step, setStep] = React.useState(0)

  const handleBack = () => navigation.goBack()

  const userProps = {
    userImagesMap,
    step,
    setStep,
    handleBack,
    photoGalleryData,
    followers,
    following,
    userPostsMap
  }

  const isUserFollowed = true

  return (
    <Fragment>
      <View style={styles.backgroundImageWrapper}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={'light-content'} />

            <View
              style={{
                paddingHorizontal: 24,
                paddingBottom: 80
              }}>
              {isUserFollowed ? (
                <UserFollowedProfile {...userProps} />
              ) : (
                <UserPrivateProfile
                  step={step}
                  setStep={setStep}
                  handleBack={handleBack}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

function UserFollowedProfile(props) {
  const {
    userImagesMap,
    step,
    setStep,
    handleBack,
    photoGalleryData,
    followers,
    following,
    userPostsMap
  } = props

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  const { t } = useTranslation()

  return (
    <Fragment>
      {/* HEADER */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 12,
            zIndex: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 0
          }}>
          <TouchableOpacity onPress={handleBack} style={{ padding: 5 }}>
            <FastImage
              source={require('../../../../assets/icons/ArrowLeft.png')}
              style={{
                width: 24,
                height: 24
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: -64, alignItems: 'center' }}>
          <LinearGradient
            colors={['#ffffff', '#ffffff1A']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: '100%',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              borderBottomLeftRadius: 54,
              borderBottomRightRadius: 54
            }}>
            <Carousel
              overscrollEnabled={false}
              snapEnabled={false}
              enabled={false}
              loop
              width={width - 40}
              height={230}
              autoPlay={true}
              data={userImagesMap}
              autoPlayInterval={5000}
              scrollAnimationDuration={200}
              onSnapToItem={index => setStep(index)}
              style={{
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                borderBottomLeftRadius: 54,
                borderBottomRightRadius: 54
              }}
              // onSnapToItem={index => setStep(index)}
              renderItem={({ item }) => (
                <View>
                  <FastImage
                    source={{ uri: item }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              )}
            />
          </LinearGradient>

          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              top: 12
            }}>
            {userImagesMap.map((_, index) => (
              <View
                key={index}
                style={[
                  {
                    width: 30,
                    height: 6,
                    marginHorizontal: 8,
                    borderRadius: 4
                  },
                  {
                    backgroundColor:
                      index === step ? 'white' : 'rgba(104, 104, 104, 1)'
                  }
                ]}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: '#0F0F0F',
            marginBottom: 20,
            paddingTop: 16,
            paddingHorizontal: 8,
            borderRadius: 150
          }}>
          <FastImage
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/6d77/6600/697272d0900a13641f6be4266eb9d312?Expires=1691971200&Signature=XQSnFTrmcbvik2ZGeta3xeiACjUvfeiRlc9lvDIlI0WvBjMsI88MrOSTF7shzYmdGHYxZ5bcyWV4c0qZbtVD0v0PYS3G2ytlnWhvNElC8lp~eIGDdUuSQb5WPAX83mJsISY0sZQtvuH6vZKGC1gzfk9lLeOzxMR6YE5Guu4r1M-sBvNJkwGpRmwQcBsJVZh6L7Vc46sP3ULT6Tc4d2ViFAl~z1N0viPKBo8stGG1cOlp2yXF3tlTERiNmLlPqY~85MR7-UtiZ1aOpAQB2JFMRplUvbE5X-qoZJqIyd8PAJb74tX5KrxJU2dZvTX5CEdNxNXy~HXmJtaNyzI88x5zZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            }}
            style={{ width: 150, height: 150, flex: 1, borderRadius: 150 }}
          />
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 250,
            right: 0,
            padding: 10
          }}
          onPress={handleModalOpen}>
          <FastImage
            source={require('../../../../assets/icons/Dots.png')}
            style={{
              width: 20,
              height: 5
            }}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: 4
          }}>
          Jacob
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#686868',
            marginBottom: 16
          }}>
          Video Editor
        </Text>

        <View style={{ marginBottom: 28, gap: 18, flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={['#FFCB52', '#FF7B02']}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}>
              <Text style={styles.buttonText}>{t('Followed')}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#252525',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8
              }
            ]}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', gap: 28 }}>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: 4
              }}>
              {followers}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: 4
              }}>
              {t('Followers')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: 4
              }}>
              {following}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: 4
              }}>
              {t('Following')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* CONTENT */}
      <View style={{ flex: 1, marginBottom: 40, paddingHorizontal: -24 }}>
        <Text
          style={{
            fontSize: 14,
            color: '#ffffff',
            marginBottom: 16,
            fontWeight: '600'
          }}>
          {t('Stories')}
        </Text>
        <ScrollView
          horizontal={true}
          style={{ marginHorizontal: -30 }}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 20,
              marginHorizontal: 30
            }}>
            {userPostsMap.map((uri, index) => (
              <LinearGradient
                key={index}
                colors={['#FFCB52', '#FF7B02']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  padding: 2,
                  borderRadius: 50
                }}>
                <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                  <FastImage
                    key={index}
                    source={{ uri: uri }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                  />
                </View>
              </LinearGradient>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 1, marginBottom: 40 }}>
        <Text
          style={{
            fontSize: 14,
            color: '#ffffff',
            marginBottom: 16,
            fontWeight: '600'
          }}>
          {t('Past Events')}
        </Text>
        <ScrollView
          style={{ marginHorizontal: -30 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 20,
              paddingHorizontal: 30
            }}>
            {userPostsMap.map((uri, index) => (
              <View style={{ position: 'relative' }} key={index}>
                <FastImage
                  key={index}
                  source={{ uri: uri }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    width: width - 100,
                    height: 124,
                    borderRadius: 26
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 18,
                    left: 18
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: 'white'
                    }}>
                    Neverland Club
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: 'white'
                    }}>
                    28 May
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View>
        <Text
          style={{
            fontSize: 14,
            color: '#ffffff',
            marginBottom: 16,
            fontWeight: '600'
          }}>
          {t('Photos')}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 6
          }}>
          {photoGalleryData?.map((uri, index) => (
            <View
              key={index}
              style={{
                borderRadius: 10,
                width: width / 3 - 26,
                height: width / 3 - 26
              }}>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10
                }}
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: uri }}
              />
            </View>
          ))}
        </View>
      </View>

      <ActionModal onClose={handleModalClose} visible={isModalOpen} />
    </Fragment>
  )
}

const ActionModal = props => {
  const { visible, onClose } = props

  const [activeButtonIndex, setActiveButtonIndex] = useState(null)

  const computedColors = ['#FFCB52', '#FF7B02']
  const inactiveColors = ['#ffffff', '#ffffff']

  const { t } = useTranslation()

  const computedButtonColor =
    activeButtonIndex !== null ? ['#FFCB52', '#FF7B02'] : ['#686868', '#686868']

  const handleButtonClick = index => {
    setActiveButtonIndex(index)
  }

  const handleConfirm = () => {
    if (activeButtonIndex !== null) {
      const selectedButtonType =
        activeButtonIndex === 0 ? t('Block User') : t('Report a problem')
      onClose(selectedButtonType)
    }
    setActiveButtonIndex(null)
  }

  const computedReportIcon =
    activeButtonIndex === 1
      ? require('../../../../assets/icons/ReportPrimary.png')
      : require('../../../../assets/icons/Report.png')

  const computedBlockIcon =
    activeButtonIndex === 0
      ? require('../../../../assets/icons/BlockUserPrimary.png')
      : require('../../../../assets/icons/BlockUser.png')

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.alertContainer}>
              <TouchableOpacity
                onPress={() => handleButtonClick(0)}
                style={{
                  marginBottom: 30,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                <FastImage
                  source={computedBlockIcon}
                  style={{
                    width: 18,
                    height: 22,
                    marginRight: 18
                  }}
                />
                <GradientText
                  style={{
                    fontSize: 14,
                    lineHeight: 18,
                    fontWeight: '600'
                  }}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                    activeButtonIndex === 0 ? computedColors : inactiveColors
                  }>
                  {t('Block User')}
                </GradientText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleButtonClick(1)}
                style={{
                  marginBottom: 22,
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                <FastImage
                  source={computedReportIcon}
                  style={{
                    width: 18,
                    height: 18,
                    marginRight: 18
                  }}
                />
                <GradientText
                  style={{
                    fontSize: 14,
                    fontWeight: '600'
                  }}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                    activeButtonIndex === 1 ? computedColors : inactiveColors
                  }>
                  {t('Report a problem')}
                </GradientText>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleConfirm}
                  style={styles.modalBtn}>
                  <LinearGradient
                    colors={computedButtonColor}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}>
                    <Text style={styles.btnText}>{t('Confirm')}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

function UserPrivateProfile(props) {
  const { step, setStep, handleBack } = props

  const userImagesMap = []

  const { t } = useTranslation()

  return (
    <View style={{ alignItems: 'center', marginBottom: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 12,
          zIndex: 20,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 0
        }}>
        <TouchableOpacity onPress={handleBack} style={{ padding: 5 }}>
          <FastImage
            source={require('../../../../assets/icons/ArrowLeftBlack.png')}
            style={{
              width: 32,
              height: 32
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginBottom: -64,
          alignItems: 'center'
        }}>
        <LinearGradient
          colors={['#ffffff', '#ffffff1A']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: '100%',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            borderBottomLeftRadius: 54,
            borderBottomRightRadius: 54
          }}>
          <Carousel
            overscrollEnabled={false}
            snapEnabled={false}
            enabled={false}
            loop
            width={width - 40}
            height={230}
            autoPlay={true}
            data={userImagesMap}
            autoPlayInterval={5000}
            scrollAnimationDuration={200}
            onSnapToItem={index => setStep(index)}
            style={{
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              borderBottomLeftRadius: 54,
              borderBottomRightRadius: 54,
              backgroundColor: 'transparent'
            }}
            // onSnapToItem={index => setStep(index)}
            renderItem={({ item }) => (
              <View>
                <FastImage
                  source={{ uri: item }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            )}
          />
        </LinearGradient>
        <View style={{ position: 'absolute', alignItems: 'center', top: 48 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#000000',
              marginBottom: 8
            }}>
            {t('This profile is private')}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#000000',
              marginBottom: 10
            }}>
            {t('Follow this account to see their photos and videos')}
          </Text>
          <FastImage
            source={require('../../../../assets/icons/Lock.png')}
            style={{ width: 24, height: 24, flex: 1, borderRadius: 150 }}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            top: 12
          }}>
          {userImagesMap.map((_, index) => (
            <View
              key={index}
              style={[
                {
                  width: 30,
                  height: 6,
                  marginHorizontal: 8,
                  borderRadius: 4
                },
                {
                  backgroundColor:
                    index === step ? 'white' : 'rgba(104, 104, 104, 1)'
                }
              ]}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: '#0F0F0F',
          marginBottom: 20,
          paddingTop: 16,
          paddingHorizontal: 8,
          borderRadius: 150
        }}>
        <FastImage
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/6d77/6600/697272d0900a13641f6be4266eb9d312?Expires=1691971200&Signature=XQSnFTrmcbvik2ZGeta3xeiACjUvfeiRlc9lvDIlI0WvBjMsI88MrOSTF7shzYmdGHYxZ5bcyWV4c0qZbtVD0v0PYS3G2ytlnWhvNElC8lp~eIGDdUuSQb5WPAX83mJsISY0sZQtvuH6vZKGC1gzfk9lLeOzxMR6YE5Guu4r1M-sBvNJkwGpRmwQcBsJVZh6L7Vc46sP3ULT6Tc4d2ViFAl~z1N0viPKBo8stGG1cOlp2yXF3tlTERiNmLlPqY~85MR7-UtiZ1aOpAQB2JFMRplUvbE5X-qoZJqIyd8PAJb74tX5KrxJU2dZvTX5CEdNxNXy~HXmJtaNyzI88x5zZQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
          }}
          style={{ width: 150, height: 150, flex: 1, borderRadius: 150 }}
        />
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: '#ffffff',
          marginBottom: 4
        }}>
        Jacob
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#686868',
          marginBottom: 16
        }}>
        Video Editor
      </Text>

      <View
        style={{
          marginBottom: 28,
          gap: 18,
          flexDirection: 'row',
          shadowOffset: { width: 2, height: 4 }
        }}>
        <TouchableOpacity
          style={{
            ...styles.button,
            shadowColor: 'rgba(255, 203, 82, 0.53)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 6,
            borderRadius: 8
          }}>
          <LinearGradient
            colors={['#FFCB52', '#FF7B02']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}>
            <Text style={styles.buttonText}>{t('Follow')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FastImage
          source={require('../../../../assets/icons/ProfileLogo.png')}
          style={{ width: 120, height: 112 }}
        />
      </View>
    </View>
  )
}

export default UserProfileScreen
