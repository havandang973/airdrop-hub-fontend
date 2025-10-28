import { callApi } from "@/lib/http";

export const deleteTag = async (id: number) => {
    const { data } = await callApi.delete(`/tags/${id}`);
    return data;
};
