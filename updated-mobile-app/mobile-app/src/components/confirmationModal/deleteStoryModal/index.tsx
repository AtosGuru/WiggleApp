import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import { Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styled'
import { IObject } from '../../../types/utils'
import { t } from 'i18next'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'

const DeleteStoryModal = (props: IObject) => {
    const { onNoPress, isVisible, onYesPress } = props
    const { isLoading } = useSelector((root: RootState) => root.stories)
    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onNoPress}
            animationType='fade'
            backdropStyle={styles.backdropStyle}
            overlayStyle={styles.overlayStyle}
        >
            <View style={styles.modalTextView}>
                <Text style={styles.modalText2}>{t("Do you want to delete your story?")}</Text>
            </View>
            <View style={styles.modalButtonView}>
                <LinearGradient style={styles.modalButton} colors={["#FFCB52", '#FF7B02']}>
                    <TouchableOpacity disabled={isLoading} onPress={onYesPress} style={styles.modalBtn}>
                        {isLoading ? <ActivityIndicator size={'small'} color="black" /> :
                            <Text style={styles.modalText}>{t('Yes')}</Text>}
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient style={styles.modalButton} colors={["#252525", "#252525"]}>
                    <TouchableOpacity style={styles.modalBtn} disabled={isLoading} onPress={onNoPress}>
                        <Text style={styles.modalText}>{t('No')}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Overlay>
    )
}

export default DeleteStoryModal