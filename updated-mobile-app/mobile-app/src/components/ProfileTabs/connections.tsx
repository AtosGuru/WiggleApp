import React, { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { ConnectionType, QueryKey } from '../../../types/enum'
import { getConnections } from '../../api/connections.methods'
import { searchUsers } from '../../api/user.methods'
import { User } from '../../../types/user.interface'
import { useRouter } from 'expo-router'
import { Text } from '../index'
import { ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import { TextInput } from '../TextInput'
import { Render } from '../utils/Render'
import { Flex } from '../utils/styled'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../state/user.atom'
import { convertImgToLink } from '../../helpers/convertImgToLink'

export function Connections() {
  const [searchInputValue, setSearchInputValue] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')
  const user = useRecoilValue(userAtom)

  const {
    data: connections,
    refetch,
    isRefetching
  } = useQuery(
    [QueryKey.connections, ConnectionType.CONNECTED, user?.id],
    getConnections
  )
  const { data: searchResult, isLoading } = useQuery(
    [QueryKey.userSearch, searchValue],
    searchUsers
  )

  const isSearch = !!(searchInputValue || searchValue)

  const [usersToDisplay, setUsersToDisplay] = React.useState<User[]>([])

  useEffect(() => {
    if (searchInputValue) {
      setUsersToDisplay(searchResult?.customers || [])
    } else if (connections) {
      setUsersToDisplay(connections.connections.map(({ partner }) => partner))
    } else {
      setUsersToDisplay([])
    }
  }, [searchResult, connections])

  const router = useRouter()

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearchDebounce = (query: string) => {
    setSearchInputValue(query)
    timeoutRef.current && clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setSearchValue(query)
    }, 500)
  }

  const renderUsers = () => {
    return usersToDisplay.map(({ profile, id }, i) => {
      const displayName = profile?.username
        ? `@${profile?.username}`
        : `${profile?.firstName} ${profile?.lastName}`

      const avatar = profile?.photos?.[0]
        ? { uri: convertImgToLink(profile?.photos?.[0]) }
        : require('../../assets/images/mockAvatar.jpg')

      return (
        <FriendsItem
          key={i}
          onPress={() => {
            router.push(`app/profile/${id}`)
          }}>
          <StyledAvatar source={avatar} />
          <Text color={'white'}>{displayName}</Text>
        </FriendsItem>
      )
    })
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 300 }}
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
      }>
      <SearchContainer>
        <TextInput
          name="search"
          placeholder={'Search'}
          value={searchInputValue}
          onChangeText={handleSearchDebounce}
          right={isLoading ? <ActivityIndicator color={'white'} /> : null}
        />
      </SearchContainer>
      <WrapRow>
        <Render if={isSearch && usersToDisplay.length <= 0 && !isLoading}>
          <Flex alignCenter justifyCenter>
            <Text color={'white'}>No users found</Text>
          </Flex>
        </Render>
        <Render if={!isSearch && usersToDisplay.length <= 0}>
          <Flex alignCenter justifyCenter>
            <Text color={'white'}>Friend list is empty</Text>
          </Flex>
        </Render>
        {renderUsers()}
      </WrapRow>
    </ScrollView>
  )
}

const StyledAvatar = styled(FastImage)`
  width: 75px;
  height: 75px;
  border-radius: 75px;
  margin-bottom: 10px;
`

const FriendsItem = styled.TouchableOpacity`
  width: 33%;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const WrapRow = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
`

const SearchContainer = styled.View`
  padding: 15px;
  padding-bottom: 0;
`
