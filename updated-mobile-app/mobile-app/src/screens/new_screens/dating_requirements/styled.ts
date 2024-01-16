import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    imageScreen: {
        flex: 1,
        backgroundColor: '#0F0F0F'
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        marginLeft: 21,
        marginTop: 19
    },
    headerText: {
        color: Colors.white,
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 14
    },
    headerTitle: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: '600',
    },
    imageWrap: {
        alignItems: 'center'
    },
    image: {
        width: 102,
        height: 113,
    },
    description: {
        fontSize: 12,
        color: Colors.white,
        textAlign: 'center'
    },
    button: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '70%',
        height: 62,
        alignSelf: 'center',
        bottom: 20
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        height: 62
    },
    buttonTitle: {
        fontSize: 12,
        color: Colors.white
    }
})