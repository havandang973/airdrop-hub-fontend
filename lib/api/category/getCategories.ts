import { callApi } from "@/lib/http";

export const getCategories = async (): Promise<any[]> => {
    const { data } = await callApi.get('/categories');
    return data;
};
