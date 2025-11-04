import { callApi } from "@/lib/http";

export const getMe = async () => {
    const { data } = await callApi.get(`/auth/me`);
    return data;
};
