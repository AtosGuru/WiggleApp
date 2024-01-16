import { ButtonProps, renderButtonContent } from "./Button"
import {
	StyledButtonBase,
	StyledButtonGradient,
	StyledButtonOutline,
	StyledPressable,
} from "./styled"
import React from "react"
import colors from "../../constants/Colors"
import { useRouter } from "expo-router"

export function GradientButton(props: ButtonProps) {
	const router = useRouter()

	const onPress = () => {
		if (props.href) {
			router.push(props.href)
		}

		props.onPress && props.onPress()
	}

	return (
		<StyledPressable onPress={onPress} style={props.style}>
			<StyledButtonGradient
				valid={props.valid}
				colors={["#FFCB52", "#FF7B02"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				{renderButtonContent({
					...props,
					textProps: {
						...props.textProps,
						color: colors.black,
						size: 18,
						lineHeight: 18,
						font: "Euclid-Medium",
					},
				})}
			</StyledButtonGradient>
		</StyledPressable>
	)
}
