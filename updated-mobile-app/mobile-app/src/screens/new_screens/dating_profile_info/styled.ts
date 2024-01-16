import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    screenImage: {
        flex: 1,
        backgroundColor: '#0F0F0F',
    },
    flex: {
        flex: 1
    },
    scroll: {
        paddingBottom: '30%'
    },
    title: {
        fontSize: 16,
        marginBottom: 14,
        fontWeight: '600',
        marginLeft: 21,
        marginTop: 19
    },
    photosBlock: {
        flex: 1,
        gap: 30,
        marginBottom: 38,
        marginLeft: 21
    },
    photo: {
        width: 163,
        height: 204,
        marginRight: 18,
        alignItems: 'flex-end'
    },
    photoImgStyle: {
        borderRadius: 10,
    },
    trashIconView: {
        backgroundColor: '#252525',
        width: 24,
        height: 24,
        borderRadius: 100,
        marginTop: 15,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageLayout: {
        width: 14,
        height: 14,
    },
    uploadPhotoView: {
        marginVertical: 21,
    },
    input: {
        backgroundColor: '#686868',
        borderRadius: 11,
        color: Colors.white,
        padding: 21,
        fontSize: 12,
        marginHorizontal: 21,
        marginTop: 8,
        marginBottom: 31
    },
    textarea: {
        borderRadius: 8,
        backgroundColor: '#252525',
        marginHorizontal: 21,
        minHeight: 100,
        padding: 10,
        color: Colors.white,
    },
    button: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '70%',
        height: 62,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20,
        marginBottom: 32
    },
    uploadButton: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '70%',
        height: 62,
        alignSelf: 'center',
        bottom: 20
    },
    uploadButtonTitle: {
        fontSize: 12,
        color: Colors.white
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        height: 62,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 21,
        marginTop: 19
    },
    headerLeftIcon: {
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
    interests: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 21,
        flexWrap: 'wrap'
    },
    interest: {
        height: 35,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    interestName: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.white,
    }
})