import { Stack } from "expo-router"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AuthLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="welcome/index"
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="login/index" options={{ headerShown: false }} />
			<Stack.Screen
				name="signUp/index"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="passwordRecovery/index"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="informationForm/index"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="photoUpload/index"
				options={{ headerShown: false }}
			/>
		</Stack>
	)
}
