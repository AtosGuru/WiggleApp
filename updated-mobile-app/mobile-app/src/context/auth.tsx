import { useRouter, useSegments } from "expo-router"
import React from "react"
import { Nullable } from "../types/utils"
import { csrfTokenAtom } from "../state"
import { useRecoilState } from "recoil"
import axios, { AxiosInstance, AxiosRequestHeaders } from "axios"
import Constants from "expo-constants"

const AuthContext = React.createContext<{
	signIn: any
	signOut: any
	user: any
} | null>(null)

export const AxiosContext = React.createContext<AxiosInstance | null>(null)

// This hook can be used to access the user info.
export function useAuth() {
	return React.useContext(AuthContext)
}

// This hook will protect the route access based on user authentication.

export function Provider(props: { children: React.ReactNode }) {
	const [csrfToken, setCsrfToken] = useRecoilState(csrfTokenAtom)

	const [user, setAuth] = React.useState<any>(null)

	return (
		<AuthContext.Provider
			value={{
				signIn: () => setAuth({}),
				signOut: () => setAuth(null),
				user,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}
