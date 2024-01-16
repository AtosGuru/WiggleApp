import { Button, Text } from "../../../../../components"
import { Link, Tabs, useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { ScrollView, Switch } from "react-native"

import Colors from "../../../../../constants/Colors"
import { Feather } from "@expo/vector-icons"
import { Flex } from "../../../../../components/utils/styled"
import { RADIUS_BASE } from "../../../../../constants/Style"
import { Render } from "../../../../../components/utils/Render"
import { ScreenWrapper } from "../../../../../components/ScreenWrapper"
import SegmentedControl from "@react-native-segmented-control/segmented-control"
import { color } from "react-native-reanimated"
import colors from "../../../../../constants/Colors"
import { logout } from "../../../../../api"
import styled from "styled-components/native"
import { useMutation } from "react-query"
import { useSetRecoilState } from "recoil"
import { userAtom } from "../../../../../state/user.atom"

export default function Settings() {
	const { push } = useRouter()
	const setUser = useSetRecoilState(userAtom)
	const { mutate, isLoading, isSuccess } = useMutation(logout)
	const [accountType, setAccountType] = useState(0)

	useEffect(() => {
		if (isSuccess) {
			setUser(null)
		}
	}, [isSuccess])

	const renderItem = ({
		title,
		value,
		onPress,
		last,
		toggle,
		renderControl,
		containerStyle,
	}: {
		title?: string
		value?: string
		onPress: () => void
		last?: boolean
		toggle?: boolean
		renderControl?: () => JSX.Element
		containerStyle?: any
	}) => (
		<Flex f={null} mb={last ? 0 : 15}>
			<Render if={!!title}>
				<Text color={"textGray"} mb={10}>
					{title}
				</Text>
			</Render>
			<StyledSettingsItemContainer
				onPress={onPress}
				style={containerStyle}
			>
				<Render if={!!value}>
					<Text color={"white"}>{value}</Text>
				</Render>
				<Render if={!toggle && !renderControl}>
					<Button.Icon style={{ borderRadius: 20 }}>
						<Feather name="chevron-right" size={24} color="white" />
					</Button.Icon>
				</Render>
				<Render if={toggle && !renderControl}>
					<Switch
						trackColor={{ false: "#252525", true: "#252525" }}
						thumbColor={"#f8a52d"}
						ios_backgroundColor="#3e3e3e"
						value={true}
					/>
				</Render>
				{renderControl && renderControl()}
			</StyledSettingsItemContainer>
		</Flex>
	)

	return (
		<Flex style={{ backgroundColor: colors.black2 }}>
			<Tabs.Screen
				options={{
					headerShown: true,
					tabBarStyle: {
						backgroundColor: colors.black2,
						paddingHorizontal: 10,
						height: 76,
						borderTopWidth: 0,
					},
				}}
			/>
			<ScrollView style={{ padding: 15 }}>
				<Text color={"textGray"} mb={15}>
					General Settings
				</Text>
				<StyledSettingsGroupContainer>
					{renderItem({
						title: "Language",
						value: "English",
						onPress: () => { },
					})}
					{renderItem({
						title: "Notifications",
						value: "On",
						toggle: true,
						onPress: () => { },
					})}
					{renderItem({
						value: "Terms and Conditions",
						onPress: () => { },
					})}
					{renderItem({
						value: "Privacy Policy",
						onPress: () => { },
						last: true,
					})}
				</StyledSettingsGroupContainer>
				<Text color={"textGray"} mb={15}>
					Privacy
				</Text>
				<StyledSettingsGroupContainer>
					{renderItem({
						title: "Account type",
						toggle: true,
						onPress: () => { },
						containerStyle: {
							flexDirection: undefined,
							justifyContent: undefined,
							alignItems: undefined,
						},
						renderControl: () => (
							<SegmentedControl
								values={["Public", "Private"]}
								selectedIndex={accountType}
								backgroundColor={"#252525"}
								tintColor={"#f8a52d"}
								activeFontStyle={{
									color: colors.black,
								}}
								onChange={event => {
									setAccountType(
										event.nativeEvent.selectedSegmentIndex
									)
								}}
							/>
						),
					})}
					{renderItem({
						value: "Blocked Users",
						onPress: () => { push('app/(settings)/blocked-users') },
						last: true,
					})}
				</StyledSettingsGroupContainer>
				<Button.Outline
					style={{ marginTop: 30 }}
					onPress={() => mutate({})}
					loading={isLoading}
				>
					Logout
				</Button.Outline>
			</ScrollView>
		</Flex>
	)
}

const StyledSettingsItemContainer = styled.Pressable`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 15px;
	border-radius: ${RADIUS_BASE}px;
	background-color: ${colors.black2};
	border: 1px solid #191919;
`

const StyledSettingsGroupContainer = styled.View`
	background-color: ${Colors.black};
	border-radius: ${RADIUS_BASE}px;
	padding: 15px;
	margin-bottom: 20px;
`
