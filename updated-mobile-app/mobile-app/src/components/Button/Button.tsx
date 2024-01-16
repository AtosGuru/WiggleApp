import {
	ActivityIndicator,
	Pressable,
	StyleProp,
	View,
	ViewStyle,
} from "react-native"
import React from "react"
import { StyledButtonBase, StyledPressable } from "./styled"
import { OutlineButton } from "./Outline"
import { Text, TextProps } from "../Text"
import { Render } from "../utils/Render"
import { GradientButton } from "./Gradient"
import { useRootNavigation, useRouter } from "expo-router"
import { IconButton } from "./Icon"
import colors from "../../constants/Colors"
import { StylableProps } from "../utils/styled"

export interface ButtonProps {
	onPress?: () => void
	children: JSX.Element | string
	textProps?: TextProps
	href?: string
	style?: StyleProp<ViewStyle>
	loading?: boolean
	valid?: boolean
}

export function renderButtonContent({
	textProps,
	children,
	loading,
}: ButtonProps) {
	if (loading) {
		return <ActivityIndicator color={textProps?.color || "black"} />
	}

	return (
		<Render
			if={typeof children === "string"}
			else={children as JSX.Element}
		>
			<Text {...textProps}>{children}</Text>
		</Render>
	)
}

export function Button(props: ButtonProps & StylableProps) {
	const router = useRouter()

	const onPress = () => {
		if (props.href) {
			router.push(props.href)
		}

		props.onPress && props.onPress()
	}

	return (
		<StyledPressable onPress={onPress} style={props.style} {...props}>
			{renderButtonContent(props)}
		</StyledPressable>
	)
}

Button.Outline = OutlineButton
Button.Gradient = GradientButton
Button.Icon = IconButton
