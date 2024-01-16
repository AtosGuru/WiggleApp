export const availableFonts = {
	"Euclid-SemiBold": require("../../assets/fonts/Euclid-SemiBold.ttf"),
	"Euclid-Regular": require("../../assets/fonts/Euclid-Regular.ttf"),
	"Euclid-Medium": require("../../assets/fonts/Euclid-Medium.ttf"),
	"Euclid-Light": require("../../assets/fonts/Euclid-Light.ttf"),
	"Euclid-Bold": require("../../assets/fonts/Euclid-Bold.ttf"),
	"Klavika-Bold": require("../../assets/fonts/Klavika-Bold.otf"),
	"Klavika-Light": require("../../assets/fonts/Klavika-Light.otf"),
	"Klavika-Medium": require("../../assets/fonts/Klavika-Medium.otf"),
}

export type fontName = keyof typeof availableFonts
