import {
	PhotoUploadTileContainer,
	StylablePhotoUploadTileContainer,
} from "./styled"
import { StylableProps } from "../utils/styled"
import { Text } from "../Text"
import { Feather } from "@expo/vector-icons"
import {
	ActivityIndicator,
	PressableProps,
	useWindowDimensions,
} from "react-native"
import { Photo } from "../../../hooks/usePhotoUploader"
import FastImage from "react-native-fast-image"
import { RADIUS_BASE } from "../../constants/Style"
import { Button } from "../Button"
import React from "react"
import Delete from "../../assets/icons/Delete.svg"
import colors from "../../constants/Colors"
import { AntDesign } from "@expo/vector-icons"
import { Render } from "../utils/Render"

interface PhotoUploadTileProps {
	photo?: Photo
	isMain?: boolean
	onDelete?: () => void
}
export function PhotoUploadTile(
	props: PhotoUploadTileProps & StylableProps & PressableProps
) {
	const { width } = useWindowDimensions()

	if (props.photo) {
		return (
			<StylablePhotoUploadTileContainer
				{...props}
				style={{ width: (width - 60) / 3, height: (width - 60) / 3 }}
			>
				<FastImage
					resizeMode={FastImage.resizeMode.cover}
					source={{ uri: props.photo.uri }}
					style={{
						height: "100%",
						width: "100%",
						borderRadius: RADIUS_BASE,
					}}
				/>
				<Render if={props.isMain}>
					<AntDesign
						name="staro"
						size={24}
						color="white"
						style={{ position: "absolute", top: 5, left: 5 }}
					/>
				</Render>
				<Button.Icon
					onPress={() =>
						!props.photo?.isUploading && props?.onDelete
							? props.onDelete()
							: null
					}
					style={{
						position: "absolute",
						backgroundColor: colors.black,
						top: 5,
						right: 5,
						borderRadius: RADIUS_BASE,
					}}
				>
					<Render if={props.photo.isUploading} else={<Delete />}>
						<ActivityIndicator />
					</Render>
				</Button.Icon>
			</StylablePhotoUploadTileContainer>
		)
	}

	return (
		<StylablePhotoUploadTileContainer
			{...props}
			style={{ width: (width - 60) / 3, height: (width - 60) / 3 }}
		>
			<Text color={"#B0B0B0"} size={14} mb={5} font={"Euclid-Light"}>
				<Render if={props.isMain}>Main Photo</Render>
				<Render if={!props.isMain}>Photo</Render>
			</Text>
			<Feather name="camera" size={24} color="#B0B0B0" />
		</StylablePhotoUploadTileContainer>
	)
}
