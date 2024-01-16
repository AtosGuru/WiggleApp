import { AxiosError } from "axios"
import { axiosInstance, handleRequestError } from "./axiosInstance"

type UserProfile = {
    age?: number;
    bio?: string;
    interest?: string[];
    photos?: string[];
    ageFilter?: [number, number]
    gender?: 'male' | 'female' | 'other'
}

export async function getDatings() {
    try {
        const { data } = await axiosInstance.get('api/v1/dating/club')

        return data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function getNears() {
    try {
        const { data } = await axiosInstance.get('api/v1/dating/pre')

        return data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function getMyDatingProfile() {
    try {
        const { data } = await axiosInstance.get('api/v1/dating')

        return data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function getDatingProfile(id: string) {
    try {
        const { data } = await axiosInstance.get('api/v1/dating/' + id)

        return data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function createDatingProfile(user: { profile: UserProfile }) {
    try {
        const res = await axiosInstance.post('api/v1/dating', {
            profile: user.profile
        })

        return res.data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function deleteDatingProfile(id: string) {
    try {
        const { data } = await axiosInstance.delete('api/v1/dating/' + id)

        return data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function updateDatingProfile(user: { profile: UserProfile, id: string }) {
    try {
        const res = await axiosInstance.post('api/v1/dating/' + user.id, {
            profile: user.profile
        })

        return res.data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function sendLikeDating(user: { id: number }) {
    try {
        const res = await axiosInstance.post('api/v1/dating/like/' + user.id)

        return res.data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function sendDislikeDating(user: { id: number }) {
    try {
        const res = await axiosInstance.post('api/v1/dating/dislike/' + user.id)

        return res.data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function createDatingChat(user: { id: number }) {
    try {
        const res = await axiosInstance.post('api/v1/connection', {
            type: 9,
            partner_id: user.id
        })

        return res.data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}

export async function createSubscribeGold() {
    try {
        const res = await axiosInstance.post('api/v1/connection', {
            type: 512
        })

        return res.data
    } catch (error) {
        handleRequestError(error as AxiosError)
        throw error
    }
}
