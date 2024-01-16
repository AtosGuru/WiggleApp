import { TextProps as RNTextProps } from "react-native"
import { fontName } from "./fonts"
import { StylableText } from "./styled"
import Colors from "../../constants/Colors"
import { StylableProps } from "../utils/styled"
import { TextGradient } from "./Gradient"
export interface TextProps extends RNTextProps {
	size?: number
	color?: string | keyof typeof Colors
	font?: fontName
	lineHeight?: number
}

export function Text(props: TextProps & StylableProps) {
	const color = Colors[props.color as keyof typeof Colors] || props.color

	return (
		<StylableText {...props} color={color}>
			{props.children}
		</StylableText>
	)
}

Text.Gradient = TextGradient
