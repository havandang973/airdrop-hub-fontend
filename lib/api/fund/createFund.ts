import { callApi } from "@/lib/http";

export const createAirdrop = async (body: any) => {
  const { data } = await callApi.post(`/airdrop`, body);
  return data;
};
