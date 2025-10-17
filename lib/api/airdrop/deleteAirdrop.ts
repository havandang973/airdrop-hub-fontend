import { callApi } from "@/lib/http";

export const deleteAirdrop = async (id: number) => {
    const { data } = await callApi.delete(`/airdrop/${id}`);
    return data;
};
