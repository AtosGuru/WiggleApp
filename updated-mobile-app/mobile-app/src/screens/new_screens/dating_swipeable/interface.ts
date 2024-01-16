interface Profile {
    age: number;
    name: string
    bio: string;
    photos: string[];
    interest: string[];
    title: string;
  }
  
  interface Geolocation {
    ip: string;
    city: string;
    region: string;
    country: string;
    latitude: string;
    longitude: string;
    countryCode: string;
    currencyCode: string;
    continentCode: string;
    currencySymbol: string;
  }
  
  interface UserProfile {
    id: number;
    name: string;
    profile: {
      gender: string;
      photos: string[];
      lastName: string;
      firstName: string;
      username: string;
      birthDate: string;
      identifier: string;
      verify_pin: string;
      geolocation: Geolocation;
    };
    premium: {
      is_premium: boolean;
      start_at: string;
    }
  }
  
  interface User {
    id: number;
    uuid: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    is_online: boolean
    profile: Profile;
    active: number;
    likes_count: number;
    likers_count: number;
    user: UserProfile;
  }