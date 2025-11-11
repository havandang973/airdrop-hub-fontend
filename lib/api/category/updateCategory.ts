import { callApi } from "@/lib/http";

export const updateCategory = async (body: any, id: number) => {
    const { data } = await callApi.put(`/categories/${id}`, body);
    return data;
};
