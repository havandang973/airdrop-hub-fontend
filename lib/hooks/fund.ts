import { appConfig } from "@/config/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFund } from "../api/fund/getFund";
import { createFund } from "../api/fund/createFund";
import { updateFund } from "../api/fund/updateFund";
import { deleteFund } from "../api/fund/deleteFund";
import { getFunds } from "../api/fund/getFunds";

export const useGetFunds = (enabled?: boolean) => {
    return useQuery({
        queryKey: ['funds', appConfig.version],
        queryFn: getFunds,
        enabled: true,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

export const useGetFund = (identifier: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['fund', identifier, appConfig.version],
        queryFn: () => getFund(identifier!),
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

export function mutationCreateFund() {
    return useMutation({
        mutationKey: ['create-fund'],
        mutationFn: (obj: object) => createFund(obj),
        onSuccess: () => {
        },
    });
}

export function mutationUpdateFund() {
    return useMutation({
        mutationKey: ['update-fund'],
        mutationFn: ({ id, obj }: { id: number; obj: object }) => updateFund(obj, id),
        onSuccess: () => {
        },
    });
}

export const useDeleteFund = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteFund(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['funds'] });
        },
    });
};