import { callApi } from "@/lib/http";

export const updateTag = async (body: any, id: number) => {
    const { data } = await callApi.put(`/tags/${id}`, body);
    return data;
};
