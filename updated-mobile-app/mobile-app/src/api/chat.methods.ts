import { axiosInstance } from './axiosInstance'
import { QueryFunction, QueryFunctionContext } from 'react-query'
import { ChatMessage } from '../types/chat.interfaces'
import { ConnectionsResponse } from './connections.methods'

export interface ChatResponse extends ConnectionsResponse {
  messages: ChatMessage[]
}

export async function getChat({
  queryKey: [_, connection_id],
  pageParam
}: QueryFunctionContext): Promise<ChatResponse> {
  const { data } = await axiosInstance.get(`api/v1/chat/${connection_id}`, {
    params: {
      page: pageParam ?? 1
    }
  })

  return data
}

export async function getChats(): Promise<ChatResponse> {
  const { data } = await axiosInstance.get(`api/v1/chat`);
  const getConnectionIds = data.connections.map((e) => {
    return e.id
  })

  const requestData = {
    "connection_ids": getConnectionIds
  }

  const response = await axiosInstance.post('api/v1/chat/getLastMessages', requestData);

  const messArr = {};

  Object.values(response?.data).forEach((ee) => {
    messArr[ee.connection_id] = ee;
  })
  const newData = data.connections.map((e) => {
    if (!e.messages.length && messArr[e.id]) {
      return { ...e, messages: [messArr[e.id]] }
    }
    return e;
  })


  return { ...data, connections: newData }
}

export async function chatSearch({
  input
}: {
  input: string
}): Promise<ChatResponse> {
  const { data } = await axiosInstance.get(`api/v1/chat/search`, {
    params: {
      search: input
    }
  })
  return data
}

export async function sendMessage({
  message,
  connection_id,
  image_id = null
}: {
  message: string
  connection_id: string
  image_id?: string | null
}) {
  const { data } = await axiosInstance.post('api/v1/chat', {
    message,
    connection_id,
    image_id
  })

  return data
}
