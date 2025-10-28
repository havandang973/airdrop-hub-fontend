import { appConfig } from "@/config/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTags } from "../api/tag/getTags";
import { getTag } from "../api/tag/getTag";
import { createTag } from "../api/tag/createTag";
import { updateTag } from "../api/tag/updateTag";
import { deleteTag } from "../api/tag/deleteTag";

// 🟢 Lấy tất cả tag
export const useGetTags = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ["tags", appConfig.version],
        queryFn: getTags,
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

// 🟢 Lấy 1 tag theo id hoặc slug
export const useGetTag = (identifier: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["tag", identifier, appConfig.version],
        queryFn: () => getTag(identifier),
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

// 🟢 Tạo tag
export function mutationCreateTag() {
    return useMutation({
        mutationKey: ["create-tag"],
        mutationFn: (obj: object) => createTag(obj),
        onSuccess: () => {

        },
    });
}

// 🟡 Cập nhật tag
export function mutationUpdateTag() {
    return useMutation({
        mutationKey: ["update-tag"],
        mutationFn: ({ id, obj }: { id: number; obj: object }) =>
            updateTag(obj, id),
        onSuccess: () => {

        },
    });
}

// 🔴 Xóa tag
export const useDeleteTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteTag(id),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["tags"] });
        },
    });
};
