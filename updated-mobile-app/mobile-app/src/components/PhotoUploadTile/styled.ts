import styled from "styled-components/native"
import { makeStylable } from "../utils/styled"
import Colors from "../../constants/Colors"
import { RADIUS_BASE } from "../../constants/Style"

const PhotoUploadTileContainer = styled.Pressable`
	background-color: ${Colors.black};
	justify-content: center;
	align-items: center;
	border-radius: ${RADIUS_BASE}px;
`

export const StylablePhotoUploadTileContainer = makeStylable(
	PhotoUploadTileContainer
)
