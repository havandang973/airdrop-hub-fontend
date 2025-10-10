import { appConfig } from "@/config/app";
import { useQuery } from "@tanstack/react-query";
import { getAirdrops } from "../api/airdrop/getAirdrops";


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

// export const useGetAccountLogs = (params: any, id?: string) => {
//   return useQuery({
//     queryKey: ['account-logs', params, appConfig.version],
//     queryFn: () => getAccountLogs(params, id),
//     enabled: true,
//     refetchIntervalInBackground: true,
//     staleTime: 15_000,
//     refetchInterval: 15_000,
//   });
// };

// export function mutationCreateSwapOrder() {
//   return useMutation({
//     mutationKey: ['create-swap-order'],
//     mutationFn: (obj: object) => createSwapOrder(obj),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['account-logs'] });
//       queryClient.invalidateQueries({ queryKey: ['swap-history'] });
//       queryClient.invalidateQueries({ queryKey: ['accounts'] });
//     },
//   });
// }
