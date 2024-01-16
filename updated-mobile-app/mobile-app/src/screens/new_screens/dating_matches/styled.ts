import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    background: {
        height: '100%',
        backgroundColor: '#0F0F0F',
        position: 'relative',
    },
    styledNoGoldContent: {
        flex: 1,
        flexDirection: 'row',
    },
    avatar: {
        width: '50%',
        height: '100%',
    },
    gradientShadow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    closeView: {
        position: 'absolute',
        zIndex: 1000,
        top: 0,
        marginLeft: 30,
    },
    closeIcon: {
        width: 24,
        height: 24,
    },
    infoBlock: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 245,
        height: 245
    },
    button: {
        borderRadius: 10,
        overflow: 'hidden',
        width: 195,
        height: 50,
    },
    gradientButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        height: 50
    },
    buttonTitle: {
        fontSize: 12,
        color: Colors.white
    }
})