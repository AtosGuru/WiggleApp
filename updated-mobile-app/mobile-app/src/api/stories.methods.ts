import { axiosInstance } from './axiosInstance'


export const getStories = async () => {
    try {
        const res = await axiosInstance.get('/api/v1/stories')
        // console.log(res?.data,"<==============resssssss")
        return res
    } catch (error) {
        console.error(error)
    }
}

export const postStory = async (payload:any) => {
    try {
        const res = await axiosInstance.post('/api/v1/stories', {
            "images": [payload]
          })
          console.log(res?.data,"<===================postStory")
        return res
    } catch (error) {
        console.error(error,"<====postStory")
    }
}

export const deleteStory = async (payload:any) => {
    try {
        const res = await axiosInstance.delete(`/api/v1/stories/${payload}`)
        // console.log(res?.data,"<========deleteStory")
        return res
    } catch (error) {
        console.error(error)
    }
}
