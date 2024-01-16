import styled from "styled-components/native"
import Colors from "../../constants/Colors"
import { RADIUS_BASE } from "../../constants/Style"
import { TextInput } from "react-native"
import { makeStylable } from "../utils/styled"

export const StyledTextInput = styled(TextInput)`
	font-size: 14px;
	line-height: 18px;
	color: ${Colors.white};
	flex: 1;
	height: 18px;
	margin: 10px 0;
`

export const StyledTextInputContainer = styled.Pressable<{ error: boolean }>`
	border: 1px solid ${Colors.white2};
	background-color: ${Colors.black};
	border-radius: ${RADIUS_BASE}px;
	padding: 8px 20px;
	margin-bottom: 20px;
	flex-direction: row;
	align-items: center;

	${({ error }) =>
		error &&
		`
		border-color: ${Colors.formErrorBorderRed};
		margin-bottom: 8px;
	`}
`

export const StyledSolidTextInputContainer = styled.View<{ error: boolean }>`
	border-radius: ${RADIUS_BASE}px;
	padding: 8px 20px;
	margin-bottom: 20px;
	width: 100%;
	background-color: ${Colors.black};
	flex-direction: row;
	align-items: center;

	${({ error }) =>
		error &&
		`
		border-color: ${Colors.formErrorBorderRed};
		border-width: 1px;
		margin-bottom: 8px;
	`}
`

export const StylableTextInputContainer = makeStylable(StyledTextInputContainer)
export const StylableSolidTextInputContainer = makeStylable(
	StyledSolidTextInputContainer
)
