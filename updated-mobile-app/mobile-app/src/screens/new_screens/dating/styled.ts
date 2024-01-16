import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import { IS_SCREEN_MEDIUM, WINDOW_HEIGHT } from "../../../constants/Style";

export const styles = StyleSheet.create({
    screenButtons: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 9,
    },
    buttonTitle: {
        borderRadius: 9,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonName: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 10,
        paddingHorizontal: 15,
    },
    listWrap: {
        marginHorizontal: 17,
        marginTop: 24,
        height: '100%'
    },
    matchesTitle: {
        color: Colors.textGray,
        fontWeight: '600',
        fontSize: 20
    },
    chatWrapper: {
        marginTop: 22,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 13
    },
    chatImage: {
        width: 49,
        height: 49,
        borderRadius: 100
    },
    chatMessage: {
        color: Colors.white
    },
    newMessage: {
        borderRadius: 100,
        height: 21,
        alignItems: 'center',
        justifyContent: 'center',
        width: 21,
        position: 'absolute',
        left: -10,
        top: 0
    },
    newMatch: {
        fontSize: 16,
        fontWeight: '600',
    },
    chatName: {
        color: '#686868'
    },
    chatContent: {
        maxWidth: '70%'
    },
    chatLastMessage: {
        fontSize: 16,
        color: Colors.white,
    },
    endBlock: {
        alignItems: 'center'
    },
    cameraImage: {
        width: 24,
        height: 24,
        marginBottom: 3
    },
    time: {
        color: '#686868',
        fontSize: 10
    },
    flatListGap: {
        gap: 6
    },
    footerView: {
        marginTop: 11
    },
    headerAvatar: {
        position: 'absolute',
        top: IS_SCREEN_MEDIUM ? 10 : 0,
        right: 0,
        marginRight: IS_SCREEN_MEDIUM ? 13 : 19
    },
    avatar: {
        width: IS_SCREEN_MEDIUM ? 40 : 50,
        height: IS_SCREEN_MEDIUM ? 40 : 50,
        flex: 1,
        borderRadius: 25,
    },
    noMatches: {
        height: WINDOW_HEIGHT / 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noMatchesTitle: {
        fontSize: 16,
        maxWidth: '50%',
        color: Colors.white,
        textAlign: 'center',
        fontWeight: '600'
    }
})