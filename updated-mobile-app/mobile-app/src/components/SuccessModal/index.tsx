import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { Overlay } from 'react-native-elements'

import styles from './styled'
import { IObject } from '../../types/utils'

const SuccessModal = (props: IObject) => {
    const { onNoPress, isVisible, text } = props
    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onNoPress}
            animationType='fade'
            backdropStyle={styles.backdropStyle}
            overlayStyle={styles.overlayStyle}
        >
            <View style={styles.modalButtonView}>
                <TouchableOpacity onPress={onNoPress} style={styles.modalBtn}>
                    <Text style={styles.modalText}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.modalTextView}>
                <Text style={styles.modalText}>{text} !</Text>
            </View>
        </Overlay>
    )
}

export default SuccessModal