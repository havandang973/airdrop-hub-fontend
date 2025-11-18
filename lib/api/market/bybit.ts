import { callApi } from "@/lib/http";

export const getPriceBybit = async () => {
    const { data } = await callApi.get("/market/price/bybit");
    return data;
};

