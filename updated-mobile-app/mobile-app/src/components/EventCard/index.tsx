import { TouchableOpacity } from "react-native"

import { BlurView } from "expo-blur"
import Colors from "../../constants/Colors"
import { Text } from "../Text"
import styled from "styled-components/native"
import { Event } from "../../../types/event.interface"
import { useRouter } from "expo-router"
import { getImageURL } from "../../constants/utils"

const EventCard = ({ item }: { item?: Event }) => {
  const { push } = useRouter()

  return (
    <TouchableOpacity style={{ flex: 1, marginHorizontal: -15 }} onPress={() => {
      if (item?.id) {
        push(`app/(events)/details/${item?.id}`)
      }
    }}>
      <Container
        source={{ uri: getImageURL(item?.image_id) }}
      >
        <Header>
          <CircleButton>
            <Text color={"white"} font={"Euclid-SemiBold"}>
              18+
            </Text>
          </CircleButton>
        </Header>
        <Footer
          intensity={30}
          tint={"dark"}
        >
          <FooterNameContainer>
            <Text font={"Euclid-SemiBold"} color={"white"} size={15}>
              Neverland Club
            </Text>
          </FooterNameContainer>
          <Text
            color={"white"}
            size={11}
            font={"Euclid-Light"}
            lineHeight={18}
          >
            09 Feb 2023,{"\n"}22:00 - 02:00
          </Text>
        </Footer>

      </Container>
    </TouchableOpacity>
  )
}

const Container = styled.ImageBackground`
	height: 220px;
	margin-bottom: 4px;
	overflow: hidden;
`

const Header = styled.View`
	flex: 1;
	padding: 12px;
	flex-direction: row;
	justify-content: space-between;
`

const Footer = styled(BlurView)`
	padding: 10px 15px;
	flex-direction: row;
	align-items: center;
`

const FooterNameContainer = styled.View`
	border-right-color: rgba(255, 255, 255, 0.2);
	border-right-width: 1px;
	flex: 1;
	margin-right: 15px;
	padding: 15px 0;
`

const CircleButton = styled.View`
	width: 50px;
	height: 50px;
	border-radius: 50px;
	background-color: ${Colors.black};
	justify-content: center;
	align-items: center;
	border: 2px solid #2f2d31;
`

export default EventCard
