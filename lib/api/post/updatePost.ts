import { callApi } from "@/lib/http";

export const updatePost = async (body: any, id: number) => {
    const { data } = await callApi.put(`/posts/${id}`, body);
    return data;
};
