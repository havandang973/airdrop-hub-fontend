import { callApi } from "@/lib/http";

export const getAirdropPosts = async (): Promise<any[]> => {
    const { data } = await callApi.get(`/airdrop-posts`);
    return data;
};