import { callApi } from "@/lib/http";

export const deletePost = async (id: number) => {
    const { data } = await callApi.delete(`/posts/${id}`);
    return data;
};
