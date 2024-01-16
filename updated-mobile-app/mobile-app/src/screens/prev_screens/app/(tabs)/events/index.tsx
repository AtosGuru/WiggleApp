import Colors from "../../../../../constants/Colors"
import EventCard from "../../../../../components/EventCard"
import React from "react"
import { ScreenWrapper } from "../../../../../components/ScreenWrapper"
import { ScrollView } from "react-native"
import { Text } from "../../../../../components"
import { TextInput } from "../../../../../components/TextInput"
import styled from "styled-components/native"
import { useForm } from "react-hook-form"
import { useQuery } from "react-query"
import { QueryKey } from "../../../../../types/enum"
import { getEvents } from "../../../../../api/events.methods"

export default function Events() {
	const { control } = useForm()
	const {data} = useQuery(QueryKey.events, getEvents)

	return (
		<StyledScreenWrapper>
			<SearchContainer>
				<TextInput
					name="search"
					placeholder={"Search"}
					control={control}
				/>
			</SearchContainer>
			<StyledScrollView contentContainerStyle={{ paddingBottom: 120 }}>
			{data?.map((el, i) => (
					<EventCard item={el} key={i} />
				))}
			</StyledScrollView>
		</StyledScreenWrapper>
	)
}

const StyledScreenWrapper = styled.View`
	background-color: ${Colors.black};
	padding: 15px 0;
	flex: 1;
`

const StyledScrollView = styled(ScrollView)`
	padding: 0 15px;
`

const SearchContainer = styled.View`
	padding: 0 15px;
`
