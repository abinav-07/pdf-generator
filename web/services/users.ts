import { AxiosResponse } from "axios"
import { API } from "../utils/Api"
import { ILoginForm } from "@/types"

export const createUser = async (values: any): Promise<AxiosResponse<any[]>> => {

    return await API.post(`/auth/register`, values)
}

export const loginUser = async (values: ILoginForm): Promise<AxiosResponse<any[]>> => {
    return await API.post(`/auth/login`, values)
}


// ADMIN SERIVCES
export const updateUserAdmin = async (values: any): Promise<AxiosResponse<any[]>> => {
    return await API.patch(`/admin/members/update`, values)
}

export const fetchUsers = async (): Promise<AxiosResponse<any[]>> => {
    return await API.get(`/admin/members`)
}
