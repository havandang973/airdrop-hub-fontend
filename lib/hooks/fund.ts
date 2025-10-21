import { appConfig } from "@/config/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAirdrops } from "../api/airdrop/getAirdrops";
import { createAirdrop } from "../api/airdrop/createAirdrop";
import { updateAirdrop } from "../api/airdrop/updateAirdrop";
import { deleteAirdrop } from "../api/airdrop/deleteAirdrop";
import { getAirdrop } from "../api/airdrop/getAirdrop";
import { getAirdropPost } from "../api/airdrop/getAirdropPost";
import { getAirdropPosts } from "../api/airdrop/getAirdropPosts";
import { createAirdropPost } from "../api/airdrop/createAirdropPost";
import { deleteAirdropPost } from "../api/airdrop/deleteAirdropPost";
import { getFund } from "../api/fund/getFund";

export const useGetAirdrops = (enabled?: boolean) => {
    return useQuery({
        queryKey: ['airdrops', appConfig.version],
        queryFn: getAirdrops,
        enabled: true,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

export const useGetFund = (slug: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['fund', slug, appConfig.version],
        queryFn: () => getFund(slug!),
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

export function mutationCreateAirdrop() {
    return useMutation({
        mutationKey: ['create-airdrop'],
        mutationFn: (obj: object) => createAirdrop(obj),
        onSuccess: () => {
        },
    });
}
