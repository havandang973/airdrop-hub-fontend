import { callApi } from '@/lib/http';

export const createAirdropPost = async (body: any) => {
  const { data } = await callApi.post(`/airdrop-posts`, body);
  return data;
};
