import { callApi } from "@/lib/http";

export const getPosts = async (): Promise<any[]> => {
    const { data } = await callApi.get('/posts');
    return data;
};
