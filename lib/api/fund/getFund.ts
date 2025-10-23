import { callApi } from "@/lib/http";

export const getFund = async (identifier: string): Promise<{ airdrops: any[] }> => {
    const { data } = await callApi.get(`/funds/${identifier}`);
    return data;
};