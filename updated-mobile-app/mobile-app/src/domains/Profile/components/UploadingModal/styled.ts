import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14
  },
  btnText: { fontSize: 12, color: '#ffffff' },
  overlay: {
    flex: 1,
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 34,
    paddingBottom: 30,
    paddingTop: 34,
    width: '68%'
  },
  buttonContainer: {
    flexDirection: 'column'
  },
  confirmButton: {
    backgroundColor: '#252525'
  },
  titleWrapper: { marginBottom: 24, alignItems: 'center' },
  title: { color: '#ffffff', fontSize: 15 },
  primaryButton: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center'
  }
})

export default styles
