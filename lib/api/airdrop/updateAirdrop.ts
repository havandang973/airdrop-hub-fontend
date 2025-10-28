import { callApi } from "@/lib/http";

export const updateAirdrop = async (body: any, id: number) => {
    const { data } = await callApi.put(`/airdrop/${id}`, body);
    return data;
};
