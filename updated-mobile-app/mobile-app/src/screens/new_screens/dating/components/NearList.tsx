import React from 'react'
import { useQuery } from "react-query"
import { styles } from "../styled"
import { QueryKey } from "../../../../types/enum"
import { getNears } from "../../../../api/dating.methods"
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native"
import { UserSearchItem } from '../../search'
import { convertImgToLink } from '../../../../helpers/convertImgToLink'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'

function NearList({ openSwipes, openGoldPlan }: { openSwipes: (e: number) => void }) {
    const { data: dating, refetch, isRefetching } = useQuery(QueryKey.nears, getNears)

    const user = useSelector((root: RootState) => root.dating.user)

    const hasGold = user?.user?.premium?.is_premium

    const handleOpenSwipes = (index) => () => {
        if (!hasGold && index > 2) {
            return openGoldPlan()
        }

        return openSwipes(index)
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    tintColor={'#FFCB52'}
                    colors={['#FFCB52']}
                />
            }
            style={styles.listWrap}
        >
            {dating?.datings?.length ? <FlatList
                scrollEnabled={false}
                data={dating?.datings}
                columnWrapperStyle={styles.flatListGap}
                keyExtractor={({ id }) => id.toString()}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <UserSearchItem
                        imageUrl={convertImgToLink(item?.profile.photos?.[0])}
                        name={`${item.profile.name}`}
                        age={`${item.profile.age}`}
                        dots={false}
                        onPress={handleOpenSwipes(index)}
                        withBlur={hasGold ? false : index > 2}
                    />
                )}
            /> : (
                <View style={styles.noMatches}>
                    <Text style={styles.noMatchesTitle}>
                        You need to Pre Check to an event to see users here
                    </Text>
                </View>
            )}
        </ScrollView>
    )
}

export default NearList