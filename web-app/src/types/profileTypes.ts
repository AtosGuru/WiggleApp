import { MouseEvent } from 'react'

export enum SchedulePositions {
  Start = 'start',
  End = 'end'
}

export interface ButtonsProps {
  isEditable: boolean
  editHandler: (e: MouseEvent<HTMLButtonElement>) => void
  cancelHandler: (e: MouseEvent<HTMLButtonElement>) => void
}

export interface ScheduleProps {
  register: any
  errors: any
  control: any
}

export interface ScheduleListProps {
  register: any
  errors: any
  control: any
}

export interface ProfileSheduleItemProps {
  info: {
    id: number | string,
    name: string,
    start: string,
    end: string
  },
  isEditable: boolean
  register: any
  errors: any
  control: any
}

export interface GalleryItemProps {
  info: {
    id: string | number,
    path: string
  },
  isEditable?: boolean
}

export interface AddScheduleDayProps {
  info: {
    id: number | string,
    day: string,
    isActive: boolean
  }
  register: any
  errors: any
  clearErrors: any
}

export interface AddScheuleTimeProps {
  register: any
  errors: any
  control: any
}

export interface AddScheuleDaysProps {
  register: any
  errors: any
  clearErrors: any
}