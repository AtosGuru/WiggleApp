import React, { useEffect } from "react"
import { TextInputProps as RNTextInputProps, View } from "react-native"
import {
	StylableSolidTextInputContainer,
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
import { TextInputProps } from "./TextInput"
import Toast from "react-native-toast-message"

type RHFRenderProps = {
	field: ControllerRenderProps<FieldValues, string>
	fieldState: ControllerFieldState
	formState: UseFormStateReturn<FieldValues>
}
export function SolidTextInput<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	control,
	name,
	label,
	inputStyle,
	labelStyle,
	style,
	rules,
	toastError,
	...props
}: TextInputProps & StylableProps & UseControllerProps<TFieldValues, TName>) {
	const {
		field: { onChange, ...rest },
		fieldState: { error },
	} = useController({
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
					? { message: "Value is too short", value: rules?.minLength }
					: rules?.minLength,
			maxLength:
				typeof rules?.maxLength === "number"
					? { message: "Value is too long", value: rules?.maxLength }
					: rules?.maxLength,
			min:
				typeof rules?.min === "number"
					? { message: "Value is too low", value: rules?.min }
					: rules?.min,
			max:
				typeof rules?.max === "number"
					? { message: "Value is too high", value: rules?.max }
					: rules?.max,
		},
	})

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
			<StylableSolidTextInputContainer
				error={error && !toastError}
				{...props}
				style={style}
			>
				<StyledTextInput
					placeholderTextColor={colors.placeholder}
					{...rest}
					{...props}
					style={inputStyle}
					onChangeText={onChange}
				/>
			</StylableSolidTextInputContainer>
			{error && !toastError && (
				<View style={{ width: "100%", height: 35 }}>
					<Text color={"red"}>{error.message}</Text>
				</View>
			)}
		</>
	)
}
