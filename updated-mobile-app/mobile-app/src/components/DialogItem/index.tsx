import { Link, useNavigation, useRouter } from "expo-router"
import { TouchableOpacity, View } from "react-native"

import { Flex } from "../utils/styled"
import { LinearGradient } from "expo-linear-gradient"
import { Text } from "../Text"
import styled from "styled-components/native"

interface DialogItemProps {
	avatar: string
	name: string
	lastMessage: string
	onPress: () => void
}

export const DialogItem = ({ avatar, name, lastMessage, onPress }) => {
	const { push } = useRouter()

	return (
		<TouchableOpacity onPress={onPress} style={{ marginBottom: 12 }}>
			<LinearGradient
				style={{ paddingHorizontal: 1, borderRadius: 11 }}
				colors={["#FFCB52", "#FF7B02"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			>
				<StyledDialogItem>
					<StyledAvatar
						source={
							avatar
								? { uri: avatar }
								: require("../../assets/images/mockAvatar.jpg")
						}
					/>
					<View style={{ flex: 1 }}>
						<Row>
							<Text.Gradient font="Euclid-Bold">{name}</Text.Gradient>
							<Text color={"#B0B0B0"}>09:12</Text>
						</Row>
						<Text color={"white"} numberOfLines={1}>
							Hello! How are you? Are you going to the  Are you going to the
						</Text>
					</View>
				</StyledDialogItem>
			</LinearGradient>
		</TouchableOpacity>
	)
}

const Row = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 8px;
`

const StyledDialogItem = styled.View`
	flex-direction: row;
	align-items: center;
	background-color: black;
	padding: 15px;
	border-radius: 10px;
`

const StyledAvatar = styled.Image`
	height: 40px;
	width: 40px;
	border-radius: 20px;
	margin-right: 15px;
`
