import { callApi } from "@/lib/http";

export const getAirdropPosts = async (filter?: any): Promise<any> => {
    const { data } = await callApi.get(`/airdrop-posts`, { params: filter });
    return data;
};