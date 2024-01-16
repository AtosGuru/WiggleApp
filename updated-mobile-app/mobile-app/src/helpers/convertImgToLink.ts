const imgUrlService = 'https://imagedelivery.net/wXG-Ds-607bgN2v8An8cmw/'
const vidUrlService = 'https://customer-2supyovcdud62mho.cloudflarestream.com/'

export const convertImgToLink = (id?: string) => {
  if (!id) {
    return ''
  }
  if (id?.startsWith('http')) {
    return id
  }
  return imgUrlService + id + '/public'
}

export const convertVideoToLink = (id?: string) => {
  
  if (!id) {
    return ''
  }
  if (id?.startsWith('http')) {
    return id
  }
  return vidUrlService + id + '/watch'
}
