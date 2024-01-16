import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    screenImage: {
        flex: 1,
        backgroundColor: '#0F0F0F'
    },
    wrapper: {
        flex: 1
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
    genderBlock: {
        borderRadius: 10,
        overflow: 'hidden',
        height: 66,
        marginTop: 21,
        alignSelf: 'center',
    },
    genderView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        height: 66
    },
    genderTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.white,
        textTransform: 'uppercase'
    },
    buttonWrap: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '70%',
        height: 62,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 49
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        height: 62
    }
})