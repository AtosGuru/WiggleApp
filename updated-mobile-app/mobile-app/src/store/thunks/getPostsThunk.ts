import {createAsyncThunk} from '@reduxjs/toolkit';

import {IObject} from '../../types/utils';
import {  
  modalState,
  resetMessage,
  updateData,
  DeletePost,
  updatePostData,
} from '../mingleSlice';
import {
  addPosts,
  getPosts,
  reactPost,
  reportPost,
  updatePost,
  deletePost,
} from '../../api/post.methods';

export const getPostsThunk = createAsyncThunk(
  'getPostsThunk',
  async (payload: any, thunkAPi) => {
    try {
      const res = await getPosts(payload);
      return res?.data;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const addPostThunk = createAsyncThunk(
  'addPostThunk',
  async (payload: any, thunkAPi) => {
    try {      
      const res = await addPosts(payload);
      thunkAPi.dispatch(resetMessage());
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const deletePostThunk = createAsyncThunk(
  'deletePostThunk',
  async (params: IObject, thunkAPi) => {
    try {
      thunkAPi.dispatch(DeletePost(params?.id));
      const res = await deletePost(params.id);
      params.callBack();
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const reportPostThunk = createAsyncThunk(
  'reportPostThunk',
  async (params: IObject, thunkAPi) => {
    try {
      const res = await reportPost(params.id);
      if (res?.data?.success) {
        params?.successCallBack();
      } else {
        params?.rejectCallBack();
      }
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const reactionPostThunk = createAsyncThunk(
  'reactionPostThunk',
  async (params: IObject, thunkAPi) => {
    try {
      thunkAPi.dispatch(updateData(params));
      const res = await reactPost(params);
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const updatePostThunk = createAsyncThunk(
  'updatePostThunk',
  async (params: IObject, thunkAPi) => {
    try {
      thunkAPi.dispatch(updatePostData(params));
      const res = await updatePost(params);
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);
