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

export const useGetAirdrop = (slug: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['airdrops', slug, appConfig.version],
    queryFn: () => getAirdrop(slug!),
    enabled,
    refetchIntervalInBackground: true,
    staleTime: 0,
    refetchInterval: 15_000,
  });
};

export const useGetAirdropPost = (id: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['airdrop-post', id, appConfig.version],
    queryFn: () => getAirdropPost(id),
    enabled,
    refetchIntervalInBackground: true,
    staleTime: 0,
    refetchInterval: 15_000,
  });
};

export const useGetAirdropPosts = () => {
  return useQuery({
    queryKey: ['airdrop-posts', appConfig.version],
    queryFn: () => getAirdropPosts(),
    enabled: true,
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

export function mutationCreateAirdropPost() {
  return useMutation({
    mutationKey: ['create-airdrop-post'],
    mutationFn: (obj: object) => createAirdropPost(obj),
    onSuccess: () => {
    },
  });
}


export function mutationUpdateAirdrop() {
  return useMutation({
    mutationKey: ['update-airdrop'],
    mutationFn: ({ slug, obj }: { slug: string; obj: object }) => updateAirdrop(obj, slug),
    onSuccess: () => {
    },
  });
}

export const useDeleteAirdrop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAirdrop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airdrops'] });
    },
  });
};

export const useDeleteAirdropPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAirdropPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['airdrop-posts'] });
    },
  });
};
