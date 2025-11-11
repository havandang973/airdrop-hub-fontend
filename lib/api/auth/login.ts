import { callApi } from "@/lib/http";

export const login = async (body: { email: string; password: string }) => {
    const { data } = await callApi.post(`/auth/login`, body);
    return data;
};
