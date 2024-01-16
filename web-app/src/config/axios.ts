import axios from 'axios'
import { getSession } from 'next-auth/react'

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 60000,
}

const authorizedAxios = axios.create(baseConfig)
const unAuthorizedAxios = axios.create(baseConfig)

authorizedAxios.interceptors.request.use(async (config) => {
  const session = await getSession()

  if (session) {
    //@ts-ignore
    config.headers['X-CSRF-TOKEN'] = session.user['CSRF-TOKEN'];
    //@ts-ignore
    config.headers['X-SESSION-ID'] = session.user['X-SESSION-ID'];
  }

  return config
})


export { authorizedAxios, unAuthorizedAxios }