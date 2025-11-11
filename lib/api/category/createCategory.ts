import { callApi } from "@/lib/http";

export const createCategory = async (body: any) => {
  const { data } = await callApi.post(`/categories`, body);
  return data;
};
