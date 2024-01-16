import {
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native"

import Colors from "../../../../../constants/Colors"
import FastImage from "react-native-fast-image"
import { Text } from "../../../../../components"
import styled from "styled-components/native"
import { useState } from "react"

const EventAttendingScreen = () => {
	const [isFirstTab, setIsFirstTab] = useState(true)

	const mockedUsersData1 = [
		{ name: '@mc_girls', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwIw4TUNNyavGpNgbeUnWcXS5ixK5Y9wBLo5gIBKqWRtERGay34gjqE-8MvVXhkPV9JA&usqp=CAU' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1165314750/photo/living-that-urban-life.jpg?s=612x612&w=0&k=20&c=5If9eBsKrj2N0EDx8dvMM6SOEUqNlBTpY-POmwYIt4o=' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1208414307/photo/happy-male-executive-in-office.jpg?s=612x612&w=0&k=20&c=3krD8gIdPmHFVwbcHGyQDXUGlcyzmcWQNyRMRp_93P8=' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1299077582/photo/positivity-puts-you-in-a-position-of-power.jpg?s=170667a&w=0&k=20&c=Ib--rwStdSmJT4GDM8LqIpEyuhD59ROcIlxeEqTNYLM=' },
		{ name: '@mc_girls', image: 'https://st4.depositphotos.com/1036367/31538/i/600/depositphotos_315389058-stock-photo-close-up-portrait-of-happy.jpg' },
		{ name: '@mc_girls', image: 'https://st4.depositphotos.com/5228995/23884/i/600/depositphotos_238842044-stock-photo-sensual-woman-touching-neck.jpg' },
		{ name: '@mc_girls', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwIw4TUNNyavGpNgbeUnWcXS5ixK5Y9wBLo5gIBKqWRtERGay34gjqE-8MvVXhkPV9JA&usqp=CAU' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80' },
	]


	const mockedUsersData2 = [
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1208414307/photo/happy-male-executive-in-office.jpg?s=612x612&w=0&k=20&c=3krD8gIdPmHFVwbcHGyQDXUGlcyzmcWQNyRMRp_93P8=' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1299077582/photo/positivity-puts-you-in-a-position-of-power.jpg?s=170667a&w=0&k=20&c=Ib--rwStdSmJT4GDM8LqIpEyuhD59ROcIlxeEqTNYLM=' },
		{ name: '@mc_girls', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwIw4TUNNyavGpNgbeUnWcXS5ixK5Y9wBLo5gIBKqWRtERGay34gjqE-8MvVXhkPV9JA&usqp=CAU' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1165314750/photo/living-that-urban-life.jpg?s=612x612&w=0&k=20&c=5If9eBsKrj2N0EDx8dvMM6SOEUqNlBTpY-POmwYIt4o=' },
		{ name: '@mc_girls', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1208414307/photo/happy-male-executive-in-office.jpg?s=612x612&w=0&k=20&c=3krD8gIdPmHFVwbcHGyQDXUGlcyzmcWQNyRMRp_93P8=' },
		{ name: '@mc_girls', image: 'https://media.istockphoto.com/id/1299077582/photo/positivity-puts-you-in-a-position-of-power.jpg?s=170667a&w=0&k=20&c=Ib--rwStdSmJT4GDM8LqIpEyuhD59ROcIlxeEqTNYLM=' },
		{ name: '@mc_girls', image: 'https://st4.depositphotos.com/1036367/31538/i/600/depositphotos_315389058-stock-photo-close-up-portrait-of-happy.jpg' },
		{ name: '@mc_girls', image: 'https://st4.depositphotos.com/5228995/23884/i/600/depositphotos_238842044-stock-photo-sensual-woman-touching-neck.jpg' },
	]

	return (
		<View style={{ flex: 1, backgroundColor: "#000" }}>
			<View
				style={{
					flex: 1,
					backgroundColor: Colors.black2,
					marginTop: 12,
				}}
			>

				<View style={{ flexDirection: 'row', paddingTop: 24, alignItems: 'center', marginBottom: 32 }}>
					<TouchableOpacity onPress={() => setIsFirstTab(true)} style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center', borderBottomColor: isFirstTab ? 'white' : 'rgba(255,255,255, 0.1)', borderBottomWidth: 1, marginHorizontal: 6 }}>
						<Text color='white' mb={12} font={isFirstTab ? "Euclid-Bold" : "Euclid-Regular"}>At The Club</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setIsFirstTab(false)} style={{ flex: 1, height: 40, alignItems: 'center', justifyContent: 'center', borderBottomColor: !isFirstTab ? 'white' : 'rgba(255,255,255, 0.1)', borderBottomWidth: 1, marginHorizontal: 6 }}>
						<Text color='white' mb={12} font={!isFirstTab ? "Euclid-Bold" : "Euclid-Regular"}>Pre Checked</Text>
					</TouchableOpacity>
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
						{isFirstTab ? mockedUsersData1?.map((item, index) => (<UserItem {...item} key={index} />)) : mockedUsersData2?.map((item, index) => (<UserItem {...item} key={index} />))}
					</View>
				</ScrollView>
			</View >
		</View >
	)
}

const HeaderItem = styled.View`
	background-color: rgba(0, 0, 0, 0.4);
	height: 40px;
	align-items: center;
	padding: 0px 10px;
	flex-direction: row;
	margin-bottom: 6px;
`

export default EventAttendingScreen


const UserItem = (props: { image: any; name: any }) => {

	const { image, name } = props

	return (
		<View style={{ alignItems: 'center' }}>
			<FastImage
				style={{
					height: 100,
					width: 100,
					borderRadius: 50,
				}}
				resizeMode={FastImage.resizeMode.cover}
				source={{ uri: image }}
			/>
			<Text color='white' mt={8}>{name}</Text>
		</View>
	)
}
