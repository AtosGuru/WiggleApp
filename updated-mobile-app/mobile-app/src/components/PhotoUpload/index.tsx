import React, { FunctionComponent, useEffect } from "react"
import { Text } from "../Text"
import { Flex } from "../utils/styled"
import { PhotoUploadTile } from "../PhotoUploadTile"
import { usePhotoUploader } from "../../../hooks/usePhotoUploader"
import { useMutation } from "react-query"
import { updateUserProfile } from "../../api/user.methods"
import { useRecoilState, useSetRecoilState } from "recoil"
import { isRegistrationFinishedSelector, userAtom } from "../../state/user.atom"
import Toast from "react-native-toast-message"
import { User } from "../../../types/user.interface"
import FastImage from "react-native-fast-image"
import styled from "styled-components/native"
import { View } from "react-native"

export const PhotoUpload: FunctionComponent = () => {
	const [user, setUser] = useRecoilState(userAtom)

	const { handlePhotoSelect, handlePhotoDelete, photos } = usePhotoUploader({
		limit: 6,
		defaultPhotos: user?.profile?.photos || [],
	})

	const { mutate, isLoading, isSuccess, data } =
		useMutation(updateUserProfile)

	useEffect(() => {
		if (!photos.find(el => el.isUploading) && photos.length > 0) {
			mutate({
				photos: photos.map(el => el.uri),
			})
		}
	}, [photos])

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
		<Flex p={20} justifyCenter={"center"}>
			<Text color={"white"} font={"Euclid-Medium"} size={14} mb={15}>
				Avatar photo
			</Text>
			<View style={{ alignItems: "center" }}>
				<StyledMainAvatar
					source={{
						uri: photos[0]?.uri,
					}}
				/>
			</View>
			<Text
				color={"white"}
				font={"Euclid-Medium"}
				size={14}
				lineHeight={14}
				mb={20}
			>
				Profile Photo
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
					mr={10}
					onPress={handlePhotoSelect}
					onDelete={handlePhotoDelete(photos[1]?.id)}
					photo={photos[1] || null}
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
					mr={10}
					onPress={handlePhotoSelect}
					onDelete={handlePhotoDelete(photos[3]?.id)}
					photo={photos[4] || null}
				/>
				<PhotoUploadTile
					onPress={handlePhotoSelect}
					onDelete={handlePhotoDelete(photos[3]?.id)}
					photo={photos[5] || null}
				/>
			</Flex>
		</Flex>
	)
}

const StyledMainAvatar = styled(FastImage)`
	width: 165px;
	height: 165px;
	border-radius: 165px;
	margin-top: 10px;
	margin-bottom: 20px;
`
