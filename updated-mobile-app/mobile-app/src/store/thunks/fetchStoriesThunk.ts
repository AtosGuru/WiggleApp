import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteStory, getStories, postStory } from "../../api/stories.methods";
import { setDeleteModal } from "../storiesSlice";

export const fetchStoriesThunk = createAsyncThunk("fetchStoriesThunk", async (_, thunkAPi) => {
    try {
        const res = await getStories()
        return res?.data
    } catch (error) {
        thunkAPi.rejectWithValue(error)
    }
})


export const postStoryThunk = createAsyncThunk("postStoryThunk", async (payload:any,thunkApi) => {
    try {
        const res = await postStory(payload)
        thunkApi.dispatch(fetchStoriesThunk())
       
    } catch (error) {
        console.error(error)
    }
})

export const deleteStoryThunk = createAsyncThunk("deleteStoryThunk", async (payload:any,thunkAPi) => {
    try {
        const res = await deleteStory(payload)
        thunkAPi.dispatch(fetchStoriesThunk())
        thunkAPi.dispatch(setDeleteModal(""))
        return res?.data
    } catch (error) {
        thunkAPi.rejectWithValue(error)
    }
    })

