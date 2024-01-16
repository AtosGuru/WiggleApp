// import * as Sentry from "sentry-expo"

import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import React, { useEffect, useState } from "react"
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil"
import { SafeAreaView, useColorScheme, StatusBar } from "react-native"
import { Slot, SplashScreen, Stack, useRouter } from "expo-router"
import dynamicLinks, {
	FirebaseDynamicLinksTypes,
} from "@react-native-firebase/dynamic-links"

import { AnimatedSplashscreen } from "../../components/AnimatedSplashscreen/AnimatedSplashscreen"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { NotificationsPopup } from "../../components/NotificationPopup/NotificationsPopup"
import { Provider } from "../../context/auth"
import { QueryKey } from "../../types/enum"
import Toast from "react-native-toast-message"
import { availableFonts } from "../../components/Text/fonts"
import { getUser } from "../../api/user.methods"
import { refreshCsrfToken } from "../../api/auth.methods"
import { useFonts } from "expo-font"
import { useProtectedRoute } from "../../hooks/useProtectedRoute"
import { userAtom } from "../../state/user.atom"

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router"

const queryClient = new QueryClient()

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</QueryClientProvider>
	)
}

function App() {
	const setUser = useSetRecoilState(userAtom)

	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...availableFonts,
		...FontAwesome.font,
	})

	const { isSuccess: csrfFetched, data } = useQuery(
		QueryKey.csrf,
		refreshCsrfToken,
		{
			cacheTime: 5000,
		}
	)

	const { isSuccess: userFetched, data: user } = useQuery(
		QueryKey.user,
		getUser,
		{
			enabled: csrfFetched,
		}
	)

	useEffect(() => {
		if (userFetched && user?.user) {
			setUser(user.user)
		}
	}, [userFetched])

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	const [animationPlayed, setAnimationPlayed] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setAnimationPlayed(true)
		}, 2500)
	})

	const appLoaded = loaded && userFetched

	return (
		<AnimatedSplashscreen loaded={appLoaded}>
			<NavigationRoot />
		</AnimatedSplashscreen>
	)
}

function NavigationRoot() {
	const currentUser = useRecoilValue(userAtom)
	useProtectedRoute(currentUser)

	const { push } = useRouter()
	const [isNotification, setIsNotification] = useState(false)

	const navigateToEvent = (link: string) => {
		const eventId = link.split("https://www.wigglerapp.com/events/")[1]
		if (eventId) {
			push(`app/(events)/details/${eventId}`)
		}
	}

	const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink) => {
		if (
			link.url &&
			link.url.includes("https://www.wigglerapp.com/events/")
		) {
			navigateToEvent(link.url)
		}
	}

	useEffect(() => {
		// foreground
		const unsubscribe = dynamicLinks().onLink(handleDynamicLink)

		// background
		dynamicLinks()
			.getInitialLink()
			.then(link => {
				if (
					link?.url &&
					link?.url.includes("https://www.wigglerapp.com/events/")
				) {
					navigateToEvent(link.url)
				}
			})
		setIsNotification(true)

		return () => unsubscribe()
	}, [])

	return (
		<>
			<NotificationsPopup
				title={""}
				subtitle={""}
				buttons={[]}
				isNotification={isNotification}
				setIsNotification={setIsNotification}
			/>
			<StatusBar barStyle={'light-content'} />
			<Slot />
			<Toast />
		</>
	)
}
