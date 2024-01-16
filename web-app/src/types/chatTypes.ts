export enum ChatStatuses {
  ONLINE = 'Online',
  OFFLINE = 'Offline'
}

export enum MessageType {
  SENDER = 'Sender',
  OWNEW = 'Owner'
}

export interface ChatItemProps {
  id: number | string
  isUnreadable: boolean
  path: string
  name: string
  excerpt: string
  status: string
  count: string | number
}

export interface MessageItemProps {
  id: number | string
  type: string
  path: string
  message: string
}