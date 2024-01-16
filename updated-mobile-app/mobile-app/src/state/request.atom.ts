import { atom } from "recoil"

export const csrfTokenAtom = atom({
	key: "csrfToken",
	default: "",
})
