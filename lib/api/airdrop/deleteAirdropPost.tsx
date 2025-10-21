import { callApi } from '@/lib/http';

export const deleteAirdropPost = async (id: number) => {
  const { data } = await callApi.delete(`/airdrop-posts/${id}`);
  return data;
};
