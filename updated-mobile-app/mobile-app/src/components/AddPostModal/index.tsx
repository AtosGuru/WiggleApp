import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { IObject } from '../../types/utils'
import { maxWords } from '../../constants/Style'
import styles from './styled'
import LinearGradient from 'react-native-linear-gradient'

const AddPostModal = (props: IObject) => {

    const [errorMsg, setErrorMsg] = useState(false)
    const [message, setMessage] = useState(props?.currentMessage)


    const onChangeText = (text: string) => {
        // Check if the number of words and spaces exceeds the limit
        if (text.length <= maxWords) {
            // If the text length is within the allowed limit, update the state with the new text.
            setMessage(text)
            // Clear any previous error message by setting the error state to false.
            setErrorMsg(false);
            return; // Exit the function.
        }
        // If the text length exceeds the allowed limit, set an error message flag to true.
        setErrorMsg(true);
        return; // Exit the function.
    }
    const sendMessage = () => props?.onPress(message)

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View
            style={styles.mainContainer}>
            {errorMsg ?
                <View style={styles.errorMsg}><Text style={styles.errorText}>Sorry! Character limit reached!</Text></View> : null}
             <LinearGradient
                colors={['#FFCB52', '#FF7B02']}
                style={styles.modalContainer}
              >
                              
                <View style={styles.textInputcontainer}>
                    <View style={styles.textInputView}>
                        <TextInput
                            value={message}
                            style={styles.textInput}
                            onChangeText={onChangeText}                            
                            placeholder='Write your post.......'
                            placeholderTextColor='#ffffff'
                        />
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            disabled={message.length < 1}
                            style={styles.btn}
                            onPress={sendMessage}
                        >
                            {message.length > 0 ?
                                <Image
                                    source={require('../../../assets/icons/sendChat.png')}
                                    style={styles.btnImage}
                                    tintColor={"#FFFFFF"}
                                /> :
                                <Image
                                    source={require('../../../assets/icons/sendChat.png')}
                                    style={styles.btnImage}
                                    tintColor={"#686868"}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            
              </LinearGradient>
            
        </View>
        </TouchableWithoutFeedback>
    )
}

export default AddPostModal