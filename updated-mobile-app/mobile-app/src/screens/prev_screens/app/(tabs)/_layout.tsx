import { Dimensions, Platform, StatusBar, TouchableOpacity, View } from "react-native"
import { Link, Tabs, useRouter } from "expo-router"
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons"

import { BottomTabBar } from "../../../../components/BottomTabBar"
import BottomTabNavBackground from "../../../assets/images/BottomTabNavBackground.svg"
import { Button } from "../../../../components"
import Chat from "../../../assets/icons/Chat.svg"
import ChatActive from "../../../assets/icons/ChatActive.svg"
import Events from "../../../assets/icons/Events.svg"
import EventsActive from "../../../assets/icons/EventsActive.svg"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Header } from "../../../../components/Header"
import Map from "../../../assets/icons/Map.svg"
import MapActive from "../../../assets/icons/MapActive.svg"
import Profile from "../../../assets/icons/Profile.svg"
import ProfileActive from "../../../assets/icons/ProfileActive.svg"
import React from "react"
import { Render } from "../../../../components/utils/Render"
import Settings from "../../../assets/icons/Settings.svg"
import SettingsActive from "../../../assets/icons/SettingsActive.svg"
import colors from "../../../../constants/Colors"
import styled from "styled-components/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const StyledTabBarIconContainer = styled.View`
	margin-bottom: 15px;
	width: 36.5px;
	justify-content: center;
	align-items: center;
`

function TabBarIcon(props: { icon: () => JSX.Element }) {
	return <StyledTabBarIconContainer>{props.icon()}</StyledTabBarIconContainer>
}

const screenWidth = Dimensions.get("screen").width

export default function TabLayout() {
	const { bottom } = useSafeAreaInsets()
	const { push } = useRouter()

	return (
		<>
			<StatusBar barStyle={'light-content'} />
			<Tabs
				screenOptions={({ route }) => {
					return {
						tabBarShowLabel: false,
						headerTitleAlign: "center",
						headerStyle: {
							backgroundColor: colors.black,
							elevation: 0,
							shadowOpacity: 0,
						},
						headerTitleStyle: {
							color: colors.white,
							fontFamily: "Euclid-Medium",
						},
						tabBarStyle: {
							backgroundColor: "transparent",
							height: 76,
							borderTopWidth: 0,
							paddingHorizontal: 10,
							position: "absolute",
						},
						headerRight: () => {
							return (
								<TouchableOpacity
									style={{ paddingRight: 20 }}
									onPress={() => push("app/notifications")}
								>
									<MaterialCommunityIcons
										name="bell-ring-outline"
										size={20}
										color="white"
									/>
								</TouchableOpacity>
							)
						},
						tabBarBackground: () => {
							return <BottomTabBar routeName={route.name} />
						},
						tabBarHideOnKeyboard: true,
					}
				}}
			>
				<Tabs.Screen
					name="profile/index"
					options={{
						title: "Profile",
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={() =>
									focused ? <ProfileActive /> : <Profile />
								}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="events/index"
					options={{
						title: "Clubs",
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={() =>
									focused ? <EventsActive /> : <Events />
								}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="map/index"
					options={{
						title: "Map",
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={() => (focused ? <MapActive /> : <Map />)}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="chat/index"
					options={{
						title: "Message",
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={() =>
									focused ? <ChatActive /> : <Chat />
								}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name="settings/index"
					options={{
						title: "Settings",
						tabBarIcon: ({ focused }) => (
							<TabBarIcon
								icon={() =>
									focused ? <SettingsActive /> : <Settings />
								}
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}
