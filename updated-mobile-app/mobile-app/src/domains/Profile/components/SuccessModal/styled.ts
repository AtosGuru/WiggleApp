import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center'
  },
  overlay: {
    flex: 1,
    backgroundColor: '#252525E6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertContainer: {
    backgroundColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 36,
    paddingBottom: 36,
    paddingTop: 8,
    width: '68%'
  },
  message: {
    fontSize: 18,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  logo: { height: 100, width: 100 },
  logoWrapper: { alignItems: 'center', marginBottom: 2 },
  messageWrapper: { marginBottom: 16, alignItems: 'center' },
  text: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  btnText: { fontSize: 12, color: '#ffffff' },
  gradientButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  }
})

export default styles
