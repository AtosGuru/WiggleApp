import { PhotoVarians } from '@/types/commonTypes'

export const getPhotoById = (id: string, variant: string = PhotoVarians.Public): string => {
  return `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/${id}/${variant}`
}