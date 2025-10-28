import { callApi } from "@/lib/http";

export const updateFund = async (body: any, id: number) => {
    const { data } = await callApi.put(`/funds/${id}`, body);
    return data;
};
