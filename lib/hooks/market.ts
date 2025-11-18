import { appConfig } from "@/config/app";
import { useQuery } from "@tanstack/react-query";
import { getPriceBinance } from "../api/market/binance";
import { getPriceBybit } from "../api/market/bybit";
import { getPriceKucoin } from "../api/market/kucoin";
import { getPriceHuobi } from "../api/market/huobi";
import { getPriceOkx } from "../api/market/okx";

export const useGetPriceBinance = () => {
    return useQuery({
        queryKey: ['price-binance', appConfig.version],
        queryFn: () => getPriceBinance(),
        enabled: true,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 60 * 1000,
    });
};

export const useGetPriceBybit = () => {
    return useQuery({
        queryKey: ['price-bybit', appConfig.version],
        queryFn: () => getPriceBybit(),
        enabled: true,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 60 * 1000,
    });
};

export const useGetPriceKucoin = () => {
    return useQuery({
        queryKey: ['price-kucoin', appConfig.version],
        queryFn: () => getPriceKucoin(),
        enabled: true,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 60 * 1000,
    });
};

export const useGetPriceHuobi = () => {
    return useQuery({
        queryKey: ['price-huobi', appConfig.version],
        queryFn: () => getPriceHuobi(),
        enabled: true,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 60 * 1000,
    });
};

export const useGetPriceOkx = () => {
    return useQuery({
        queryKey: ['price-okx', appConfig.version],
        queryFn: () => getPriceOkx(),
        enabled: true,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 60 * 1000,
    });
};