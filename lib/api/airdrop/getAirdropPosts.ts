import { callApi } from "@/lib/http";

export const getAirdropPosts = async (page?: number, size?: number): Promise<any> => {
    const { data } = await callApi.get(`/airdrop-posts`, { params: { page, size } });
    return data;
};