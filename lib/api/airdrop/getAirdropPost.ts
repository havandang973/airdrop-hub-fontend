import { callApi } from "@/lib/http";

// export const getAirdropPost = async (id: number): Promise<any[]> => {
//     const { data } = await callApi.get(`/airdrop/${id}/posts`);
//     return data;
// };

export const getAirdropPost = async (id: number): Promise<{ posts: any[] }> => {
    const { data } = await callApi.get(`/airdrop/${id}/posts`);
    return data;
};
