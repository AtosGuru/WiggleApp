import { ReactElement, ReactNode } from 'react'

type ChildrenType = ReactNode | ReactElement

export interface PageWrapperProps {
  className?: string
  children: ChildrenType,
}

export interface MetaProps {
  title: string
  desc?: string
}

export enum ScrollViewOffset {
  Top = 'Top',
  Bot = 'Bot'
}

export interface ScrollViewProps {
  classNames: string[]
  offset?: ScrollViewOffset
  children: ChildrenType
}

export enum ButtonTypes {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export enum ButtonSizes {
  LG = 'large',
  MD = 'medium',
  SM = 'small',
}

export enum SelectSizes {
  LG = 'large',
  SM = 'small',
}

export enum Days {
  One = 'Monday',
  Two = 'Tuesday',
  Three = 'Wednesday',
  Four = 'Thursday',
  Five = 'Friday',
  Six = 'Saturday',
  Seven = 'Sunday'
}

export enum InputMasks {
  Time = '99:99',
  Date = '99-99-999'
}

export const InputPatterns = {
  Email: /\S+@\S+\.\S+/,
  Name: /^[a-zA-Zа-яА-ЯёЁэЭіІїЇєЄ'][a-zA-Z-а-яА-ЯёЁэЭіІїЇєЄ' ]+[a-zA-Zа-яА-ЯёЁэЭіІїЇєЄ']?$/u,
} as const

export enum ScreenBreakpoints {
  Laptop = 1366,
  Tablet = 1024,
  Mobile = 480
}

export type IdType = {
  id: number | string
}

export interface ChildProp {
  children: ChildrenType
}

export interface SectionTitleProps {
  children: ChildrenType
  leavel: number
}

export interface FieldProps {
  [key: string]: any
}

export interface ButtonProps {
  [key: string]: any
}

export interface CheckboxProps {
  [key: string]: any
}

export interface FileProps {
  [key: string]: any
}

export interface ModalProps {
  children: ChildrenType
  centered?: boolean
  fullscreen?: boolean
  isOpen: boolean,
  setOpen: any
}

export interface ModalCloseProps {
  closeModalHandler: () => void
}

type SelectType = {
  id: number
  name: string
  isActive: boolean
}

export interface SelectProps {
  size: SelectSizes
  defaultValue: string
  options: SelectType[]
}

export interface OverlayProps {
  isOpen: boolean
  setOpen: any
}

export interface LogoProps {
  text?: boolean
}

export type FormValues = {
  [key: string]: string
}

export interface DatePickerProps {
  selected: Date
  changeDate: (date: Date) => void
}

export interface SelectModalProps {
  title: string
  positiveHandle: () => void
  negativeHandle: () => void
}

export interface SelectModalBtnsProps {
  positiveHandle: () => void
  negativeHandle: () => void
}

export interface SuccessModalProps {
  title: string
}

export enum PhotoVarians {
  Fullsize = 'fullsize',
  Public = 'public'
}