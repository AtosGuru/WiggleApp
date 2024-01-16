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

function TermsAndConditionsScreen(): JSX.Element {
  const navigation = useNavigation()

  const handleBack = () => navigation.goBack()
  const { t } = useTranslation()

  const sections = [
    {
      title: 'Introduction',
      content:
        'Welcome to Wiggler! These Terms of Service govern your use of the Wiggler mobile application and website. By accessing or using Wiggler, you agree to be bound by these Terms.'
    },
    {
      title: 'User Eligibility',
      content:
        'You must be at least 18 years old or the age of legal majority in your jurisdiction to use Wiggler. If you are accessing the app on behalf of a company or organization, you represent that you have the authority to bind them to these Terms.'
    },
    {
      title: 'Account Registration',
      content:
        'To use certain features of Wiggler, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.'
    },
    {
      title: 'Content and Conduct',
      content:
        'Users are solely responsible for the content they post on Wiggler. You must not use the app for any illegal, harmful, or unauthorized activities.'
    },
    {
      title: 'Intellectual Property',
      content:
        "All intellectual property rights in Wiggler's content and services are owned by or licensed to us. You may not use, reproduce, modify, or distribute any content from Wiggler without our prior written consent."
    },
    {
      title: 'Third-Party Links and Services',
      content:
        'Wiggler may contain links to third-party websites or services. We do not endorse or control these external resources and are not responsible for their content or practices.'
    },
    {
      title: 'Termination',
      content:
        'We reserve the right to terminate or suspend your access to Wiggler for any reason without prior notice.'
    },
    {
      title: 'Disclaimer of Warranty',
      content:
        'Wiggler is provided on an "as-is" basis without any warranty or guarantee. We do not guarantee the accuracy, availability, or reliability of the app.'
    },
    {
      title: 'Limitation of Liability',
      content:
        'We shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of Wiggler or any content on the app.'
    },
    {
      title: 'Governing Law',
      content:
        'These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.'
    },
    {
      title: 'Changes to the Terms',
      content:
        'We reserve the right to modify these Terms at any time. Changes will be effective upon posting the updated version of the Terms on Wiggler.'
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
                  {t('Terms & Conditions')}
                </Text>
              </View>
            </View>

            <View>
              {sections.map((section, index) => (
                <Section key={index} title={section.title} count={index + 1}>
                  {section.content}
                </Section>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
  )
}

const Section = ({ title, children, count }) => {
  const { t } = useTranslation()
  return (
    <View>
      <Text style={styles.sectionTitle}>{`${count}. ${t(title)}`}</Text>
      <View style={styles.listItem}>
        <Text style={styles.listDot}>•</Text>
        <Text style={styles.listText}>{t(children)}</Text>
      </View>
    </View>
  )
}

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

export default TermsAndConditionsScreen
