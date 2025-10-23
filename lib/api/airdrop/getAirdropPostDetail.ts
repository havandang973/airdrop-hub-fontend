import { callApi } from "@/lib/http";

// export const getAirdropPost = async (id: number): Promise<any[]> => {
//     const { data } = await callApi.get(`/airdrop/${id}/posts`);
//     return data;
// };

export const getAirdropPostDetail = async (id: number): Promise<{ posts: any[] }> => {
    const { data } = await callApi.get(`/airdrop-posts/${id}`);
    return data;
};
