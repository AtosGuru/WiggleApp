import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React, { Fragment } from 'react'

import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const { height, width } = Dimensions.get('screen')

function PrivacyPolicyScreen(): JSX.Element {
  const navigation = useNavigation()

  const handleBack = () => navigation.goBack()
  const { t } = useTranslation()

  const sections = [
    {
      title: t('Information We Collect'),
      content: `${t(
        'Describe the types of personal and non-personal information collected from users, such as names, email addresses, location data, device information, etc'
      )}.`
    },
    {
      title: t('How We Use Information'),
      content: `${t(
        'Explain how you will use the collected data, including personalization, improving services, sending notifications, etc'
      )}.`
    },
    {
      title: t('Data Sharing'),
      content: `${t(
        'Clarify circumstances in which user information may be shared with third parties (e.g., event organizers) and how it will be protected'
      )}.`
    },
    {
      title: t('Third-Party Services'),
      content: `${t(
        'Disclose any third-party services (e.g., analytics, advertising) integrated into Wiggler and how they may collect user data'
      )}.`
    },
    {
      title: t('Data Security'),
      content: `${t(
        'Detail the measures taken to safeguard user data from unauthorized access, data breaches, etc'
      )}.`
    },
    {
      title: t('User Choices'),
      content: `${t(
        'Inform users about their rights to access, update, and delete their personal information'
      )}.`
    },
    {
      title: t('Cookies and Tracking Technologies'),
      content: `${t(
        'Explain the use of cookies and tracking technologies on Wiggler'
      )}.`
    },
    {
      title: t("Children's Privacy"),
      content: `${t(
        'State that Wiggler is not intended for children under 13 years of age, and you do not knowingly collect data from them'
      )}.`
    },
    {
      title: t('Changes to the Privacy Policy'),
      content: `${t(
        'Explain how users will be informed about changes to the Privacy Policy'
      )}.`
    },
    {
      title: t('Contact Information'),
      content: `${t(
        'Provide contact details for users to reach out with privacy-related inquiries'
      )}.`
    }
  ]

  return (
    <Fragment>
      <View
        style={{
          width,
          height,
          position: 'absolute',
          backgroundColor: '#0F0F0F'
        }}>
        <FastImage
          source={require('../../../../assets/images/eventBackground.png')}
          style={{ width, height }}
        />
      </View>
      <SafeAreaView>
        <View style={{ height: height, width: width }}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingBottom: 100,
              paddingTop: 20
            }}
            showsVerticalScrollIndicator={false}>
            <StatusBar barStyle={'light-content'} />

            {/* Header */}
            <View
              style={{
                alignItems: 'center',
                marginBottom: 26
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                <TouchableOpacity onPress={handleBack}>
                  <FastImage
                    source={require('../../../../assets/icons/ArrowLeft.png')}
                    style={{
                      width: 24,
                      height: 24
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#ffffff',
                    flex: 1,
                    textAlign: 'center',
                    paddingRight: 24
                  }}>
                  {t('Privacy Policy')}
                </Text>
              </View>
            </View>

            <View>
              {sections.map((section, index) => (
                <Section key={index} title={section.title} count={index + 1}>
                  {section.content}
                </Section>
              ))}
              <Text style={styles.listText}>
                {`${t(
                  'Remember, the above templates are just a starting point and not a substitute for professional legal advice'
                )}. ${t(
                  "It is crucial to consult with a legal expert to tailor these documents to your specific app and jurisdiction's requirements"
                )}.`}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

const Section = ({ title, children, count }) => (
  <View>
    <Text style={styles.sectionTitle}>{`${count}. ${title}`}</Text>
    <View style={styles.listItem}>
      <Text style={styles.listDot}>•</Text>
      <Text style={styles.listText}>{children}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  sectionTitle: {
    fontSize: 12,
    lineHeight: 20,
    color: '#686868'
  },
  listItem: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 4
  },
  listDot: {
    fontSize: 12,
    color: '#686868',
    marginRight: 4
  },
  listText: {
    fontSize: 12,
    color: '#686868',
    lineHeight: 20
  }
})

export default PrivacyPolicyScreen
