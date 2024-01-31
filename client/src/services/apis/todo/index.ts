import axios from "axios"
import { createUser } from "../../../interfaces/createUser.interface"
import { updateUser } from "../../../interfaces/updateUser.interface"

export const todoApi = {
    create: async (data: createUser) => {
        return await axios.post(`${import.meta.env.VITE_SV_HOST}/todo`, data)
    },
    update: async (userId: number, data: updateUser) => {
        return await axios.put(`${import.meta.env.VITE_SV_HOST}/todo/${userId}`, data)
    },
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SV_HOST}/todo`)
    },
    delete: async (userId: number) => {
        return await axios.delete(`${import.meta.env.VITE_SV_HOST}/todo/${userId}`)
    }
}