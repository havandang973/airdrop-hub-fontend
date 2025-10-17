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

export const getAirdrops = async (): Promise<any[]> => {
  const { data } = await callApi.get("airdrop");
  return data;
};
