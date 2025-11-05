import { callApi } from "@/lib/http";

export const getFund = async (identifier: string, filters?: any): Promise<{ airdrops: any[] }> => {
    const { data } = await callApi.get(`/funds/${identifier}`, { params: filters });
    return data;
};