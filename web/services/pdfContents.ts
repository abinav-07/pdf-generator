import { AxiosResponse } from "axios"
import { API } from "../utils/Api"

export const fetchPDFContents = async (): Promise<AxiosResponse<any>> => {
    return await API.get(`/admin/pdf/contents`)
}
