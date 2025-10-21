import { callApi } from "@/lib/http";

export const updateAirdrop = async (body: any, slug: string) => {
    const { data } = await callApi.put(`/airdrop/${slug}`, body);
    return data;
};
