import { callApi } from "@/lib/http";

export const createTag = async (body: any) => {
  const { data } = await callApi.post(`/tags`, body);
  return data;
};
