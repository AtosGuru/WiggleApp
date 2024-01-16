import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    settings: {
        backgroundColor: '#0F0F0F',
        height: '100%',
        justifyContent: 'space-between'
    },
    content: {
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 21,
        marginHorizontal: 36
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    leftIcon: {
        width: 24,
        height: 24,
        opacity: 0.5
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
        flex: 1,
        textAlign: 'center',
        paddingRight: 24
    },
    userInfo: {
        marginLeft: 32,
        marginRight: 37,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 150,
    },
    userName: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        maxWidth: '70%'
    },
    editIcon: {
        width: 24,
        height: 24,
    },
    userGender :{
        marginLeft: 32,
        marginTop: 37,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 41
    },
    title: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    grayTitle: {
        color: '#686868',
        fontSize: 16,
        fontWeight: '600'
    },
    currentGender: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ageView: {
        marginLeft: 32,
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 41
    },
    rightIcon: {
        width: 24,
        height: 24,
        opacity: 0.5
    },
    gradientSlider: {
        width: 19,
        height: 19,
        borderRadius: 100,
    },
    sliderMargin: {
        marginHorizontal: 32,
    },
    sliderBackgroundColor: {
        backgroundColor: '#FFCB52'
    },
    deleteButtonView: {
        alignItems: 'center',
        marginBottom: 40
    },
    deleteButton: {
        fontSize: 16,
        fontWeight: '600',
        color: '#686868'
    }
})