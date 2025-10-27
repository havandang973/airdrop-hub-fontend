import { appConfig } from "@/config/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../api/category/getCategories";
import { getCategory } from "../api/category/getCategory";
import { createCategory } from "../api/category/createCategory";
import { updateCategory } from "../api/category/updateCategory";
import { deleteCategory } from "../api/category/deleteCategory";
// 🟢 Lấy tất cả category
export const useGetCategories = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ["categories", appConfig.version],
        queryFn: getCategories,
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

// 🟢 Lấy 1 category theo id hoặc slug
export const useGetCategory = (identifier: string, enabled: boolean) => {
    return useQuery({
        queryKey: ["category", identifier, appConfig.version],
        queryFn: () => getCategory(identifier),
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

// 🟢 Tạo category
export function mutationCreateCategory() {
    return useMutation({
        mutationKey: ["create-category"],
        mutationFn: (obj: object) => createCategory(obj),
        onSuccess: () => {
            // ✅ Có thể thêm message hoặc invalidate cache tại đây
        },
    });
}

// 🟡 Cập nhật category
export function mutationUpdateCategory() {
    return useMutation({
        mutationKey: ["update-category"],
        mutationFn: ({ id, obj }: { id: number; obj: object }) =>
            updateCategory(obj, id),
        onSuccess: () => {
            // ✅ Có thể thêm message hoặc invalidate cache tại đây
        },
    });
}

// 🔴 Xóa category
export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: () => {
            // ✅ Làm mới danh sách sau khi xóa
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
