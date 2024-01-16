import { isBrowser } from './isBrowser'

export const delay = (ms: number) => {
  if (!isBrowser()) {
    return
  }

  return new Promise(res => setTimeout(res, ms))
}