import { ButtonProps, renderButtonContent } from "./Button"
import { Pressable } from "react-native"
import {
	StyledButtonBase,
	StyledButtonOutline,
	StyledPressable,
} from "./styled"
import React from "react"
import { Text } from "../Text"
import { Render } from "../utils/Render"
import { useRouter } from "expo-router"

export function OutlineButton(props: ButtonProps) {
	const router = useRouter()

	const onPress = () => {
		if (props.href) {
			router.push(props.href)
		}

		props.onPress && props.onPress()
	}

	return (
		<StyledPressable onPress={onPress} style={props.style}>
			<StyledButtonOutline>
				{renderButtonContent({
					...props,
					textProps: { ...props.textProps, color: "white" },
				})}
			</StyledButtonOutline>
		</StyledPressable>
	)
}
