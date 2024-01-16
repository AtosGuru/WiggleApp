import Toast from "react-native-toast-message"

export function checkPrivateProfile(isPrivate: boolean | undefined) {
    if (isPrivate) {
        Toast.show({
            type: 'error',
            text1: "Your profile is Private"
        })        
        return true
    }
}