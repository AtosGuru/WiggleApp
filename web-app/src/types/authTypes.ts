export enum AuthStatuses {
  Loading = 'loading',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated'
}

export enum ErrorCodes {
  Unauthorized = 401
}

export interface Session {
  session: {
    email: string
    password: string
  }
}