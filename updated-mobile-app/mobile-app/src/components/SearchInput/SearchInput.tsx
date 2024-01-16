import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'

type SearchInputProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  useBottomSheet?: boolean
}

export const SearchInput = ({
  value,
  onChangeText,
  placeholder = '',
  useBottomSheet = false
}: SearchInputProps) => {
  return (
    <View style={styles.searchWrapper}>
      {useBottomSheet ? (
        <BottomSheetTextInput
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
        />
      )}
      <FastImage
        source={require('../../../assets/icons/Search.png')}
        style={styles.searchIcon}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center'
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#252525',
    borderRadius: 150,
    paddingVertical: 18,
    paddingHorizontal: 56,
    color: 'white'
  },
  searchIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16
  }
})
