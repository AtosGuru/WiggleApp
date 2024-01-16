import React, { useEffect } from "react"
import { ScreenWrapper } from "../../../../components/ScreenWrapper"
import { TextInput } from "../../../../components/TextInput"
import { useForm } from "react-hook-form"
import { Button, Text } from "../../../../components"
import Logo from "../../../../assets/images/Logo.svg"
import { StyledScreenWrapper } from "./styled"
import { Flex } from "../../../../components/utils/styled"
import {
	ImageBackground,
	Platform,
	ScrollView,
	TouchableOpacity,
	useWindowDimensions,
	StatusBar,
} from "react-native"
import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"
import Colors from "../../../../constants/Colors"
import { useMutation } from "react-query"
import { login, resetPassword, sendRecoveryPin } from "../../../../api"
import { useSetRecoilState } from "recoil"
import { isRegistrationFinishedSelector } from "../../../../state/user.atom"
import Toast from "react-native-toast-message"
import { useKeyboardOpen } from "../../../../hooks/useKeyboardOpen"
import { Render } from "../../../../components/utils/Render"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface Form {
	password: string
	password_confirmation: string
}

export default function PasswordRecovery() {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm()
	const { mutate, isSuccess, isLoading } = useMutation(resetPassword)
	const router = useRouter()

	const { login = "", remember_token = "" } = useLocalSearchParams()

	useEffect(() => {
		if (isSuccess) {
			Toast.show({
				type: "success",
				text1: "Password changed successfully! Now please log in",
				visibilityTime: 4000,
			})
			router.replace("/auth/logIn")
		}
	}, [isSuccess])

	const transformData = (
		form: Form
	): {
		login: string
		password: string
		password_confirmation: string
		remember_token: string
	} => {
		return {
			login: login as string,
			password: form.password,
			password_confirmation: form.password_confirmation,
			remember_token: remember_token as string,
		}
	}

	const keyboardOpen = useKeyboardOpen()

	const { top, bottom } = useSafeAreaInsets()
	const { height } = useWindowDimensions()

	return (
		<ImageBackground
			style={{ flex: 1, backgroundColor: Colors.black }}
			imageStyle={{ opacity: 0.1 }}
			source={require("../../../../assets/images/loginBackground.png")}
		>
			<Stack.Screen options={{ headerShown: false }} />
			<StatusBar barStyle={'light-content'} />
			<StyledScreenWrapper>
				<ScrollView
					style={{ width: "100%", height: "100%" }}
					contentContainerStyle={{
						height: height - top - bottom - 30,
						alignItems: "center",
					}}
				>
					<Flex mt={10}>
						<Logo height={100}></Logo>
					</Flex>
					<Text
						color={"white"}
						font={"Euclid-Medium"}
						size={22}
						lineHeight={30}
						mb={30}
					>
						CHANGE PASSWORD
					</Text>
					<Text color={"white"} size={18} lineHeight={30} mb={30}>
						Create new password
					</Text>
					<TextInput
						name="password"
						control={control}
						placeholder={"Password"}
						secureTextEntry
						rules={{
							required: true,
							minLength: 8,
						}}
					/>
					<TextInput
						name="password_confirmation"
						control={control}
						placeholder={"Password Confirmation"}
						secureTextEntry
						rules={{
							required: true,
							minLength: 8,
						}}
					/>
					<Button.Gradient
						onPress={handleSubmit(form =>
							mutate(transformData(form as Form))
						)}
						loading={isLoading}
						valid={isValid}
					>
						Continue
					</Button.Gradient>
					<Flex justifyEnd bottom={10}>
						<Link href={"auth/signUp"} replace>
							<Flex alignEnd row>
								<Text color={"white"} mr={3}>
									Don't have an account?
								</Text>
								<Text.Gradient>Sign Up</Text.Gradient>
							</Flex>
						</Link>
					</Flex>
				</ScrollView>
			</StyledScreenWrapper>
		</ImageBackground>
	)
}
