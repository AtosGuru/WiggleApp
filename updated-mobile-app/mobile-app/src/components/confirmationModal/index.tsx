import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { Overlay } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styled'
import { IObject } from '../../types/utils'

const ConfirmationModal = (props: IObject) => {
    const {  onNoPress, isVisible, text, onYesPress, isPost } = props
    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onNoPress}
            animationType='fade'
            backdropStyle={styles.backdropStyle}
            overlayStyle={styles.overlayStyle}
        >
            <View style={styles.modalTextView}>
                <Text style={styles.modalText}>Do you want to {text} this {isPost ? 'post' : 'comment'}?</Text>
            </View>
            <View style={styles.modalButtonView}>
                <LinearGradient style={styles.modalButton} colors={["#FFCB52", '#FF7B02']}>
                    <TouchableOpacity onPress={onYesPress} style={styles.modalBtn}>
                        <Text style={styles.modalText}>Yes</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient style={styles.modalButton} colors={["#252525", "#252525"]}>
                    <TouchableOpacity style={styles.modalBtn} onPress={onNoPress}>
                        <Text style={styles.modalText}>No</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Overlay>
    )
}

export default ConfirmationModal