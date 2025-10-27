import { callApi } from "@/lib/http";

export const deleteCategory = async (id: number) => {
    const { data } = await callApi.delete(`/categories/${id}`);
    return data;
};
