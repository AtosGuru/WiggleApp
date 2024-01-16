import { Dimensions, Platform, StyleSheet } from 'react-native'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const styles = StyleSheet.create({
    //Add Post Modal 

    mainContainer: {
        backgroundColor: '#1b1b1bc9',
        width: '100%',
        height: Platform.OS == "ios" ? height + 210 : height,
        top: "20%",
        justifyContent: 'center',
        alignItems: 'center',
        bottom:0

    },
    modalContainer: {
        backgroundColor: '#fff',
        width: "80%",
        borderRadius: 10,
        zIndex: 1,
        bottom: "25%",
        position: 'absolute',
    },
    ModalText: {
        fontSize: 10,
        color: '#686868'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '93%',
        alignSelf: 'center',
        paddingTop: 13
    },
    modalTextView: {
        width: '85%',
        justifyContent: 'center',
    },
    modalTextlimitView: {
        width: '15%',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 12,
        paddingLeft: 20,
        color: '#ffffff'
    },
    textInputcontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '93%',
        alignSelf: 'center',
    },
    btnView: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputView: {
        justifyContent: 'center',
        height: 45,
        alignSelf: 'center',
        width: '85%',        
    },
    btnImage: {
        width: 24,
        height: 24
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMsg: {
        zIndex: 1,
        top: '15%'
    },
    errorText: {
        color: '#FE1515',
        fontSize: 10
    }
})

export default styles