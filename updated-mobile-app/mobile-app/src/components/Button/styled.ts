import styled from "styled-components/native"
import { Pressable, TouchableOpacity, TouchableOpacityBase } from "react-native"
import { RADIUS_BASE } from "../../constants/Style"
import Colors from "../../constants/Colors"
import { LinearGradient } from "expo-linear-gradient"
import colors from "../../constants/Colors"

export const StyledButtonBase = styled.View`
	border-radius: ${RADIUS_BASE}px;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	width: 100%;
	height: 60px;
`
export const StyledButtonOutline = styled(StyledButtonBase)`
	background-color: transparent;
	border: 1px solid ${Colors.white};
`

export const StyledButtonGradient = styled<{ valid: boolean }>(LinearGradient)`
	border-radius: ${RADIUS_BASE}px;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
	width: 100%;
	height: 60px;
	${({ valid }) =>
		typeof valid === "boolean" &&
		!valid &&
		`
  			opacity: 0.5;
  	`}
`

export const StyledPressable = styled(Pressable)`
	width: 100%;
`

export const StyledButtonIcon = styled.View`
	background-color: ${colors.white1};
	border-radius: ${RADIUS_BASE}px;
	padding: 7px;
	align-items: center;
`
