import { callApi } from "@/lib/http";

export const getPost = async (identifier: string): Promise<{ airdrops: any[] }> => {
    const { data } = await callApi.get(`/posts/${identifier}`);
    return data;
};