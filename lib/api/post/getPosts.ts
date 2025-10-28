import { callApi } from "@/lib/http";

export const getPosts = async (category?: string): Promise<any[]> => {
    const { data } = await callApi.get('/posts?category=' + category);
    return data;
};
