import { Keyboard } from "react-native"
import { useEffect, useState } from "react"
import { atom, useRecoilState } from "recoil"

const keyboardOpenAtom = atom({
	key: "keyboardOpen",
	default: false,
})

export function useKeyboardOpen() {
	const [isKeyboardVisible, setKeyboardVisible] =
		useRecoilState(keyboardOpenAtom)

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true) // or some other action
			}
		)
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false) // or some other action
			}
		)

		return () => {
			keyboardDidHideListener.remove()
			keyboardDidShowListener.remove()
		}
	}, [])

	return isKeyboardVisible
}
