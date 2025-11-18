import { callApi } from "@/lib/http";

export const getPriceHuobi = async () => {
    const { data } = await callApi.get("/market/price/huobi");
    return data;
};