import { ConnectionType, QueryKey } from "../../../../../types/enum"
import { FlatList, Pressable, RefreshControl, SafeAreaView } from "react-native"
import React, { FunctionComponent } from "react"
import {
	getConnections,
	newConnection,
} from "../../../../../api/connections.methods"

import Colors from "../../../../../constants/Colors"
import { Flex } from "../../../../../components/utils/styled"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { NotificationsItem } from "../../../../../components/NotificationsItem/NotificationsItem"
import { ScreenWrapper } from "../../../../../components/ScreenWrapper"
import { Text } from "../../../../../components"
import { User } from "../../../../../types/user.interface"
import { getNotifications } from "../../../../../api/notifications.methods"
import styled from "styled-components/native"
import { useQuery } from "react-query"
import { useRecoilValue } from "recoil"
import { useRouter } from "expo-router"
import { userAtom } from "../../../../../state/user.atom"

const NotificationsScreen: FunctionComponent = () => {
	const { back } = useRouter()

	const user = useRecoilValue(userAtom)

	const { data, isRefetching, refetch } = useQuery(
		[QueryKey.connections, ConnectionType.REQUESTED, user?.id],
		getConnections
	)

	const acceptFriendRequest = async (partnerId: number) => {
		await newConnection({
			partner_id: partnerId,
			type: ConnectionType.CONNECTED,
		})
		refetch()
	}

	return (
		<StyledContainer>
			<Flex p={15} py={30}>
				<Flex f={false} row spaceBetween alignCenter mb={30}>
					<Text color={Colors.white} font={"Euclid-Medium"} size={24}>
						Notifications
					</Text>
					<Pressable onPress={back}>
						<MaterialCommunityIcons
							name="window-close"
							size={24}
							color={Colors.white}
						/>
					</Pressable>
				</Flex>
				<FlatList
					data={data?.connections}
					renderItem={({ item: connection }) => {
						const avatar = connection?.partner?.profile?.photos[0]
						return (
							<NotificationsItem
								imageSource={
									avatar ? { uri: avatar } : undefined
								}
								title={`${connection?.partner?.profile?.firstName} ${connection?.partner?.profile?.lastName}`}
								subtitle={`wants to be your friend`}
								unread
								buttons={[
									{
										text: "Accept",
										onPress: () =>
											acceptFriendRequest(
												connection.partner.id
											),
									},
									{ text: "Decline", onPress: () => { } },
								]}
							/>
						)
					}}
					refreshControl={
						<RefreshControl
							refreshing={isRefetching}
							onRefresh={refetch}
						/>
					}
				/>
			</Flex>
		</StyledContainer>
	)
}

const StyledContainer = styled(SafeAreaView)`
	background-color: ${Colors.black2};
	flex: 1;
`

export default NotificationsScreen
