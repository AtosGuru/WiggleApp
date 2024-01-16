import styled from "styled-components/native"
import { fontName } from "./fonts"
import { makeStylable } from "../utils/styled"

const StyledText = styled.Text<{
	size?: number
	font?: fontName
	color?: string
	lineHeight?: number
}>`
	font-size: ${props => props.size || 16}px;
	font-family: ${props => props.font || "Euclid-Regular"};
	color: ${props => props.color || "#000"};
	${props => props.lineHeight && `line-height: ${props.lineHeight}px;`}
`

export const StylableText = makeStylable(StyledText)
