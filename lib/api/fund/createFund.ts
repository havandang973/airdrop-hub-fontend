import { callApi } from "@/lib/http";

export const createFund = async (body: any) => {
  const { data } = await callApi.post(`/funds`, body);
  return data;
};
