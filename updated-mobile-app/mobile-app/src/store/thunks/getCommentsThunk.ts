import {createAsyncThunk} from '@reduxjs/toolkit';

import {IObject} from '../../types/utils';
import {
  modalState,
  resetMessage,
  updateData,
  DeleteComment,
  updateCommentData,
} from '../mingleCommentSlice';
import {
  updateCommentCount,
} from '../mingleSlice';
import {
  addComments,
  getComments,
  reactComment,
  reportComment,
  updateComment,
  deleteComment,
} from '../../api/post.methods';

export const getCommentsThunk = createAsyncThunk(
  'getCommentsThunk',
  async (payload: any, thunkAPi) => {
    try {
      const res = await getComments(payload);
      return res?.data;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const addCommentThunk = createAsyncThunk(
  'addCommentThunk',
  async (payload: any, thunkAPi) => {
    try {      
      const res = await addComments(payload);
      thunkAPi.dispatch(resetMessage());
      thunkAPi.dispatch(updateCommentCount({id: payload?.postID, type: 'add'}))
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const deleteCommentThunk = createAsyncThunk(
  'deleteCommentThunk',
  async (params: IObject, thunkAPi) => {
    try {
      const res = await deleteComment(params.id);
      thunkAPi.dispatch(DeleteComment(params?.id));
      thunkAPi.dispatch(updateCommentCount({id: params?.postID, type: 'delete'}))
      params.callBack();
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const reportCommentThunk = createAsyncThunk(
  'reportCommentThunk',
  async (params: IObject, thunkAPi) => {
    try {
      const res = await reportComment(params.id);
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

export const reactionCommentThunk = createAsyncThunk(
  'reactionCommentThunk',
  async (params: IObject, thunkAPi) => {
    try {
      thunkAPi.dispatch(updateData(params));
      const res = await reactComment(params);
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);

export const updateCommentThunk = createAsyncThunk(
  'updateCommentThunk',
  async (params: IObject, thunkAPi) => {
    try {
      thunkAPi.dispatch(updateCommentData(params));
      const res = await updateComment(params);
      return res;
    } catch (error) {
      thunkAPi.rejectWithValue(error);
    }
  },
);
