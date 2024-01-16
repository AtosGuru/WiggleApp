import styled from "styled-components/native"
import { RADIUS_BASE } from "../../constants/Style"
import Colors from "../../constants/Colors"

export const CodeInputContainer = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 20px;
`

export const CodeInputElementContainer = styled.View`
	padding: 10px;
	border-radius: ${RADIUS_BASE}px;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 50px;
	border: 1px solid ${Colors.white2};
	background-color: ${Colors.black};
`
export const CodeTextInput = styled.TextInput`
	text-align: center;
	color: ${Colors.white};
`
