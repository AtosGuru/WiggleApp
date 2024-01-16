import { createSlice } from '@reduxjs/toolkit';
import { getCommentsThunk, addCommentThunk } from './thunks/getCommentsThunk';
import moment from 'moment';
import { IObject } from '../types/utils';

interface mingleCommentSlice {
    comment: any[]
    isLoading: boolean
    message: string
    postID: string
    addCommentModal: boolean
    id: string
}

const initialState: mingleCommentSlice = {
    comment: [],
    isLoading: false,
    message: '',
    postID: '',
    addCommentModal: false,
    id: ''
};

const mingleCommentSlice = createSlice({
    name: 'mingleComments',
    initialState,
    reducers: {
        DeleteComment: (state, action) => {
            state.comment = state.comment.filter(item => item.id !== action.payload);
        },
        updateData: (state, action) => {
            state.comment = state.comment.map((item) => {
                if (item?.id === action.payload?.id) {

                    if (item.reaction == action.payload?.reaction) {
                        return {
                            ...item,
                            reaction: null,
                            likes_count_count: action.payload?.reaction == "LIKE" ? item?.likes_count_count - 1 : item?.likes_count_count,
                            dislikes_count_count: action.payload?.reaction == "DISLIKE" ? item?.dislikes_count_count - 1 : item?.dislikes_count_count
                        }
                    }

                    if (item.reaction) {
                        return {
                            ...item,
                            reaction: action.payload?.reaction,
                            likes_count_count: action.payload?.reaction == "LIKE" ? item?.likes_count_count + 1 : item?.likes_count_count - 1,
                            dislikes_count_count: action.payload?.reaction == "DISLIKE" ? item?.dislikes_count_count + 1 : item?.dislikes_count_count - 1
                        }
                    }

                    return {
                        ...item,
                        reaction: action.payload?.reaction,
                        likes_count_count: action.payload?.reaction == "LIKE" ? item?.likes_count_count + 1 : item?.likes_count_count,
                        dislikes_count_count: action.payload?.reaction == "DISLIKE" ? item?.dislikes_count_count + 1 : item?.dislikes_count_count
                    }


                }

                return item
            })
        },
        resetMessage: (state) => {
            state.message = '',
                state.id = ''
        },
        setMessage: (state, action) => {
            state.message = action?.payload.message
            state.id = action?.payload?.id
        },        
        modalState: (state) => {
            state.addCommentModal = !state.addCommentModal
        },
        updateCommentData: (state, action) => {
            state.comment = state.comment.map((item: IObject) => {
                if (item?.id == action?.payload?.id) {
                    return {
                        ...item,
                        "message": action?.payload?.message
                    }
                }
                return item
            })

        }
    },
    extraReducers(builder) {
        builder.addCase(getCommentsThunk.fulfilled, (state, action) => {
            
            state.comment = action?.payload?.comments,
                state.isLoading = false
        })
            .addCase(getCommentsThunk.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getCommentsThunk.rejected, (state, action) => {
                state.isLoading = false
            }),
            builder.addCase(addCommentThunk.rejected, (state, action) => {
                state.isLoading = false
            }).addCase(addCommentThunk.fulfilled, (state, action) => {
                state.comment.push(action?.payload?.comment)
                state.isLoading = false
            }).addCase(addCommentThunk.pending, (state, action) => {
                state.isLoading = true
            })

    },
})

export const { updateData, setMessage, resetMessage, modalState, DeleteComment, updateCommentData } = mingleCommentSlice.actions;

export default mingleCommentSlice.reducer;