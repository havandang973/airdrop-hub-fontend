import { callApi } from "@/lib/http";

export const createPost = async (body: any) => {
  const { data } = await callApi.post(`/posts`, body);
  return data;
};
