import { ProfilePhotoCarousel } from "../../../../../components/ProfilePhotoCarousel"
import React from "react"
import { useSearchParams } from "expo-router"
import styled from "styled-components/native"
import Colors from "../../../../../constants/Colors"
import { SafeAreaView, ScrollView, StatusBar } from "react-native"
import { ProfileDetails } from "../../../../../components/ProfileDetails"
import { useQuery } from "react-query"
import { QueryKey } from "../../../../../types/enum"
import { getUserById } from "../../../../../api/user.methods"

function Profile() {
	const { userId } = useSearchParams()
	const { data: user } = useQuery([QueryKey.userById, userId], getUserById)
	if (!user) return <StyledScreenWrapper />

	return (
		<StyledScreenWrapper>
			<StatusBar barStyle={'light-content'} />
			<ProfilePhotoCarousel user={user} />
			<ScrollView
				style={{
					height: "100%",
					padding: 15,
				}}
			>
				<ProfileDetails user={user} />
			</ScrollView>
		</StyledScreenWrapper>
	)
}

const StyledScreenWrapper = styled(SafeAreaView)`
	padding: 0;
	flex: 1;
	background-color: ${Colors.black2};
`

export default Profile
