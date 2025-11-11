import { callApi } from "@/lib/http";

export const getCategory = async (identifier: string): Promise<any> => {
    const { data } = await callApi.get(`/categories/${identifier}`);
    return data;
};