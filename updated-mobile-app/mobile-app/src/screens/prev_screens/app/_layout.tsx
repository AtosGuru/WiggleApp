import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useEffect, useRef } from "react"
import { Stack } from "expo-router"
import { TouchableOpacity } from "react-native"
import BackgroundFetch from "react-native-background-fetch"
import axios from "axios"
import Geolocation, {
	GeolocationResponse,
} from "@react-native-community/geolocation"
import {
	check,
	PERMISSIONS,
	RESULTS,
	checkMultiple,
	requestMultiple,
	request,
} from "react-native-permissions"

import { Button } from "../../../components"
import colors from "../../../constants/Colors"
import { useRouter } from "expo-router"
import { updateUserProfile } from "../../../api/user.methods"
import { Platform } from "react-native"
import { useDispatch } from "react-redux"
import { fetchLocationDataThunk } from "../../../store/thunks/locationInfoThunk"

const logPosition = (pos: GeolocationResponse, message: string = "NO MSG") => {
	console.log('LOG POS SUCCESS', pos);

	axios.post(`https://wiggletest.requestcatcher.com/test`, {
		data: `MSG: ${message}, Log current position, Date: ${new Date(
			Date.now()
		).toLocaleString()}, pos: ${pos.coords.latitude}, ${pos.coords.longitude
			}`,
	})
	updateUserProfile({
		//@ts-ignore
		geolocation: {
			latitude: String(pos.coords.latitude),
			longitude: String(pos.coords.longitude),
		},
	})
}

export const logCurrentPosition = (isBackground?: boolean) => {
	Geolocation.requestAuthorization(
		() => {
			Geolocation.getCurrentPosition(
				pos => {
					logPosition(pos, isBackground ? "BACKGROUND LOCATION" : "")
				},
				err => {
					console.log('getCurrentPosition err', err)
				},
				{
					enableHighAccuracy: true,
					distanceFilter: 50,
				}
			)
		},
		err => {
			console.log("Geolocation.requestAuthorization error")
		}
	)
}

export default function AppLayout() {
	const { position, currentLocation } = useSelector(state => state.location)
	const { push } = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchLocationDataThunk({
			...position
		}))
	},[])

	const NotificationButton = () => {
		const handleOpen = () => push("app/notifications")

		return (
			<TouchableOpacity style={{ paddingRight: 20 }} onPress={handleOpen}>
				<MaterialCommunityIcons
					name="bell-ring-outline"
					size={20}
					color="white"
				/>
			</TouchableOpacity>
		)
	}


	const watchNumber = useRef<number | null>(null)
	const initBackgroundFetch = async () => {
		const status: number = await BackgroundFetch.configure(
			{
				minimumFetchInterval: 15,
				stopOnTerminate: false,
				enableHeadless: true,
				startOnBoot: true,
				// Android options
				requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // Default
			},
			async (taskId: string) => {
				logCurrentPosition(true)
				// Finish.
				BackgroundFetch.finish(taskId)
			},
			async (taskId: string) => {
				// Oh No!  Our task took too long to complete and the OS has signalled
				// that this task must be finished immediately.
				logCurrentPosition(true)
				BackgroundFetch.finish(taskId)
			}
		)
	}

	const watchLocationForeground = async () => {
		if (Platform.OS === 'android') {
			const permissions = await checkMultiple([
				PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
				PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
				PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
			])

			if (!Object.values(permissions).every(item => item === 'granted')) {
				await requestMultiple([
					PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
					PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
					PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
				])
			}
		} else {
			// ios
			const permission = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
			if (permission !== 'granted') {
				await request(PERMISSIONS.IOS.LOCATION_ALWAYS)
			}
		}
		Geolocation.setRNConfiguration({
			authorizationLevel: "always",
			skipPermissionRequests: false,
		})
		Geolocation.requestAuthorization(
			() => {
				// success auth
				watchNumber.current = Geolocation.watchPosition(
					pos => {
						logPosition(pos)
					},
					err => {
						console.log("Location watch", err)
					},
					{
						distanceFilter: 50,
						enableHighAccuracy: true,
					}
				)
			},
			err => {
				console.log("Location error", err)
			}
		)
	}

	useEffect(() => {
		watchLocationForeground()
		initBackgroundFetch()

		return () => {
			if (watchNumber.current !== null) {
				Geolocation.clearWatch(watchNumber.current)
			}
		}
	}, [])

	return (
		<Stack
			screenOptions={({ route, navigation }) => {
				return {
					tabBarShowLabel: false,
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: colors.black,
						borderColor: "transparent",
						elevation: 0,
						shadowOpacity: 0,
					},
					headerTitleStyle: {
						color: colors.white,
						fontFamily: "Euclid-Medium",
					},
					headerLeft: props =>
						props.canGoBack && (
							<Button.Icon onPress={navigation.goBack}>
								<Feather
									name="chevron-left"
									size={24}
									color="white"
								/>
							</Button.Icon>
						),
				}
			}}
		>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen
				name="(stack)/dialog/[userId]"
				options={{
					headerTitle: "mc_black",
					headerRight: () => <NotificationButton />,
				}}
			/>
			<Stack.Screen
				name="(events)/details/[id]"
				options={{ headerTitle: "Event Details" }}
			/>
			<Stack.Screen
				name="(events)/details/[id]"
				options={{ headerTitle: "Event Details" }}
			/>
			<Stack.Screen
				name="(events)/attending/index"
				options={{ headerTitle: "Attending" }}
			/>
			<Stack.Screen
				name="(settings)/blocked-users/index"
				options={{ headerTitle: "Blocked Users" }}
			/>
			<Stack.Screen
				name="(stack)/profile/[userId]"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={"(modals)/profileEditModal/index"}
				options={{
					headerShown: false,
					presentation: "modal",
					animation: "fade_from_bottom",
				}}
			/>
			<Stack.Screen
				name={"(modals)/friends/index"}
				options={{
					headerShown: false,
					presentation: "transparentModal",
					animation: "fade_from_bottom",
				}}
			/>
			<Stack.Screen
				name={"(modals)/notifications/index"}
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
		</Stack>
	)
}
