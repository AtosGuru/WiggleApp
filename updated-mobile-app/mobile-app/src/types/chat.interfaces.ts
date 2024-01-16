export interface ChatMessage {
  id: number
  created_at: string
  updated_at: string
  connection_id: number
  message: string
  image_id: string | null
  user_id: number
  image: {
    id: string
    created_at: string
    updated_at: string
    user_id: number
    active: number
    meta: null
  } | null
}
