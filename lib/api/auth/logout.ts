import { callApi } from "@/lib/http";

export const logout = async () => {
    const { data } = await callApi.post(`/auth/logout`);
    return data;
};
