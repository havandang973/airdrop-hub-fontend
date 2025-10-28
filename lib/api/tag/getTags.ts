import { callApi } from "@/lib/http";

export const getTags = async (): Promise<any[]> => {
    const { data } = await callApi.get('/tags');
    return data;
};
