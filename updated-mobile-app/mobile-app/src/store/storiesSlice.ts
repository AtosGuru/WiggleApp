import { createSlice } from '@reduxjs/toolkit'
import { deleteStoryThunk, fetchStoriesThunk } from './thunks/fetchStoriesThunk'

interface ISellerStories {
    stories: any[],
    isLoading: boolean,
    deleteModal: boolean,
    deleteId: string
}

const initialState: ISellerStories = {
    stories: [],
    isLoading: false,
    deleteModal: false,
    deleteId: ""
}


export const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        setDeleteModal: (state, action) => {
            state.deleteModal = !state.deleteModal,
                state.deleteId = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchStoriesThunk.fulfilled, (state, action) => {
            state.stories = action?.payload?.stories
            })
            .addCase(deleteStoryThunk.fulfilled,(state, action) => {
                state.isLoading = false
                })
                .addCase(deleteStoryThunk.rejected,(state, action) => {
                    state.isLoading = false
                    })
                    .addCase(deleteStoryThunk.pending,(state, action) => {
                        state.isLoading = true
                        })
    }
})


export const { setDeleteModal } = storiesSlice.actions

export default storiesSlice.reducer