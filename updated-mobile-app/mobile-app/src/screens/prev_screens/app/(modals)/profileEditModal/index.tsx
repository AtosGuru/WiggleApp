import { ScreenWrapper } from "../../../../../components/ScreenWrapper"
import React, { FunctionComponent, useEffect, useState } from "react"
import { Button, Text } from "../../../../../components"
import { useForm } from "react-hook-form"
import { TextInput } from "../../../../../components/TextInput"
import Colors from "../../../../../constants/Colors"
import { Stack, useRouter } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Flex } from "../../../../../components/utils/styled"
import { updateUserProfile } from "../../../../../api/user.methods"
import { useMutation } from "react-query"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { userAtom } from "../../../../../state/user.atom"
import {
	Platform,
	Pressable,
	ScrollView,
	useWindowDimensions,
	View,
	StatusBar,
} from "react-native"
import { User } from "../../../../../types/user.interface"
import Toast from "react-native-toast-message"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import colors from "../../../../../constants/Colors"
import styled from "styled-components/native"
import { PhotoUpload } from "../../../../../components/PhotoUpload"
import { Checkbox } from "../../../../../components/Checkbox"

const InformationTab = () => {
	const { mutate, isLoading, isSuccess, data } =
		useMutation(updateUserProfile)
	const [user, setUser] = useRecoilState(userAtom)
	const { height, width } = useWindowDimensions()
	const { back } = useRouter()

	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm({
		defaultValues: {
			firstName: user?.profile.firstName ?? "",
			lastName: user?.profile.lastName ?? "",
			username: user?.profile.username ?? "",
		},
	})

	useEffect(() => {
		if (isSuccess && data?.profile) {
			setUser(
				val =>
					({
						...val,
						profile: data.profile,
						isRegistrationFinished: true,
					} as User)
			)
			Toast.show({
				type: "success",
				text1: "Profile updated successfully",
			})
		}
	}, [isSuccess])

	return (
		<Flex p={20}>
			<ScrollView>
				<StatusBar barStyle={'light-content'} />
				<TextInput
					control={control}
					name={"firstName"}
					defaultValue={user?.profile?.firstName}
					placeholder={"First Name"}
					label={"First Name"}
					rules={{ required: true, maxLength: 30 }}
				/>
				<TextInput
					control={control}
					name={"lastName"}
					defaultValue={user?.profile?.lastName}
					placeholder={"Last Name"}
					label={"Last Name"}
					rules={{ required: true, maxLength: 30 }}
				/>
				<TextInput
					control={control}
					name={"username"}
					defaultValue={user?.profile?.username}
					placeholder={"Username"}
					label={"Username"}
					rules={{ maxLength: 30 }}
				/>
				<TextInput
					control={control}
					name={"description"}
					defaultValue={user?.profile?.description}
					placeholder={"Bio"}
					label={"Bio"}
					rules={{ maxLength: 120 }}
				/>
				<Flex f={null} row spaceBetween style={{ width: "100%" }}>
					<Checkbox
						control={control}
						name={"gender"}
						value={"male"}
						style={{ width: width / 3 - 20 }}
					>
						Male
					</Checkbox>
					<Checkbox
						control={control}
						name={"gender"}
						value={"female"}
						style={{ width: width / 3 - 20 }}
					>
						Female
					</Checkbox>
					<Checkbox
						control={control}
						name={"gender"}
						value={"other"}
						style={{ width: width / 3 - 20 }}
					>
						Other
					</Checkbox>
				</Flex>
			</ScrollView>
			<Flex f={1} justifyEnd style={{ minHeight: 90 }}>
				<Button.Gradient
					onPress={handleSubmit(mutate)}
					loading={isLoading}
					valid={isValid}
				>
					<Text>Save</Text>
				</Button.Gradient>
			</Flex>
		</Flex>
	)
}

const renderScene = SceneMap({
	photo: PhotoUpload,
	information: InformationTab,
})

const routes = [
	{ key: "photo", title: "Photo" },
	{ key: "information", title: "Information" },
]

const ProfileEditModal = () => {
	const { width } = useWindowDimensions()
	const [index, setIndex] = useState(0)
	const IndicatorWidth = (width - 50) / routes.length
	const { back } = useRouter()

	return (
		<StyledScreenWrapper>
			<Flex
				f={false}
				row
				spaceBetween
				alignCenter
				py={Platform.select({ ios: 0, android: 20 })}
				px={20}
				style={{
					paddingHorizontal: 20,
				}}
			>
				<Text color={Colors.white} font={"Euclid-Medium"} size={24}>
					Edit Profile
				</Text>
				<Pressable onPress={back}>
					<MaterialCommunityIcons
						name="window-close"
						size={24}
						color={Colors.white}
					/>
				</Pressable>
			</Flex>
			<TabView
				tabBarPosition={"bottom"}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: width }}
				style={{
					backgroundColor: Colors.black2,
				}}
				renderTabBar={props => (
					<TabBar
						{...props}
						renderLabel={({ route, focused, color }) => (
							<Text
								style={{
									color,
									minWidth: 100,
									textAlign: "center",
								}}
								font={focused ? "Euclid-Bold" : "Euclid-Light"}
							>
								{route.title}
							</Text>
						)}
						style={{
							backgroundColor: Colors.black2,
							height: 35,
							marginBottom: 25,
							marginHorizontal: 25,
							borderBottomWidth: 1,
							borderBottomColor: colors.white1,
						}}
						indicatorStyle={{
							backgroundColor: "white",
							height: 1,
							position: "absolute",
							bottom: -1,
							width: IndicatorWidth,
							marginLeft:
								((width - 50) / routes.length -
									IndicatorWidth) /
								2,
						}}
						tabStyle={{
							paddingTop: 0,
						}}
					/>
				)}
			/>
		</StyledScreenWrapper>
	)
}

const StyledScreenWrapper = styled(ScreenWrapper)`
	padding: 0;
`
export default ProfileEditModal
