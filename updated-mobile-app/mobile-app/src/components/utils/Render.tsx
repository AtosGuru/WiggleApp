import React from "react"

export function Render({
	children,
	if: condition,
	else: elseContent,
}: {
	if?: boolean
	else?: JSX.Element
	children: React.ReactNode
}): JSX.Element | null {
	const content = <>{children}</>

	if (condition) {
		return content
	} else {
		if (elseContent) {
			return elseContent
		} else {
			return null
		}
	}
}
