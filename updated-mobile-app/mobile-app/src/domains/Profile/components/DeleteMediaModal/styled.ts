import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
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
    padding: 36,
    width: '68%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  noButton: {
    backgroundColor: '#252525',
    flex: 1,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  text: { color: '#ffffff', fontSize: 15 },
  boldText: { color: '#ffffff', fontSize: 20, fontWeight: '600' },
  titleWrapper: { marginBottom: 20, alignItems: 'center' },
  primaryButton: {
    flex: 1,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff'
  },
  gradient: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  }
})

export default styles
