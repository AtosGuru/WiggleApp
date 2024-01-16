import { Dimensions, ImageProps, LayoutAnimation, TouchableOpacity, View } from "react-native"
import { Flex, StylableView } from "../utils/styled"
import { Link, useNavigation, useRouter } from "expo-router"

import FastImage from "react-native-fast-image"
import { Render } from "../utils/Render"
import { Text } from "../Text"
import styled from "styled-components/native"

const { width, height } = Dimensions.get("window")

interface NotificationsPopupProps {
	title: string
	subtitle: string
	imageSource?: ImageProps["source"]
	unread?: boolean
	isNotification: boolean
	setIsNotification: Function
	buttons: {
		text: string
		onPress: () => void
	}[]
}

export const NotificationsPopup = ({
	unread,
	buttons,
	imageSource,
	title,
	subtitle,
	isNotification,
	setIsNotification
}: NotificationsPopupProps) => {


	const { push } = useRouter()

	LayoutAnimation.linear()

	return (
		<TouchableOpacity style={{ position: 'absolute', width, height, backgroundColor: 'rgba(13, 13, 13, 0.8)', zIndex: isNotification ? 1 : 0, paddingHorizontal: 15 }} onPress={() => setIsNotification(false)}>
			<View style={{ position: 'absolute', top: isNotification ? 60 : -200, backgroundColor: 'rgba(0, 0, 0, 1)', width: '100%', left: 15, flexDirection: 'row', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255, 123, 2, 0.25)' }}>
				<FastImage source={require('../../assets/images/smallLogo.png')} style={{ width: 40, height: 40, marginRight: 15 }} />
				<View style={{ flex: 1 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, marginBottom: 12 }}>
						<Text.Gradient font="Euclid-Bold">Your friend in the club!</Text.Gradient>
						<Text color='rgba(176, 176, 176, 1)' font="Euclid-Bold">Now</Text>
					</View>

					<Text color='white' mb={4}>Hello! Your friend <Text color='white' font="Euclid-Bold">(@girl_02)</Text> goes to the Neverland Club, too!</Text>
				</View>

			</View>

		</TouchableOpacity>
	)
}
