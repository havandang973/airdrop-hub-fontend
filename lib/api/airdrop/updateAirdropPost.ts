import { callApi } from "@/lib/http";

export const updateAirdropPost = async (body: any, id: number) => {
    const { data } = await callApi.put(`/airdrop-posts/${id}`, body);
    return data;
};
