import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export const styles = StyleSheet.create({
    backView: {
        marginHorizontal: 21,
        marginTop: 19,
        marginBottom: 19
    },
    headerLeftIcon: {
      width: 24,
      height: 24,
      opacity: 0.5
    },
    imageScreen: {
        backgroundColor: '#0F0F0F',
        height: '100%',
        paddingHorizontal: 12
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.white
    },
    interests: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 17,
        marginBottom: 18,
        flexWrap: 'wrap'
    },
    interest: {
        backgroundColor: '#252525',
        height: 35,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    biography: {
        marginTop: 18,
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 26,
        backgroundColor: '#252525',
        maxWidth: '90%'
    },
    bioText: {
        fontSize: 12,
        color: Colors.white
    },
    scrollView: {
        height: '50%',
        position: 'relative'
    },
    sliderImg: {
        height: '100%',
        width: '100%',
        borderRadius: 10
    },
    scrollWrapper: {
        width: '100%',
        marginBottom: 24,
    },
    indicatorWrapper: {
        position: 'absolute',
        top: '35%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
        bottom: '38%',
        gap: 12
      },
      indicator: {
        width: 6,
        height: 30,
        borderRadius: 5,
        marginHorizontal: 5
      },
      carousel: {
        borderRadius: 10,
        zIndex: 999
      },
      header: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 18,
        paddingTop: 21,
      },
      headerContent: {
        height: 32,
        borderRadius: 121,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        zIndex: 2,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderTopColor: '#FFCB52',
        borderBottomColor: '#FF7B02',
        borderLeftColor: '#FFCB52',
        borderRightColor: '#FF7B02'
      },
      activeStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      },
      greenBadge: {
        width: 7,
        height: 7,
        backgroundColor: '#41CB3E',
        borderRadius: 100
      },
      activeText: {
        margin: 3,
        fontSize: 10,
        color: Colors.white,
        fontWeight: '600'
      },
      settings: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 44,
        height: 44,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
      },
      settingsIcon: {
        width: 20,
        height: 20,
      },
      profileInfo: {
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 0,
        paddingLeft: 19,
        paddingBottom: 16,
      },
      profileWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
      },
      name: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 5,
        color: Colors.white,
      },
      age: {
        color: '#686868',
        fontSize: 20,
        fontWeight: '600',
      },
      description: {
        fontSize: 12,
        color: Colors.white,
        maxWidth: '80%'
    },
    buttons: {
        position: 'absolute',
        justifyContent: 'flex-end',
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 10,
        paddingRight: 17,
        gap: 8
    },
    button: {
        backgroundColor: Colors.white,
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    iconsSize: {
        fontSize: 12
    },
    heartImage: {
        width: 12,
        height: 12,
    }
})