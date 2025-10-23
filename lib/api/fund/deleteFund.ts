import { callApi } from "@/lib/http";

export const deleteFund = async (id: number) => {
    const { data } = await callApi.delete(`/funds/${id}`);
    return data;
};
