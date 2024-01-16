import BottomTabNavBackground from "../../assets/images/BottomTabNavBackground.svg"
import { Render } from "../utils/Render"
import { Dimensions, View } from "react-native"
import React, { useEffect } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated"

const routes = [
	"profile/index",
	"events/index",
	"map/index",
	"chat/index",
	"settings/index",
]

export function BottomTabBar({ routeName }: { routeName: string }) {
	const { bottom } = useSafeAreaInsets()
	const screenWidth = Dimensions.get("screen").width
	const base = (screenWidth - 10 - 36.5 * routes.length) / (routes.length * 2)

	const animatedRouteIndex = useSharedValue(0)

	useEffect(() => {
		animatedRouteIndex.value = routes.indexOf(routeName)
	}, [routeName])

	const style = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(
						((screenWidth - 20) / routes.length) *
							animatedRouteIndex.value,
						{
							duration: 300,
							easing: Easing.bezier(0.25, 0.1, 0.25, 1),
						}
					),
				},
			],
		}
	})

	return (
		<>
			<Animated.View style={style}>
				<BottomTabNavBackground
					height={76}
					style={{
						position: "relative",
						right: 410 - base,
						bottom: bottom !== 0 ? bottom - 19 : 0,
					}}
				/>
			</Animated.View>
			<Render if={bottom !== 0}>
				<View
					style={{
						backgroundColor: "black",
						position: "absolute",
						bottom: 0,
						height: 19,
						width: "100%",
					}}
				></View>
			</Render>
		</>
	)
}
