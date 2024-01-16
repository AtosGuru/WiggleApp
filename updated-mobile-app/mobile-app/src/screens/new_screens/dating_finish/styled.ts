import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    screenImage: {
        flex: 1,
        backgroundColor: '#0F0F0F'
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: '800',
    },
    image: {
        width: 102,
        height: 113,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.white,
        textAlign: 'center'
    },
    text: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 12,
        marginVertical: 6
    },
    button: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '70%',
        height: 62,
        alignSelf: 'center',
        bottom: 20,
        marginTop: 53
    },
    buttonWrap: {
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