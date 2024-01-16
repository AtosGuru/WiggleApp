import React, { useEffect } from "react"
import { ScreenWrapper } from "../../../components/ScreenWrapper"
import { TextInput } from "../../../components/TextInput"
import { useForm } from "react-hook-form"
import { Button, Text } from "../../../components"
import Logo from "../../../assets/images/Logo.svg"
import { StyledScreenWrapper } from "./styled"
import { Flex } from "../../../components/utils/styled"
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
import { Link } from "expo-router"
import Colors from "../../../constants/Colors"
import { useMutation } from "react-query"
import { login } from "../../../api"
import { useSetRecoilState } from "recoil"
import {
	isRegistrationFinishedSelector,
	userAtom,
} from "../../../state/user.atom"
import { useKeyboardOpen } from "../../../hooks/useKeyboardOpen"
import { Render } from "../../../components/utils/Render"
import { emailRegex, phoneRegex } from "../../../constants/regex"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Login() {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm()
	const { mutate, isSuccess, isLoading, data } = useMutation(login)
	const setUser = useSetRecoilState(userAtom)

	useEffect(() => {
		if (isSuccess && data?.user) {
			setUser(data.user)
		}
	}, [isSuccess])

	const keyboardOpen = useKeyboardOpen()

	const { top, bottom } = useSafeAreaInsets()
	const { height } = useWindowDimensions()

	return (
		<ImageBackground
			style={{ flex: 1, backgroundColor: Colors.black }}
			imageStyle={{ opacity: 0.1 }}
			source={require("../../../assets/images/loginBackground.png")}
		>
			<StatusBar barStyle={'light-content'} />
			<StyledScreenWrapper>
				<ScrollView
					style={{ width: "100%", height: "100%" }}
					contentContainerStyle={{
						height: height - top - bottom - 30,
						alignItems: "center",
						padding: 15,
					}}
				>
					<Flex mt={10} mb={40}>
						<Logo height={100} />
					</Flex>
					<Text
						color={"white"}
						font={"Euclid-Medium"}
						size={22}
						lineHeight={30}
						mb={30}
					>
						LOG IN
					</Text>
					<TextInput
						name="login"
						control={control}
						placeholder={"Email or Phone"}
						autoCapitalize={"none"}
						rules={{
							required: true,
							validate: value => {
								return (
									emailRegex.test(value) ||
									phoneRegex.test(value) ||
									"Invalid email or phone"
								)
							},
						}}
					/>
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
					<Button.Gradient
						onPress={handleSubmit(mutate)}
						loading={isLoading}
						valid={isValid}
					>
						Continue
					</Button.Gradient>
					<Flex>
						<Link href={"/auth/passwordRecovery"}>
							<Text color={"white"} size={15}>
								Forgot Password?
							</Text>
						</Link>
					</Flex>
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
