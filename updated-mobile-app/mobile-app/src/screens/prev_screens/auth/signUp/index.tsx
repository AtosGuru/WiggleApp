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
import { Link, useRouter } from "expo-router"
import Colors from "../../../constants/Colors"
import { register } from "../../../api"
import { useMutation } from "react-query"
import { useSetRecoilState } from "recoil"
import { userAtom } from "../../../state/user.atom"
import { useKeyboardOpen } from "../../../hooks/useKeyboardOpen"
import { Render } from "../../../components/utils/Render"
import { emailRegex, phoneRegex } from "../../../constants/regex"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function SignUp() {
	const {
		control,
		handleSubmit,
		getValues,
		formState: { isValid },
	} = useForm()
	const { mutate, isLoading, isSuccess, data } = useMutation(register)
	const router = useRouter()
	const setUser = useSetRecoilState(userAtom)

	useEffect(() => {
		if (isSuccess && data?.status === "success") {
			setUser({ ...data.user, isCodeSent: true })
			router.push({
				pathname: "auth/signUp/codeVerify",
				params: { login: getValues("login") },
			})
		}
	}, [isSuccess, data])

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
					<Flex mt={10} mb={20}>
						<Logo height={100} />
					</Flex>
					<Text
						color={"white"}
						font={"Euclid-Medium"}
						size={22}
						lineHeight={30}
						mb={30}
					>
						SIGN UP
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
						rules={{
							required: true,
							minLength: 8,
						}}
						secureTextEntry
					/>
					<TextInput
						name="password_confirmation"
						control={control}
						placeholder={"Confirm Password"}
						rules={{
							required: true,
							minLength: 8,
						}}
						secureTextEntry
					/>
					<Button.Gradient
						onPress={handleSubmit(mutate)}
						loading={isLoading}
						valid={isValid}
					>
						Continue
					</Button.Gradient>
					<Flex justifyEnd bottom={10}>
						<Link href={"auth/login"} replace>
							<Flex alignEnd row>
								<Text color={"white"} mr={3}>
									Have an account?
								</Text>
								<Text.Gradient>Log In</Text.Gradient>
							</Flex>
						</Link>
					</Flex>
				</ScrollView>
			</StyledScreenWrapper>
		</ImageBackground>
	)
}
