import { Dimensions, StyleSheet, Platform } from 'react-native'

import Colors from '../../../../constants/Colors'

const height = Dimensions.get("screen").height

const styles = StyleSheet.create({
  container: {
    height: Platform.OS == 'ios' ? height / 1.44 : height / 1.5
  },
  primaryButton: {
    borderRadius: 10,
    overflow: 'hidden',
    width: 245,
    marginBottom: 18,
    alignSelf: 'center'
  },
  buttonGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 62
  },
  buttonText: {
    color: Colors.black,
    fontSize: 12,
    lineHeight: 15
  },
  uploaderWrapper: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 18,
    width: '100%',
    justifyContent: 'space-between'
  },
  imageUploader: {
    width: 163,
    flex: 1,
    height: 94,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  image: {
    width: 24,
    height: 24,
    resizeMode:"contain"
  },
  avatarUploader: {
    width: 96,
    height: 96,
    backgroundColor: '#252525',
    borderRadius: 48,
    marginBottom: 44
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12
  },
  trashIcon: { width: 14, height: 14 },
  avatarTrashIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  trashIconWrapper: {
    borderRadius: 14,
    backgroundColor: '#252525',
    padding: 6,
    position: 'absolute',
    top: 12,
    right: 12
  }
})

export default styles
