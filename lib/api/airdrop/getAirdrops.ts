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

export const getAirdrops = async (params: {
  page?: number;
  size?: number;
  name?: string;
  status?: string;
  fund?: string;
  minRaise?: number;
  maxRaise?: number;
  startDate?: string;
  endDate?: string;
}) => {
  const { data } = await callApi.get("/airdrop", { params });
  return data;
};


