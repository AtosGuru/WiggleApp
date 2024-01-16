import {
	Control,
	Controller,
	ControllerFieldState,
	ControllerRenderProps,
	FieldValues,
	UseFormStateReturn,
} from "react-hook-form"
import { StylableCheckboxContainer } from "./styled"
import { StylableProps } from "../utils/styled"
import CheckboxChecked from "../../assets/icons/CheckboxChecked.svg"
import CheckboxUnchecked from "../../assets/icons/CheckboxUnchecked.svg"
import { Text } from "../Text"
import Colors from "../../constants/Colors"
import { StyleProp, ViewStyle } from "react-native"

interface CheckboxProps {
	control: Control
	name: string
	children: string
	style: StyleProp<ViewStyle>
	value?: string
}

type RHFRenderProps = {
	field: ControllerRenderProps<FieldValues, string>
	fieldState: ControllerFieldState
	formState: UseFormStateReturn<FieldValues>
}

export function Checkbox({
	name,
	control,
	children,
	value: valueName,
	...props
}: CheckboxProps & StylableProps) {
	const render = ({
		field: { onChange, value, ...rest },
	}: RHFRenderProps) => {
		const isChecked = valueName ? valueName === value : value

		return (
			<StylableCheckboxContainer
				{...props}
				{...rest}
				onPress={() => onChange(valueName ? valueName : !value)}
			>
				{isChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
				<Text color={Colors.white} ml={5}>
					{children}
				</Text>
			</StylableCheckboxContainer>
		)
	}

	return <Controller render={render} name={name} control={control} />
}
