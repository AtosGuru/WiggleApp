import {IObject} from '../types/utils';
import {axiosInstance} from './axiosInstance';

export const getPosts = async (body: any) => {
  try {
    const resp = await axiosInstance.get(`/api/v1/mingle/posts/${body}`);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const addPosts = async (params: IObject) => {
  try {
    const resp = await axiosInstance.post(
      `/api/v1/mingle/post`,
      params?.postData,
    );
    return resp?.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (params: string) => {
  try {
    const resp = await axiosInstance.delete(
      `/api/v1/mingle/delete/post/${params}`,
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const reactPost = async (params: IObject) => {
  try {
    const resp = await axiosInstance.post(
      `/api/v1/mingle/post/${params?.id}/react`,
      {
        reaction: params?.reaction,
      },
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async (params: IObject) => {
  try {
    const resp = await axiosInstance.put(`/api/v1/mingle/post/${params?.id}`, {
      message: params?.message,
    });
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const reportPost = async (id: IObject) => {
  try {
    const resp = await axiosInstance.get(`/api/v1/mingle/report/post/${id}`);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const getComments = async (postID: any) => {
  try {
    const resp = await axiosInstance.get(`/api/v1/mingle/comments/${postID}`);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const addComments = async (params: IObject) => {
  try {
    const resp = await axiosInstance.post(
      `/api/v1/mingle/comment/${params?.postID}`,
      params?.commentData,
    );
    return resp?.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (postID: string) => {
  try {
    const resp = await axiosInstance.delete(
      `/api/v1/mingle/delete/comment/${postID}`,
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const reactComment = async (params: IObject) => {
  try {
    const resp = await axiosInstance.post(
      `/api/v1/mingle/comment/${params?.id}/react`,
      {
        reaction: params?.reaction,
      },
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const updateComment = async (params: IObject) => {
  try {
    const resp = await axiosInstance.put(`/api/v1/mingle/comment/${params?.id}`, {
      comment: params?.comment,
    });
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const reportComment = async (id: IObject) => {
  try {
    const resp = await axiosInstance.get(`/api/v1/mingle/report/comment/${id}`);
    return resp;
  } catch (error) {
    console.error(error);
  }
};
