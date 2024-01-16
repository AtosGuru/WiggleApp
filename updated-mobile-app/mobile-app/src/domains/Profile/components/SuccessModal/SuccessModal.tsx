import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import styles from './styled'
import { useTranslation } from 'react-i18next'

import React = require('react')

function SuccessModal(props: {
  visible: boolean
  handleBack: () => void
  action: string
}) {
  const { visible, handleBack, action } = props
  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleBack}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.alertContainer}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require('../../../../../assets/images/wiggleNewLogo.png')}
                  style={styles.logo}
                />
              </View>

              <View style={styles.messageWrapper}>
                <Text style={styles.text}>{t(`Photo ${action}`)}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.button}>
                  <LinearGradient
                    colors={['#FFCB52', '#FF7B02']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}>
                    <Text style={styles.btnText}>{t('Go Back')}!</Text>
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

export default SuccessModal
