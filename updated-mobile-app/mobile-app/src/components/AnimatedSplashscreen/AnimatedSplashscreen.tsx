import LottieView from "lottie-react-native"
import React, { FunctionComponent, ReactNode, useEffect } from "react"
import { Animated } from "react-native"
import { Flex } from "../utils/styled"
import Colors from "../../constants/Colors"
import { Render } from "../utils/Render"

export const AnimatedSplashscreen: FunctionComponent<{
	children: ReactNode
	loaded: boolean
}> = ({ children, loaded }) => {
	const animation = React.useRef(null)
	const opacity = React.useRef(new Animated.Value(1)).current
	const [animationPlayed, setAnimationPlayed] = React.useState(false)

	useEffect(() => {
		setTimeout(() => {
			Animated.timing(opacity, {
				toValue: 0.5,
				duration: 200,
				useNativeDriver: true,
			}).start()
		}, 2500)

		setTimeout(() => {
			setAnimationPlayed(true)
		}, 2700)
	}, [])
	return (
		<>
			{loaded && children}
			{!animationPlayed && (
				<Animated.View
					style={{
						opacity: opacity,
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: Colors.black,
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
					}}
				>
					<LottieView
						loop={false}
						autoPlay
						ref={animation}
						style={{
							width: 400,
							height: 400,
							backgroundColor: Colors.black,
						}}
						source={require("../../assets/animations/Splashscreen.json")}
					/>
				</Animated.View>
			)}
		</>
	)
}
