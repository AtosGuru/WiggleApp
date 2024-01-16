import { ProfileDetailsContainer, ProfileDetailsRow } from './styled'
import React from 'react'
import { Text } from '../Text'
import { User } from '../../../types/user.interface'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Flex } from '../utils/styled'
import { Button } from '../Button'
import Colors from '../../constants/Colors'
import { View } from 'react-native'
import { Render } from '../utils/Render'
import { userAtom } from '../../state/user.atom'
import { useRecoilValue } from 'recoil'
import { PartyPopper, UserPlus2 } from 'lucide-react-native'
import { color } from 'react-native-reanimated'
import colors from '../../constants/Colors'
import { newConnection } from '../../api/connections.methods'
import { ConnectionType } from '../../types/enum'
import Toast from 'react-native-toast-message'
import Chat from '../../assets/icons/Chat.svg'
import { useRouter } from 'expo-router'

export function ProfileDetails({ user }: { user: User }) {
  const currentUser = useRecoilValue(userAtom)
  const router = useRouter()
  const handleAddFriend = async () => {
    try {
      await newConnection({
        type: ConnectionType.REQUESTED,
        partner_id: user.id
      })
      Toast.show({
        type: 'success',
        text1: 'Friend request was sent'
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handeChatRedirect = async () => {
    try {
      const connection = await newConnection({
        type: ConnectionType.MESSAGE,
        partner_id: user.id
      })

      router.push({
        pathname: `app/dialog/${user.id}`,
        params: { connection_id: connection.id }
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) return null
  const isCurrentUser = user.id === currentUser?.id

  return (
    <ProfileDetailsContainer>
      <Flex row spaceBetween>
        <Flex>
        
          <Text.Gradient
            font={'Euclid-Bold'}
            size={24}
            containerStyle={{
              marginBottom: user?.profile?.username ? 4 : 25 + 4,
              flex: 1
            }}>
            {user?.profile?.firstName} {user?.profile?.lastName}
          </Text.Gradient>
          <Render if={!!user?.profile?.username}>
            <Text color={'textGray'} style={{ marginBottom: 25 }} size={14}>
              @{user?.profile?.username}
            </Text>
          </Render>
        </Flex>
        <Flex row justifyEnd>
          <Render if={isCurrentUser}>
            <Button.Icon href={'app/profileEditModal'}>
              <View style={{ padding: 2 }}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={20}
                  color={Colors.white}
                />
              </View>
            </Button.Icon>
          </Render>
          <Render if={!isCurrentUser}>
            <Button.Icon style={{ marginRight: 5 }} onPress={handleAddFriend}>
              <View style={{ padding: 2 }}>
                <UserPlus2 color={colors.white} />
              </View>
            </Button.Icon>
            <Button.Icon style={{ marginRight: 5 }} onPress={handeChatRedirect}>
              <View style={{ padding: 2 }}>
                <Chat color={'white'} />
              </View>
            </Button.Icon>
            <Button.Icon>
              <View style={{ padding: 2 }}>
                <PartyPopper color={colors.white} />
              </View>
            </Button.Icon>
          </Render>
        </Flex>
      </Flex>
      <Render if={!!user?.profile?.description}>
        <Text color={'white'} mb={10}>
          Bio
        </Text>
        <Text color={'textGray'}>{user?.profile?.description}</Text>
      </Render>
    </ProfileDetailsContainer>
  )
}
