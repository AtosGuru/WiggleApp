import { ButtonProps, renderButtonContent } from "./Button"
import {
	StyledButtonBase,
	StyledButtonGradient,
	StyledButtonIcon,
	StyledButtonOutline,
	StyledPressable,
} from "./styled"
import React from "react"
import colors from "../../constants/Colors"
import { useRouter } from "expo-router"
import { Pressable } from "react-native"
import { StylableProps } from "../utils/styled"

export function IconButton(props: ButtonProps & StylableProps) {
	const router = useRouter()

	const onPress = () => {
		if (props.href) {
			router.push(props.href)
		}

		props.onPress && props.onPress()
	}

	return (
		<Pressable onPress={onPress} style={props.style}>
			<StyledButtonIcon {...props}>
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
			</StyledButtonIcon>
		</Pressable>
	)
}
