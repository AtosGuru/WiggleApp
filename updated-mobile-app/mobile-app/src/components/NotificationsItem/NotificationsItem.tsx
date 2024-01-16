import styled from "styled-components/native"
import { Text } from "../Text"
import { ImageProps, TouchableOpacity, View } from "react-native"
import { Flex, StylableView } from "../utils/styled"
import { Link, useNavigation, useRouter } from "expo-router"
import { Render } from "../utils/Render"

interface NotificationsItemProps {
	title: string
	subtitle: string
	imageSource?: ImageProps["source"]
	unread?: boolean
	buttons: {
		text: string
		onPress: () => void
	}[]
}

export const NotificationsItem = ({
	unread,
	buttons,
	imageSource,
	title,
	subtitle,
}: NotificationsItemProps) => {
	const { push } = useRouter()
	return (
		<TouchableOpacity>
			<StyledNotificationItem unread={unread}>
				<StyledAvatar
					source={
						imageSource ||
						require("../../assets/images/mockAvatar.jpg")
					}
				/>
				<View style={{ flex: 1 }}>
					<Row>
						<Text.Gradient style={{ fontWeight: "700" }}>
							{title}
						</Text.Gradient>
						<Text color={"#B0B0B0"}>9:12</Text>
					</Row>
					<Text color={"white"} numberOfLines={1}>
						{subtitle}
					</Text>
					<Render if={!!buttons}>
						<Row mt={10}>
							{buttons &&
								buttons.map(({ text, onPress }, i) => (
									<ActionButton
										key={i}
										onPress={onPress}
										last={i === buttons.length - 1}
									>
										<Text color={"white"}>{text}</Text>
									</ActionButton>
								))}
						</Row>
					</Render>
				</View>
			</StyledNotificationItem>
		</TouchableOpacity>
	)
}

const ActionButton = styled.TouchableOpacity`
	padding: 8px;
	border-radius: 8px;
	background-color: #191919;
	flex: 1;
	align-items: center;
	${({ last }) =>
		last
			? ""
			: `
	margin-right: 8px;
`}
`

const Row = styled(StylableView)`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 8px;
`

const StyledNotificationItem = styled.View<{ unread?: boolean }>`
	flex-direction: row;
	background-color: black;
	padding: 15px;
	margin-bottom: 10px;
	border-radius: 10px;

	${p =>
		p.unread
			? `
		border-left-width: 1px;		
		border-right-width: 1px;
				border-color: #F3D385;
	`
			: ""}
`

const StyledAvatar = styled.Image`
	height: 40px;
	width: 40px;
	border-radius: 20px;
	margin-right: 15px;
`
