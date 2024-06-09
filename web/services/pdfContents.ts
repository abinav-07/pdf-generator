import { AxiosResponse } from "axios";
import { API } from "../utils/Api";
import { ICreatePDF } from "@/types";

export const fetchPDFContents = async (): Promise<AxiosResponse<any>> => {
  return await API.get(`/admin/pdf/contents`);
};

export const createPDFContents = async (
  values: ICreatePDF,
): Promise<AxiosResponse<any>> => {
  return await API.post(`/admin/pdf/contents/create`, values, {
    responseType: "arraybuffer",
  });
};
