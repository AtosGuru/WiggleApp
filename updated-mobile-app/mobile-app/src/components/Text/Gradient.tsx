import { StyleProp, ViewStyle } from "react-native"
import { Text, TextProps } from "./Text"

import { LinearGradient } from "expo-linear-gradient"
import MaskedView from "@react-native-masked-view/masked-view"
import React from "react"

export function TextGradient(
	props: TextProps & { containerStyle?: StyleProp<ViewStyle> }
) {
	return (
		<MaskedView
			maskElement={<Text {...props} />}
			style={props.containerStyle}
		>
			<LinearGradient
				colors={["#FFCB52", "#FF7B02"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<Text {...props} style={[props.style, { opacity: 0 }]} />
			</LinearGradient>
		</MaskedView>
	)
}
