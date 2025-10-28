import { callApi } from "@/lib/http";

export const getTag = async (identifier: string): Promise<any> => {
    const { data } = await callApi.get(`/tags/${identifier}`);
    return data;
};