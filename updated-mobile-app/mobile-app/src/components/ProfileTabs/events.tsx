import EventCard from "../EventCard"
import React from "react"
import styled from "styled-components/native"
import { ScrollView } from "react-native"

export function Events() {
	return (
		<StyledEventsScreenWrapper>
			<StyledScrollView>
				{Array(10)
					.fill(null)
					.map((el, i) => (
						<EventCard />
					))}
			</StyledScrollView>
		</StyledEventsScreenWrapper>
	)
}

const StyledEventsScreenWrapper = styled.View`
	padding: 15px 0;
`

const StyledScrollView = styled(ScrollView)`
	padding: 0 15px;
`
