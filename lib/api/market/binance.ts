import { callApi } from "@/lib/http";

export const getPriceBinance = async () => {
    const { data } = await callApi.get("/market/price/binance");
    return data;
};


