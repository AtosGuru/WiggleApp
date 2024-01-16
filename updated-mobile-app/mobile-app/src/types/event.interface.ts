export interface Event {
  begin: string
  connection_id: number
  created_at: string | null
  description: string
  id: number
  image_id: string
  location_id: number
  title: string
  updated_at: string | null
  url: string
  user_id: number
  schedule?: {
    opening_hours: {
      periods: any
      special_days: {
        close: {
          time: string
        }
        // date: "2024-03-16"
        date: string
        open: {
          time: string
        }
      }[]
    }
  }
}

export interface ResponseDetails {
  "CSRF-TOKEN": string
  "X-SESSION-ID": string
}

export interface FullEvent extends ResponseDetails, Event {
  location: {
    blocked: number
    created_at: string | null
    id: number
    place: any[]
    title: string
    updated_at: string | null
  }
}