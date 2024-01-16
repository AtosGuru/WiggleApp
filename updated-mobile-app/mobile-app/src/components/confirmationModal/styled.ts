import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
    //Modal 
    overlayStyle: {
        backgroundColor: "#000",
        alignItems: 'center',
        width: width - 100,
        height: height / 6,
        justifyContent: 'center',
        borderRadius: 10
    },
    modalText: {
        color: "#FFFFFF",
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        fontWeight: '600'
    },
    modalTextView: {
        // borderWidth: 2,
        // borderColor: "#fff",
        width: '60%',
        alignItems: 'center',
        marginVertical: 10
    },
    modalButtonView: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: '80%'
    },
    modalButton: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 7,
    },
    modalBtn: {
        width: '100%'
    },
    backdropStyle:{
        backgroundColor: '#1b1b1bc9',
    }
})

export default styles