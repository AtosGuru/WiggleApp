import { MAPS_API_KEY } from '../store/actionThunk'

export const getGooglePlaceImageUrl = (reference: string) =>
  `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${reference}&key=${MAPS_API_KEY}`
