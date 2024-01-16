import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    swipeView: {
        flex: 1,
        marginLeft: -9
    },
    indicators: {
        flex: 1,
        position: 'absolute',
        zIndex: 999,
        marginTop: '60%',
        left: 25
    },
    indicator: {
        width: 6,
        height: 30,
        borderRadius: 5,
        marginHorizontal: 5,
        marginVertical: 11,
    },
    image: {
        height: '75%',
        width: '100%',
        borderRadius: 15,
    },
    card: {
        flex: 1,
        paddingHorizontal: 25,
        paddingBottom: 26,
        justifyContent: 'flex-end',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo: {
        marginBottom: 12,
    },
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    profileName: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
        color: Colors.white,
        maxWidth: '90%'
    },
    onlineIndicator: {
        width: 6,
        height: 6,
        backgroundColor: '#41CB3E',
        borderRadius: 100
    },
    profileDescription: {
        fontSize: 12,
        color: Colors.white,
        maxWidth: '70%'
    },
    iconView: {
        backgroundColor: Colors.white,
        width: 76,
        height: 76,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginHorizontal: 24,
    },
    heartIcon: {
        width: 24,
        height: 24
    }
})