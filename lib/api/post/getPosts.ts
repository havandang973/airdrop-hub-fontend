import { callApi } from "@/lib/http";

export const getPosts = async (params: {
    page?: number;
    size?: number;
    title?: string;
    category?: string;
    visibility?: number;
}) => {

    if (params.category && params.category !== 'all') {
        params.category = params.category;
    }

    const { data } = await callApi.get('/posts', { params });
    return data;
};