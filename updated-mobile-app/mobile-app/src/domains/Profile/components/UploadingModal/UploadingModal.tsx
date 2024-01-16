import { Fragment, useState } from 'react'
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import SuccessModal from '../SuccessModal/SuccessModal'
import { launchImageLibrary } from 'react-native-image-picker'
import styles from './styled'
import { useTranslation } from 'react-i18next'

import React = require('react')

function UploadingModal(props: {
  visible: boolean
  onCancel: () => void
  setPickerResponse: any
  photoType: string
}) {
  const { visible, onCancel, setPickerResponse, photoType } = props

  const [isModalShow, setIsModalShow] = useState(false)

  const handleImageLibraryPress = async () => {
    onCancel()

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false
      },
      response => {
        if (response.didCancel) {
          // User cancelled image picker
          console.error('Image picker cancelled')
        } else if (response.error) {
          // ImagePicker error
          console.error('ImagePicker Error: ', response.error)
        } else {
          // Image selected successfully
          setPickerResponse(response?.assets)
          setIsModalShow(true)
        }
      }
    )
  }

  const handleBack = () => setIsModalShow(false)
  const { t } = useTranslation()

  return (
    <Fragment>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.alertContainer}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>
                    {t('Upload')} {photoType} {t('photo')}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleImageLibraryPress}
                    style={styles.primaryButton}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.button}>
                      <Text style={styles.btnText}>
                        {t('Upload from gallery')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={onCancel}>
                    <Text style={styles.btnText}>{t('Cancel')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <SuccessModal
        visible={isModalShow}
        handleBack={handleBack}
        action="Uploaded"
      />
    </Fragment>
  )
}

export default UploadingModal
