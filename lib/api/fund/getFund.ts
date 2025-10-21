import { callApi } from "@/lib/http";

export const getFund = async (slug: string): Promise<{ airdrops: any[] }> => {
    const { data } = await callApi.get(`/funds/${slug}`);
    return data;
};