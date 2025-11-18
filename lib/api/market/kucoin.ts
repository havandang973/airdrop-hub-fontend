import { callApi } from "@/lib/http";

export const getPriceKucoin = async () => {
    const { data } = await callApi.get("/market/price/kucoin");
    return data;
};