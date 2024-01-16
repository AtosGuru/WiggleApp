import { axiosInstance } from './axiosInstance'
import { User } from '../types/user.interface'
import { QueryFunctionContext } from 'react-query'
import { ConnectionType } from '../types/enum'

interface ChatMessage {
  connection_id: number
  created_at: string
  id: number
  image: any
  image_id: any
  message: string
  updated_at: string
  user?: User
}

export interface ConnectionsResponse {
  connections: {
    event: null
    event_id: number
    id: number
    messages: ChatMessage[]
    partner: User
    partner_id: number
    type: ConnectionType
    user?: User
    user_id: number
    updated_at: string
    unread: {
      count: number
      time: string
    }
  }[]
  links: {
    first: string
    last: string
    next: string | null
    prev: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    links: []
    path: string
    per_page: number
    to: number
    total: number
  }
}

interface GetConnectionResponse {
  'CSRF-TOKEN': string
  'X-SESSION-ID': string
  event: any
  event_id: any
  id: number
  messages: ChatMessage[]
  partner: User
  partner_id: number
  type: number
  user_id: number
}

export async function getConnections({
  queryKey: [_, type, myUserId, partner_id]
}: QueryFunctionContext) {
  const { data } = (await axiosInstance.get('api/v1/connection', {
    params: {
      partner_id: partner_id ?? null,
      user_id: myUserId ?? null,
      type: type ?? null
    }
  })) as { data: ConnectionsResponse }

  return data
}

export async function newChatConnection({
  partner_id,
  type
}: {
  partner_id?: User['id'] | 'string'
  type: ConnectionType
}) {
  const { data } = await axiosInstance.post<GetConnectionResponse>(
    `api/v1/connection`,
    {
      type: type,
      partner_id
    }
  )
  
  return data
}

export async function addMessage({
  partner_id,
  type,
  message
}: {
  partner_id: number
  type: string
  message: string
}) {
  const { data } = await axiosInstance.post<GetConnectionResponse>(
    `api/v1/chat`,
    {
      partner_id,
      type,
      message
    }
  )
  
  return data
}

export async function addComment({
  id,
  twilio_message_id
}: {
  id: 'string'
  twilio_message_id: 'string'
}) {
  const { data } = await axiosInstance.post<GetConnectionResponse>(
    `api/v1/stories/message`,
    {
      id,
      twilio_message_id
    }
  )
  
  return data
}

export async function newConnection({
  partner_id,
  type,
  user_id,
  event_id
}: {
  partner_id?: User['id'] | 'string'
  type: ConnectionType
  user_id?: number | string
  event_id?: number | string
}) {
  const { data } = await axiosInstance.post<GetConnectionResponse>(
    `api/v1/connection`,
    {
      type: type,
      partner_id,
      user_id,
      event_id
    }
  )
  
  return data
}

export async function updateConnection({
  connection_id,
  data,
  partner_id
}: {
  connection_id: number
  data: Partial<ConnectionsResponse['connections'][number]>
  partner_id?: number
}) {
  const res = await axiosInstance.post<GetConnectionResponse>(
    `api/v1/connection/${connection_id}`,
    {
      ...data,
      partner_id
    }
  )
  return res.data
}

export async function deleteConnection({
  connection_id
}: {
  connection_id: number
}) {
  const res = await axiosInstance.delete<GetConnectionResponse>(
    `api/v1/connection/${connection_id}`
  )

  return res.data
}

export async function updateReadStatus({
  connection_id,
  updated_at
}: {
  connection_id: number
  updated_at: string
}) {
  const { data } = await axiosInstance.post<GetConnectionResponse>(
    `api/v1/chat/at/${connection_id}`,
    {
      type: ConnectionType.MESSAGE_READ,
      updated_at
    }
  )

  return data
}

export async function getEventParticipants({
  type,
  event_id
}: {
  type: ConnectionType
  event_id: number
}) {
  const { data } = await axiosInstance.get<ConnectionsResponse>(
    `api/v1/connection/event`,
    {
      params: {
        type,
        event_id
      }
    }
  )

  return data
}
