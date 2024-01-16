import styled from "styled-components/native"
import { makeStylable } from "../utils/styled"
import Colors from "../../constants/Colors"
import { RADIUS_BASE } from "../../constants/Style"

const StyledCheckboxContainer = styled.Pressable`
	padding: 15px;
	background-color: ${Colors.black};
	border-radius: ${RADIUS_BASE}px;
	flex-direction: row;
`

export const StylableCheckboxContainer = makeStylable(StyledCheckboxContainer)
