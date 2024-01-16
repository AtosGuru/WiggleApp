import { useWindowDimensions, View, StatusBar } from "react-native"
import React, { useEffect } from "react"
import { Stack } from "expo-router"

import Logo from "../../../assets/icons/WelcomeLogo.svg"
import { StyledScreenContainer } from "./styled"
import { Button, Text } from "../../../components"
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"
import { Flex } from "../../../components/utils/styled"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Welcome() {
	const offset = useSharedValue(1)
	const { height } = useWindowDimensions()
	const { top } = useSafeAreaInsets()

	const logoStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY:
						offset.value * ((height - top) / 2 - 75 - 217 / 2),
				},
			],
		}
	})

	const opacityStyles = useAnimatedStyle(() => {
		return {
			opacity: 1 - offset.value,
		}
	})

	useEffect(() => {
		setTimeout(() => {
			offset.value = withTiming(0, {
				duration: 1000,
				easing: Easing.out(Easing.inOut(Easing.ease)),
			})
		}, 2500)
	}, [])

	return (
		<StyledScreenContainer>
			<StatusBar barStyle={'light-content'} />
			<Stack.Screen options={{ headerShown: false }} />
			<Animated.View
				style={[
					{
						marginTop: 50,
						alignItems: "center",
						justifyContent: "center",
						marginBottom: 120,
						height: 217,
					},
					logoStyles,
				]}
			>
				<Logo />
			</Animated.View>
			<Animated.View
				style={[
					{ width: "100%", alignItems: "center", flex: 1 },
					opacityStyles,
				]}
			>
				<Text size={22} color={"white"}>
					The Night Out Starts Now
				</Text>
				<Flex />
				<Button.Outline href={"auth/signUp"}>Sign Up</Button.Outline>
				<Button.Outline href={"auth/login"}>Log In</Button.Outline>
			</Animated.View>
		</StyledScreenContainer>
	)
}
