import { createSlice } from '@reduxjs/toolkit';
import { getPostsThunk, addPostThunk } from './thunks/getPostsThunk';
import moment from 'moment';
import { IObject } from '../types/utils';

interface minglePostSlice {
    post: any[]
    isLoading: boolean
    message: string
    location: string
    addPostModal: boolean
    id: string
}

const initialState: minglePostSlice = {
    post: [],
    isLoading: false,
    message: '',
    location: '',
    addPostModal: false,
    id: ''
};

const minglePostSlice = createSlice({
    name: 'minglePosts',
    initialState,
    reducers: {
        DeletePost: (state, action) => {
            state.post = state.post.filter(item => item.id !== action.payload);
        },
        updateData: (state, action) => {
            state.post = state.post.map((item) => {
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
        updateCommentCount: (state, action) => {
            state.post = state.post.map((item) => {
                if (item?.id === action.payload?.id) {
                    return {
                        ...item,                        
                        comments_count_count: action.payload?.type == 'add' ? item?.comments_count_count + 1 : item?.comments_count_count - 1
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
            state.addPostModal = !state.addPostModal
        },
        updatePostData: (state, action) => {
            state.post = state.post.map((item: IObject) => {
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
        builder.addCase(getPostsThunk.fulfilled, (state, action) => {
            state.post = action?.payload?.posts,
                state.isLoading = false
        })
            .addCase(getPostsThunk.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getPostsThunk.rejected, (state, action) => {
                state.isLoading = false
            }),
            builder.addCase(addPostThunk.rejected, (state, action) => {
                state.isLoading = false
            }).addCase(addPostThunk.fulfilled, (state, action) => {                
                state.post.unshift(action?.payload?.post)                
                state.isLoading = false
            }).addCase(addPostThunk.pending, (state, action) => {
                state.isLoading = true
            })

    },
})

export const { updateData, updateCommentCount, setMessage, resetMessage, modalState, DeletePost, updatePostData } = minglePostSlice.actions;

export default minglePostSlice.reducer;