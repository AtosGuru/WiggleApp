import React, { useEffect, useRef } from "react"
import {
	Pressable,
	StyleProp,
	TextInputProps as RNTextInputProps,
	TextStyle,
	View,
} from "react-native"
import {
	StylableTextInputContainer,
	StyledTextInput,
	StyledTextInputContainer,
} from "./styled"
import {
	Control,
	Controller,
	ControllerFieldState,
	ControllerRenderProps,
	FieldPath,
	FieldValues,
	useController,
	UseControllerProps,
	UseFormStateReturn,
	ValidationRule,
} from "react-hook-form"
import { StylableProps } from "../utils/styled"
import colors from "../../constants/Colors"
import { Text } from "../Text"
import Colors from "../../constants/Colors"
import { SolidTextInput } from "./Solid"
import { Ionicons } from "@expo/vector-icons"
import { Render } from "../utils/Render"
import Toast from "react-native-toast-message"

export interface TextInputProps extends RNTextInputProps {
	control: Control
	label?: string
	labelStyle?: StyleProp<TextStyle>
	inputStyle?: StyleProp<RNTextInputProps>
	toastError?: boolean
	right?: React.ReactNode
}

type RHFRenderProps = {
	field: ControllerRenderProps<FieldValues, string>
	fieldState: ControllerFieldState
	formState: UseFormStateReturn<FieldValues>
}

export function TextInput<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	control,
	name,
	label,
	labelStyle,
	inputStyle,
	style,
	rules,
	secureTextEntry,
	toastError,
	right,
	onChangeText,
	value: propValue,
	...props
}: TextInputProps & StylableProps & UseControllerProps<TFieldValues, TName>) {
	const [showPassword, setShowPassword] = React.useState(false)
	const inputRef = useRef<typeof TextInput>(null)

	const {
		field: { onChange, value, ...rest },
		fieldState: { error },
	} = control
		? useController({
				name,
				control,
				rules: {
					...rules,
					required:
						rules?.required === true
							? "This field is required"
							: rules?.required,
					minLength:
						typeof rules?.minLength === "number"
							? {
									message: "Value is too short",
									value: rules?.minLength,
							  }
							: rules?.minLength,
					maxLength:
						typeof rules?.maxLength === "number"
							? {
									message: "Value is too long",
									value: rules?.maxLength,
							  }
							: rules?.maxLength,
					min:
						typeof rules?.min === "number"
							? { message: "Value is too low", value: rules?.min }
							: rules?.min,
					max:
						typeof rules?.max === "number"
							? {
									message: "Value is too high",
									value: rules?.max,
							  }
							: rules?.max,
				},
		  })
		: { field: {}, fieldState: {} }

	useEffect(() => {
		if (toastError && error && error.message) {
			Toast.show({
				type: "error",
				text1: error.message,
			})
		}
	}, [toastError, error])

	return (
		<>
			{label && (
				<Text
					style={[{ width: "100%" }, labelStyle]}
					color={Colors.white}
					mb={5}
				>
					{label}
				</Text>
			)}
			<StylableTextInputContainer
				onPress={() => {
					inputRef.current?.focus()
				}}
				error={error && !toastError}
				{...props}
				style={style}
			>
				<StyledTextInput
					placeholderTextColor={colors.placeholder}
					{...rest}
					{...props}
					value={propValue || value}
					style={inputStyle}
					onChangeText={onChange || onChangeText}
					secureTextEntry={secureTextEntry && !showPassword}
					ref={inputRef}
				/>
				<Render if={secureTextEntry}>
					<Pressable
						onPressIn={() => setShowPassword(true)}
						onPressOut={() => setShowPassword(false)}
					>
						<Ionicons
							name="ios-eye-sharp"
							size={24}
							color="#B0B0B0"
						/>
					</Pressable>
				</Render>
				<Render if={!!right}>{right}</Render>
			</StylableTextInputContainer>
			{error && !toastError && (
				<View style={{ width: "100%", height: 35 }}>
					<Text color={"red"}>{error.message}</Text>
				</View>
			)}
		</>
	)
}

TextInput.Solid = SolidTextInput
