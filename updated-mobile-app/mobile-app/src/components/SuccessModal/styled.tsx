import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
    //Modal 
    overlayStyle: {
        backgroundColor: "#000",
        alignItems: 'center',
        width: width - 120,
        height: height / 6,
        justifyContent: "flex-start",
        borderRadius: 10,
    }, 
    modalText: {
        color: "#FFFFFF",
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        fontWeight: '600'
    },
    modalTextView: {        
        height: "100%",
        width: '60%',
        alignItems: "center",
        justifyContent: "center"
    },
    modalButtonView: {
        flexDirection: 'row',
        width: '80%',
        marginTop:'5%',        
        position: "absolute"
    },
    modalBtn: {
        width: '100%',
        justifyContent: "center",
        alignItems:'flex-end'
    },
    backdropStyle:{
        backgroundColor: '#1b1b1bc9',
    }
})

export default styles