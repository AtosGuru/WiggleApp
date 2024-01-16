import React, { FunctionComponent } from "react"
import Colors from "../../constants/Colors"
import FastImage from "react-native-fast-image"
import MaskedView from "@react-native-masked-view/masked-view"
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native"
import Carousel from "react-native-reanimated-carousel"
import { userAtom } from "../../state/user.atom"
import Mask from "../../assets/images/ProfileMask.svg"
import { IconButton } from "../Button/Icon"
import { Entypo } from "@expo/vector-icons"
import styled from "styled-components/native"
import { LinearGradient } from "expo-linear-gradient"
import { useRoute } from "@react-navigation/native"
import { useNavigation, useRouter } from "expo-router"
import { Render } from "../utils/Render"
import { User } from "../../../types/user.interface"

// Mask Height / Mask Width
const maskHeightProportion = 303 / 375

export const ProfilePhotoCarousel: FunctionComponent<{
	user?: User
}> = ({ user }) => {
	const { width } = useWindowDimensions()
	const [index, setIndex] = React.useState(0)
	const carouselHeight = width * maskHeightProportion

	const { canGoBack, goBack } = useNavigation()

	if (!user) return <></>

	const photos = user?.profile?.photos || []

	return (
		<Container>
			<MaskedView
				maskElement={<Mask width={width} height={carouselHeight} />}
				style={{ position: "relative" }}
			>
				<Carousel
					enabled={photos.length > 1}
					width={width}
					loop={false}
					height={carouselHeight}
					style={{
						backgroundColor: Colors.black,
					}}
					data={photos}
					onSnapToItem={index => setIndex(index)}
					renderItem={({ index, item }) => (
						<FastImage
							style={{ height: carouselHeight }}
							resizeMode={FastImage.resizeMode.cover}
							source={{ uri: item }}
						/>
					)}
				/>
			</MaskedView>
			<Render if={canGoBack()}>
				<StyledBackButton onPress={goBack}>
					<Entypo name="chevron-small-left" size={28} color="white" />
				</StyledBackButton>
			</Render>
			<StyledShareButton>
				<Entypo name="share-alternative" size={15} color="white" />
			</StyledShareButton>
			<StyledDotsContainer>
				{photos.length > 1 &&
					photos.map((_, i) => <StyledDot active={index === i} />)}
			</StyledDotsContainer>
			{photos[0] && (
				<StyledSmallAvatarContainer>
					<StyledMainAvatarBg
						colors={["#FFCB52", "#FF7B02"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
					/>
					<StyledMainAvatar source={{ uri: photos[0] }} />
					<StyledOnlineIndicator active={true} />
				</StyledSmallAvatarContainer>
			)}
		</Container>
	)
}

const Container = styled.View`
	padding-bottom: 20px;
`

const StyledIconButton = styled(Pressable)`
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 50px;
	width: 30px;
	height: 30px;
	align-items: center;
	justify-content: center;
	position: absolute;
`

const StyledBackButton = styled(StyledIconButton)`
	top: 15px;
	left: 15px;
`

const StyledShareButton = styled(StyledIconButton)`
	top: 15px;
	right: 15px;
`

const StyledDotsContainer = styled(View)`
	flex-direction: row;

	justify-content: center;
	position: absolute;
	bottom: 55px;
	width: 100%;
	left: 0;
`

const StyledDot = styled.View<{ active: boolean }>`
	width: 20px;
	height: 4px;
	border-radius: 2px;
	background-color: ${({ active }) =>
		active ? Colors.black : "rgba(0,0,0,0.3)"};
	margin: 0 2.5px;
`

const StyledMainAvatar = styled(FastImage)`
	width: 70px;
	height: 70px;
	border-radius: 70px;
	position: absolute;
	bottom: 0;
	left: 15px;
	z-index: 2;
`

const StyledMainAvatarBg = styled(LinearGradient)`
	width: 70px;
	height: 70px;
	border-radius: 70px;
	position: absolute;
	bottom: -1.5px;
	left: 13.5px;
	z-index: 1;
`

const StyledSmallAvatarContainer = styled.View`
	position: absolute;
	bottom: 0;
`

const StyledOnlineIndicator = styled.View<{ active: boolean }>`
	width: 16px;
	height: 16px;
	border-radius: 16px;
	border-color: ${Colors.white};
	border-width: 1px;
	position: absolute;
	bottom: 2px;
	left: 68px;
	z-index: 2;
	${({ active }) =>
		active
			? `background-color: ${Colors.green}`
			: `background-color: ${Colors.black}`}
`
