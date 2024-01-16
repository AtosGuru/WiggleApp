const AudioMessage = ({ data }) => {
    // Replace with your video rendering logic
    return (
      <View
        style={{
          padding: 6,
          alignSelf: data.sender === 'user1' ? 'flex-end' : 'flex-start'
        }}>
        <View
          style={{
            padding: 8,
            borderRadius: 8
          }}>
          <LinearGradient
            colors={
              data.sender === 'user1'
                ? ['#FFCB52', '#FF7B02']
                : ['#252525', '#252525']
            }
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 22,
              borderRadius: 8,
              maxWidth: width * 0.7,
              flexDirection: 'row'
            }}>
            <Audio length={70} sender={data?.sender} />
            <TouchableOpacity style={{ padding: 5 }}>
              <FastImage
                source={require('../../../../assets/icons/Play.png')}
                style={{
                  width: 24,
                  height: 24
                }}
                tintColor={data.sender === 'user1' ? '#000000' : '#ffffff'}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    )
  }

  const Audio = ({ length, sender }) => {
    const renderAudioLines = () => {
      const lines = []
      for (let i = 0; i < length; i++) {
        const size = Math.floor(Math.random() * 3) + 1 // Random size between 1 and 3
        lines.push(
          <View
            key={i}
            style={[
              {
                width: 2,
                backgroundColor: sender === 'user1' ? '#000000' : '#ffffff',
                marginVertical: 1,
                marginHorizontal: 2,
                height: size * 10
              }
            ]}
          />
        )
      }
      return lines
    }
  
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 8,
            padding: 10,
            overflow: 'hidden',
            maxWidth: width * 0.4
          }}>
          {renderAudioLines()}
        </View>
      </View>
    )
  }