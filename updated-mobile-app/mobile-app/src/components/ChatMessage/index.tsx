import { Dimensions, LayoutAnimation, View } from 'react-native'

import { ChatMessage as ChatMessageType } from '../../../types/chat.interfaces'
import { Render } from '../utils/Render'
import { Text } from '../Text'
import styled from 'styled-components/native'
import { useRecoilValue } from 'recoil'
import { useState } from 'react'
import { userAtom } from '../../state/user.atom'
import { getImageURL } from '../../constants/utils'
import { convertImgToLink } from '../../helpers/convertImgToLink'

const { width } = Dimensions.get('window')

interface Message {
  type: 'text'
  text: string
  isMy: boolean
}

const ChatMessage = ({
  message,
  connectionId,
  avatar: userAvatar
}: {
  message: ChatMessageType
  connectionId: string | number
  avatar?: string
}) => {
  const user = useRecoilValue(userAtom)
  const isMy = message.connection_id.toString() === connectionId.toString()
  const avatar = isMy ? convertImgToLink(user?.profile.photos[0]) : userAvatar

  const [isTimeVisible, setIsTimeVisible] = useState(false)

  const handleTime = () => {
    LayoutAnimation.linear()
    setIsTimeVisible(!isTimeVisible)
  }

  const right = (width - 30) * 0.2 - 33

  return (
    <View>
      <MessageContainer
        isMy={isMy}
        isTimeVisible={isTimeVisible}
        onPress={handleTime}>
        <Render if={!!avatar}>
          <StyledAvatar source={{ uri: avatar }} />
        </Render>
        <Text color={'#B0B0B0'} style={{ flex: 1 }} size={13}>
          {message.message}
        </Text>
      </MessageContainer>

      <View
        style={{
          position: 'absolute',
          right: isTimeVisible ? (isMy ? 0 : right) : -70,
          bottom: 8,
          width: 40,
          alignItems: 'center'
        }}>
        <Text color="rgb(176,176,176)">02:15</Text>
      </View>
    </View>
  )
}

const MessageContainer = styled.TouchableOpacity<{
  isMy: boolean
  isTimeVisible: boolean
}>`
  background-color: black;
  padding: 15px;
  border-radius: 10px;
  max-width: 80%;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  border-color: rgba(243, 211, 133, 0.1);
  border-width: 1px;
  ${({ isTimeVisible }) => (isTimeVisible ? `margin-right: 48px` : '')}
  ${({ isTimeVisible, isMy }) =>
    isTimeVisible && !isMy ? `margin-left: -15px` : ''}
	${({ isMy }) => (isMy ? `align-self: flex-end; border-color: black;` : '')}
`

const StyledAvatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 15px;
`

export default ChatMessage
