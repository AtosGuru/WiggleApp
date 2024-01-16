const ActionModal = (props: {
    visible: any
    onClose: any
    userId: any
    isDating: any
    uuid: any
  }) => {
    const { visible, onClose, userId, isDating, uuid } = props
    const navigation = useNavigation<NavigationProp<RootStackParamList, 'chat'>>()
  
    const { t } = useTranslation()
  
    const handleOpenProfile = () => {
      if (isDating) {
        navigation.navigate('dating_profile', { id: uuid, openFromChat: true })
      } else {
        navigation.navigate('profile', { user_id: userId })
      }
      onClose()
    }
  
    const handleBlock = async () => {
      if (!isDating) {
        await newConnection({
          type: ConnectionType.BLOCK,
          partner_id: userId
        })
      }
      onClose()
    }
    const handleReport = () => {
      // Report
      onClose()
      navigation.navigate('support', { isReport: true })
    }
  
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.alertContainer}>
                <TouchableOpacity
                  onPress={handleBlock}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <FastImage
                    source={require('../../../../assets/icons/BlockUser.png')}
                    style={{
                      width: 16,
                      height: 20,
                      marginRight: 10
                    }}
                  />
                  <Text
                    style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}>
                    {t('Block User')}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: '#686868',
                    height: 1,
                    marginVertical: 16
                  }}
                />
                <TouchableOpacity
                  onPress={handleReport}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 4
                  }}>
                  <FastImage
                    source={require('../../../../assets/icons/Report.png')}
                    style={{
                      width: 18,
                      marginRight: 10,
                      height: 18
                    }}
                  />
                  <Text
                    style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}>
                    {t('Report a problem')}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }