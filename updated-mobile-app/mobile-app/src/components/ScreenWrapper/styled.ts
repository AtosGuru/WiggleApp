import styled from "styled-components/native"
import { SafeAreaView } from "react-native-safe-area-context"
import Colors from "../../constants/Colors"
import { makeStylable } from "../utils/styled"

// @ts-ignore
export const StyledSafeAreaView = styled<{ disablePadding: boolean }>(
	SafeAreaView
)`
	padding: ${({ disablePadding }) => (disablePadding ? "0px;" : "15px;")}
	flex: 1;
	background-color: ${Colors.black2};
`

export const StylableSafeAreaView = makeStylable(StyledSafeAreaView)
