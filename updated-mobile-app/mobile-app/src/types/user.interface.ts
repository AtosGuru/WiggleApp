export interface User {
  isCodeSent?: boolean
  name: string
  social_id?: string
  email: string
  email_verified_at?: string
  phone: string | null
  phone_verified_at?: string
  is_online?: boolean
  updated_at: string
  created_at: string
  id: number
  profile: {
    provider?: string
    is_private?: boolean
    firstName: string
    lastName: string
    name: string
    birthDate: string
    gender: 'male' | 'female' | 'other'
    photos: string[]
    description: string
    registrationStep: RegistrationStep
    stories?: string[]
    identifier: string
    verify_pin: string
    geolocation: {
      ip: string
      continent: string
      continentCode: string
      country: string
      countryCode: string
      region: string
      city: string
      timezone: string
      currencyCode: string
      currencySymbol: string
      latitude: string
      longitude: string
    }
  }
  follow_count?: {
    followers: string
    follows: string
    user_id: number
  }
}

// Values of this enums are route names in the auth navigator.
export enum RegistrationStep {
  Information = 'informationForm',
  Photos = 'photoUpload',
  Code = 'codeVerification'
}
