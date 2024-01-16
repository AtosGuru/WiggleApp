import { Control, Controller } from "react-hook-form"
import React, { useEffect, useState } from "react"
import {
	CodeInputContainer,
	CodeInputElementContainer,
	CodeTextInput,
} from "./styled"
import { TextInput } from "react-native"
import Colors from "../../constants/Colors"

interface CodeInputProps {
	length: number
	value: string
	onChange: (value: string) => void
}

export function CodeInput({ onChange, length, value }: CodeInputProps) {
	const inputRefs = Array.from(Array(length || 6), () =>
		React.createRef<TextInput>()
	)

	useEffect(() => {
		if (inputRefs[value.length]) {
			inputRefs[value.length].current?.focus()
		}
	}, [value])

	useEffect(() => {
		onChange && onChange(value)
	}, [value])

	const onBackspace = () => {
		onChange(value.slice(0, -1))
	}

	return (
		<CodeInputContainer>
			{Array(length)
				.fill(0)
				.map((_, index) => {
					const filled = value.length > index
					const focused = value.length === index

					return (
						<CodeInputElementContainer
							style={{
								borderColor: focused
									? "#FF7B02"
									: filled
									? Colors.white
									: Colors.white2,
							}}
						>
							<CodeTextInput
								ref={inputRefs[index]}
								autoFocus={focused}
								key={index}
								keyboardType={"number-pad"}
								value={filled ? value[index] : ""}
								onChangeText={text => {
									onChange(value + text)
								}}
								onKeyPress={({ nativeEvent }) => {
									if (nativeEvent.key === "Backspace") {
										onBackspace()
									}
								}}
							></CodeTextInput>
						</CodeInputElementContainer>
					)
				})}
		</CodeInputContainer>
	)
}
