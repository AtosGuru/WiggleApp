import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'
import { ConnectionType, QueryKey } from '../../../../../types/enum'
import {
  ConnectionsResponse,
  getConnections
} from '../../../../../api/connections.methods'

import { DialogItem } from '../../../../../components/DialogItem'
import { Flex } from '../../../../../components/utils/styled'
import React from 'react'
import { ScreenWrapper } from '../../../../../components/ScreenWrapper'
import { Text } from '../../../../../components'
import { color } from 'react-native-reanimated'
import colors from '../../../../../constants/Colors'
import { getChats } from '../../../../../api/chat.methods'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'expo-router'
import { userAtom } from '../../../../../state/user.atom'

export default function Chat() {
  const user = useRecoilValue(userAtom)
  const { data, refetch, isRefetching, isLoading } = useQuery(
    [QueryKey.chats],
    getChats
  )
  const { push } = useRouter()

  const handlePress =
    (connection: ConnectionsResponse['connections'][number]) => () => {
      push({
        pathname: `app/dialog/${connection.partner_id}`,
        params: {
          connection_id: connection.id
        }
      })
    }

  const { connections } = data || {}

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black2 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingBottom: 100,
          flex: 1
        }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }>
        {connections &&
          connections.map(connection => {
            return (
              <DialogItem
                onPress={handlePress(connection)}
                avatar={connection.partner.profile?.photos?.[0]}
                name={
                  connection.partner.profile.firstName +
                  ' ' +
                  connection.partner.profile.lastName
                }
                lastMessage={'123'}
              />
            )
          })}

        {!connections ||
          (connections.length <= 0 && (
            <Flex justifyCenter alignCenter>
              <Text color={colors.white}>You have no dialogs</Text>
            </Flex>
          ))}
      </ScrollView>
    </SafeAreaView>
  )
}
