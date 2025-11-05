import { callApi } from "@/lib/http";

export const getFunds = async (params: {
    page?: number;
    size?: number;
    name?: string;
    status?: string;
    minRaise?: number;
    maxRaise?: number;
    startDate?: string;
    endDate?: string;
}) => {
    const { data } = await callApi.get('/funds', { params });
    return data;
};


