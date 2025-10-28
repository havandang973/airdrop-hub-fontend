import { callApi } from "@/lib/http";

export const getFunds = async (): Promise<any[]> => {
    const { data } = await callApi.get('/funds');
    return data;
};
