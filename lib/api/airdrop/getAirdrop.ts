import { callApi } from "@/lib/http";

export interface IAccountWallet {
    id: number
    estimate: number
    balance: number
    symbol: string
    name: string
    logo: string
    freeBalance: number
}

export const getAirdrop = async (slug: string): Promise<any[]> => {
    const { data } = await callApi.get(`/airdrop/${slug}`);
    return data;
};