import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './styled'
import { IObject } from '../../types/utils'

const EntityActionOptions = (props: IObject) => {
    
    return (
        <FlatList
            style={styles.ModalContainer}
            data={props.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
                
                return (
                    <View style={styles.btnView}>
                        <TouchableOpacity onPress={item?.onPress} style={styles.button}>
                            <Text style={[item?.text=='Delete'?styles.deleteText:styles.EditText]}>{item?.text}</Text>
                          
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}

export default EntityActionOptions