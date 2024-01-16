export const getImageURL = (urlOrId: string) =>
  urlOrId.includes('http')
    ? urlOrId
    : `https://imagedelivery.net/wXG-Ds-607bgN2v8An8cmw/${urlOrId}/public`;
    
export const CHAT_IMAGE_UPLOAD_ERROR = "chat image Upload error";
export const SEARCHING_USER_LOADER_COLOR = "#FFCB52";
export const SERCH_BOX_PLACEHOLDER_TEXT_COLOR = "#B0B0B0";
export const CHAT_TEXTINPUT_PLACEHOLDER_COLOR = '#686868'