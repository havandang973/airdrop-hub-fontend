import { callApi } from "@/lib/http";

export const getPriceOkx = async () => {
    const { data } = await callApi.get("/market/price/okx");
    return data;
};