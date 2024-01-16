import { axiosInstance, handleRequestError } from './axiosInstance';
import RNFS from 'react-native-fs';
import mime from 'mime'
import RNFetchBlob from 'rn-fetch-blob';
import { Platform } from 'react-native';

export async function videoUpload(fileUri: string) {
  let uploadedVideoId = "";
  try {
    const fileInfo = await RNFS.stat(fileUri);
    if (!fileInfo.isFile()) return false;


    const imageData = { type: 'video' , duration : 15 };

    const resCloud = await axiosInstance({
      url: 'api/v1/image/storage',
      method: 'POST',  // Change the method to POST
      headers: {
        'Content-Type': 'application/json',
      },
      data: imageData,  
    });

    const { uploadURL , uid } = resCloud.data?.cloudflare || {};


    if (!uploadURL) return false;
    uploadedVideoId = uid;
    console.log(uploadedVideoId,"<=====uploadddd")

    const videoMIMEType = mime.getType(fileUri) || 'video/mp4';

    const fileFormat = mime.getExtension(videoMIMEType);

    const res = await RNFetchBlob.fetch(
      'POST',
      uploadURL,
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename: fileInfo?.name ?? `file.${fileFormat}`,
          type: videoMIMEType,
          data: RNFetchBlob.wrap(
            Platform.OS === 'ios'
              ? fileInfo.path.replace('file://', '')
              : fileInfo.path
          )
        }
      ]
    );
    if (res.respInfo.status === 200) {
      // The video was successfully uploaded
      return uploadedVideoId;
    } else {
      return uploadedVideoId;
    }
  } catch (err) {
    // An error occurred during the upload
    return uploadedVideoId;
  }
}