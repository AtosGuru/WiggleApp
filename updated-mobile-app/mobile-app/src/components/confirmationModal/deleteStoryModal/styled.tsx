import { Dimensions, StyleSheet } from 'react-native'

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
    //Modal 
    overlayStyle: {
        backgroundColor: "#000",
        alignItems: 'center',
        width: width - 50,
        height: height / 4,
        justifyContent: 'center',
        borderRadius: 10
    },
    modalText: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 18,
        fontWeight: '600',
        fontFamily:"LeagueSpartan-regular"
    },
    modalText2: {
        color: "#FFFFFF",
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 18,
        fontWeight: '400',
        fontFamily:"LeagueSpartan-semiBold"
    },
    modalTextView: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
        marginBottom: 30
    },
    modalButtonView: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: '90%'
    },
    modalButton: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    modalBtn: {
        width: '100%',
        height: 55,
        justifyContent:'center',
        alignItems:'center'
    },
    backdropStyle: {
        backgroundColor: '#1b1b1bc9',
    }
})

export default styles