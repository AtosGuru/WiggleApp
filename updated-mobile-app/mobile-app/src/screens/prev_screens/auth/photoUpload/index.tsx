import React, { useEffect } from "react"
import { ScreenWrapper } from "../../../components/ScreenWrapper"
import { TextInput } from "../../../components/TextInput"
import { useForm } from "react-hook-form"
import { Button, Text } from "../../../components"
import Logo from "../../../assets/images/Logo.svg"
import { StyledScreenWrapper } from "./styled"
import { Flex } from "../../../components/utils/styled"
import { ImageBackground, TouchableOpacity, View, StatusBar } from "react-native"
import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { Link, useRouter } from "expo-router"
import Colors from "../../../constants/Colors"
import { Checkbox } from "../../../components/Checkbox"
import { PhotoUploadTile } from "../../../components/PhotoUploadTile"
import { usePhotoUploader } from "../../../hooks/usePhotoUploader"
import { useMutation } from "react-query"
import { updateUserProfile } from "../../../api/user.methods"
import { useSetRecoilState } from "recoil"
import {
	isRegistrationFinishedSelector,
	userAtom,
} from "../../../state/user.atom"
import Toast from "react-native-toast-message"
import { User } from "../../../types/user.interface"

export default function PhotoUpload() {
	const { handlePhotoSelect, handlePhotoDelete, photos } = usePhotoUploader({
		limit: 6,
	})
	const { mutate, isLoading, isSuccess, data } =
		useMutation(updateUserProfile)
	const setUser = useSetRecoilState(userAtom)
	const setFinishedRegistration = useSetRecoilState(
		isRegistrationFinishedSelector
	)

	const handleContinue = () => {
		if (photos.find(el => el.isUploading)) {
			return Toast.show({
				type: "error",
				text1: "Wait for all photos to upload",
			})
		}

		mutate({
			photos: photos.map(el => el.uri),
		})
	}

	useEffect(() => {
		if (isSuccess && data?.profile) {
			setUser(
				val =>
					({
						...val,
						profile: data.profile,
					} as User)
			)
		}
	}, [isSuccess])

	return (
		<ImageBackground
			style={{ flex: 1, backgroundColor: Colors.black }}
			imageStyle={{ opacity: 0.3 }}
			source={require("../../../assets/images/loginBackground.png")}
		>
			<StyledScreenWrapper>
				<StatusBar barStyle={'light-content'} />
				<Flex mt={0}>
					<Logo height={100}></Logo>
				</Flex>

				<Flex f={5} center>
					<Text
						color={"white"}
						font={"Euclid-Medium"}
						size={22}
						lineHeight={36}
						mb={15}
					>
						Profile Photo
					</Text>
					<Text
						color={"white"}
						font={"Euclid-Medium"}
						size={14}
						lineHeight={14}
						mb={20}
					>
						Upload some photos so other users can find you
					</Text>
					<Flex f={null} row bottom={10}>
						<PhotoUploadTile
							mr={10}
							onPress={handlePhotoSelect}
							onDelete={handlePhotoDelete(photos[0]?.id)}
							photo={photos[0] || null}
							isMain={true}
						/>
						<PhotoUploadTile
							onPress={handlePhotoSelect}
							onDelete={handlePhotoDelete(photos[1]?.id)}
							photo={photos[1] || null}
							mr={10}
						/>
						<PhotoUploadTile
							onPress={handlePhotoSelect}
							onDelete={handlePhotoDelete(photos[1]?.id)}
							photo={photos[2] || null}
						/>
					</Flex>
					<Flex f={null} row>
						<PhotoUploadTile
							mr={10}
							onPress={handlePhotoSelect}
							onDelete={handlePhotoDelete(photos[2]?.id)}
							photo={photos[3] || null}
						/>
						<PhotoUploadTile
							onPress={handlePhotoSelect}
							onDelete={handlePhotoDelete(photos[3]?.id)}
							photo={photos[4] || null}
							mr={10}
						/>
						<PhotoUploadTile
							onPress={handlePhotoSelect}
							onDelete={handlePhotoDelete(photos[3]?.id)}
							photo={photos[5] || null}
						/>
					</Flex>
				</Flex>
				<Button.Gradient
					style={{ marginTop: 20 }}
					loading={isLoading}
					onPress={handleContinue}
				>
					Continue
				</Button.Gradient>
			</StyledScreenWrapper>
		</ImageBackground>
	)
}
