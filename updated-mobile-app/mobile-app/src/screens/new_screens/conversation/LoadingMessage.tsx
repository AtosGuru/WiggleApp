const LoadingMessage = () => {
    return (
      <View
        style={{
          padding: 6,
          alignSelf: 'flex-end'
        }}>
        <View
          style={{
            padding: 8,
            borderRadius: 8
          }}>
          <LinearGradient
            colors={['#FFCB52', '#FF7B02']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 8,
              maxWidth: width * 0.7
            }}>
            <ActivityIndicator size={'large'} color="black" />
          </LinearGradient>
        </View>
      </View>
    )
  }