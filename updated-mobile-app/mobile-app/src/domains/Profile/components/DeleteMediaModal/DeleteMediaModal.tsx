import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import React, { Fragment, useState } from 'react'

import LinearGradient from 'react-native-linear-gradient'
import SuccessModal from '../SuccessModal/SuccessModal'
import styles from './styled'
import { useTranslation } from 'react-i18next'

function DeleteMediaModal(props: {
  visible: any
  onCancel: any
  onDelete: any,
  title?: string
}) {
  const { visible, onCancel, onDelete, title } = props
  const [isModalShow, setIsModalShow] = useState(false)

  const onConfirm = () => {
    // Photo Deletion
    onDelete()
    setIsModalShow(true)
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
                  <Text style={styles.text}>{t('Do you want to')}</Text>
                  <Text style={styles.boldText}>{t('Delete')}</Text>
                  <Text style={styles.text}>{title ? title : t('this image')}?</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={onConfirm}
                    style={styles.primaryButton}>
                    <LinearGradient
                      colors={['#FFCB52', '#FF7B02']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradient}>
                      <Text style={styles.btnText}>{t('Yes')}</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.noButton} onPress={onCancel}>
                    <Text style={styles.btnText}>{t('No')}</Text>
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
        action="Deleted"
      />
    </Fragment>
  )
}

export default DeleteMediaModal
