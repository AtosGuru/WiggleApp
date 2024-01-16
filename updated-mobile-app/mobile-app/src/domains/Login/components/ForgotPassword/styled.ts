import { Dimensions, StyleSheet } from 'react-native'

import Colors from "../../../../constants/Colors";

const height = Dimensions.get("screen").height
const width = Dimensions.get("screen").width

const styles = StyleSheet.create({
	 primaryButton: {
    borderRadius: 10,
    overflow: "hidden",
		width: 245,
		marginBottom: 18, 
		alignSelf: 'center'
  },
	buttonGradient: {
    alignItems: "center",
    justifyContent: "center",
		height: 62
  },
  buttonText: {
		color: Colors.black, 
		fontSize: 12, 
		lineHeight: 15
	},
	textInput: { 
		backgroundColor: '#252525', 
		borderRadius: 8, 
		color: 'white', 
		marginBottom: 28, 
		padding: 24, 
		fontSize: 14 
	}
});

export default styles