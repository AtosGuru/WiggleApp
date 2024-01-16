import { ErrorCodes } from '@/types/authTypes'

export const selectAuthError = (code: number): string => {
  switch (code) {
    case ErrorCodes.Unauthorized: {
      return 'The data for authorization is incorrect' 
    }
    default: {
      return 'Something went wrong! Please, Try again...'
    }
  }
}