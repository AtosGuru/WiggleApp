import { Pressable, useWindowDimensions } from "react-native"
import React, { FunctionComponent } from "react"

import Colors from "../../../../../constants/Colors"
import FastImage from "react-native-fast-image"
import { Flex } from "../../../../../components/utils/styled"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { NotificationsItem } from "../../../../../components/NotificationsItem/NotificationsItem"
import { ScreenWrapper } from "../../../../../components/ScreenWrapper"
import { TabBar } from "react-native-tab-view"
import { Text } from "../../../../../components"
import colors from "../../../../../constants/Colors"
import styled from "styled-components/native"
import { useRecoilValue } from "recoil"
import { useRouter } from "expo-router"
import { userAtom } from "../../../../../state/user.atom"

const FriendsModal: FunctionComponent = () => {
	const { back } = useRouter()

	const user = useRecoilValue(userAtom)
	const photo = user?.profile?.photos[0] || ""

	return (
		<StyledScreenWrapper>
			<Flex f={false} row spaceBetween alignCenter mb={30}>
				<Text color={Colors.white} font={"Euclid-Medium"} size={24}>
					Friends
				</Text>
				<Pressable onPress={back}>
					<MaterialCommunityIcons
						name="window-close"
						size={24}
						color={Colors.white}
					/>
				</Pressable>
			</Flex>
			<WrapRow>
				{Array(10)
					.fill(null)
					.map((el, i) => (
						<FriendsItem key={i}>
							<StyledAvatar source={{ uri: photo }} />
							<Text color={"white"}>@mc_girls</Text>
						</FriendsItem>
					))}
			</WrapRow>
		</StyledScreenWrapper>
	)
}

const StyledScreenWrapper = styled(ScreenWrapper)`
	background-color: rgba(0, 0, 0, 0.8);
`

const StyledAvatar = styled(FastImage)`
	width: 75px;
	height: 75px;
	border-radius: 75px;
	margin-bottom: 10px;
`

const FriendsItem = styled.View`
	width: 33%;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
`

const WrapRow = styled.View`
	flex: 1;
	flex-direction: row;
	flex-wrap: wrap;
`

export default FriendsModal
