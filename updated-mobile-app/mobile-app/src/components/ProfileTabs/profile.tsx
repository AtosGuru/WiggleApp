import { useRecoilValue } from "recoil"
import { userAtom } from "../../state/user.atom"
import { ScrollView } from "react-native"
import { ProfileDetails } from "../ProfileDetails"
import React from "react"

export function ProfileTab() {
	const user = useRecoilValue(userAtom)

	return (
		<ScrollView
			style={{
				height: "100%",
				padding: 15,
			}}
		>
			<ProfileDetails user={user} />
		</ScrollView>
	)
}
