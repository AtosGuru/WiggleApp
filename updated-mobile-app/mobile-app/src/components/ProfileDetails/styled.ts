import styled from "styled-components/native"
import colors from "../../constants/Colors"
import { RADIUS_BASE } from "../../constants/Style"

export const ProfileDetailsContainer = styled.View`
	border-radius: ${RADIUS_BASE}px;
`

export const ProfileDetailsRow = styled.View`
	border-bottom-color: ${colors.white1};
	border-bottom-width: 1px;
	justify-content: space-between;
	flex-direction: row;
	margin-bottom: 15px;
	padding-bottom: 15px;
`
