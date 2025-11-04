import { callApi } from "@/lib/http";

export const getPosts = async (category?: string, visibility?: boolean): Promise<any[]> => {
    const params: Record<string, any> = {};

    if (category && category !== 'all') {
        params.category = category;
    }

    if (visibility !== undefined) {
        params.visibility = visibility;
    }

    const { data } = await callApi.get('/posts', { params });
    return data;
};
