import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    ModalContainer: {
        position: 'absolute',
        top: 30,
        right: '-35%',
        zIndex: 1,
        backgroundColor: "#000000",
        borderRadius: 10,
        width: 80,
    },
    btnView: {
        width: 84,
        justifyContent: 'space-evenly',
        paddingLeft: 15,
        zIndex: 1,

    },
    button: {
        height: 35,
        justifyContent: 'center',
         zIndex: 1

    },
    EditText: {
        fontSize: 12,
        color: "#fff",
     
    },
    deleteText: {
        fontSize: 12,
        color: "#E81616",
        zIndex:1
      

    },
    dropDownPickerStyle: {
        borderColor: "transparent",
        width: "15%",
        backgroundColor: "transparent",
        opacity: 0.4,
        justifyContent: "center",
        alignItems: "flex-start",
        height: 0,

    },
    listItemContainerStyle: {
        height: 30,
    },
    textStyle: {
        textAlign: "center",
        fontSize: 12,
        color: '#FFFFFF'
    },
    dropDownContainerStyle: {
        borderColor: '#000000',
        backgroundColor: '#000000',
        width: 84,
        elevation: 10,
        borderRadius: 10,
        // marginTop: 10,
        top: 15,
        left: -60,
        height: 70,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    }
})

export default styles