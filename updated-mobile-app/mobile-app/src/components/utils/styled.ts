import styled from "styled-components/native"
import { View } from "react-native"
import { ComponentType, ReactElement } from "react"

export interface StylableProps {
	m?: number
	mb?: number
	mt?: number
	ml?: number
	mr?: number
	p?: number
	pb?: number
	pt?: number
	pl?: number
	pr?: number
	py?: number
	px?: number
}

export function makeStylable(component: ComponentType<any>) {
	return styled(component)<StylableProps>`
		${({ m }) => m && `margin: ${m}px;`}
		${({ mb }) => mb && `margin-bottom: ${mb}px;`}
		${({ mt }) => mt && `margin-top: ${mt}px;`}
  		${({ ml }) => ml && `margin-left: ${ml}px;`}
  		${({ mr }) => mr && `margin-right: ${mr}px;`}
        ${({ p }) => p && `padding: ${p}px;`}
        ${({ py, px, p }) =>
			(py || px) && `padding: ${py || p || 0}px ${px || p || 0}px;`}
  		${({ pb }) => pb && `padding-bottom: ${pb}px;`}
  		${({ pt }) => pt && `padding-top: ${pt}px;`}
  		${({ pl }) => pl && `padding-left: ${pl}px;`}
  		${({ pr }) => pr && `padding-right: ${pr}px;`}
	`
}

export const StylableView = makeStylable(View)

export const Flex = styled(StylableView)<{
	alignCenter?: boolean
	justifyCenter?: boolean
	alignEnd?: boolean
	justifyEnd?: boolean
	f?: number
	spaceBetween?: boolean
	center?: boolean
	row?: boolean
	wrap?: boolean
}>`
	${({ f = 1 }) => f && `flex: ${f};`}
	${({ alignCenter }) => alignCenter && "align-items: center;"}
	${({ justifyCenter }) => justifyCenter && "justify-content: center;"}
  	${({ alignEnd }) => alignEnd && "align-items: flex-end;"}
  	${({ justifyEnd }) => justifyEnd && "justify-content: flex-end;"}
  	${({ spaceBetween }) => spaceBetween && "justify-content: space-between;"}
  	${({ center }) => center && "align-items: center;justify-content: center;"}
    ${({ row }) => row && "flex-direction: row;"}
    ${({ wrap }) => wrap && "flex-wrap: wrap;"}
`
