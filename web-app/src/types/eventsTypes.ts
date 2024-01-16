export interface EventBtnsProps {
  createNewHandler: () => void
  createTemplateHandler: () => void
}

export enum EventTypes {
  Event = 'event',
  Festival = 'festival'
}

export interface EventBtnProps {
  [key: string]: any
}

export interface CreateEventNewFormProps {
  isEditable: boolean
}