import { appConfig } from "@/config/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/post/getPosts";
import { getPost } from "../api/post/getPost";
import { createPost } from "../api/post/createPost";
import { updatePost } from "../api/post/updatePost";
import { deletePost } from "../api/post/deletePost";

// 🟩 Lấy danh sách tất cả bài viết
export const useGetPosts = (enabled = true, category?: string, visibility?: boolean) => {
    return useQuery({
        queryKey: ["posts", appConfig.version],
        queryFn: () => getPosts(category, visibility),
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

// 🟦 Lấy chi tiết 1 bài viết
export const useGetPost = (identifier: string, enabled = true) => {
    return useQuery({
        queryKey: ["post", identifier, appConfig.version],
        queryFn: () => getPost(identifier),
        enabled,
        refetchIntervalInBackground: true,
        staleTime: 0,
        refetchInterval: 15_000,
    });
};

// 🟨 Tạo bài viết
export const mutationCreatePost = () => {
    return useMutation({
        mutationKey: ["create-post"],
        mutationFn: (obj: object) => createPost(obj),
        onSuccess: () => { },
    });
};

// 🟧 Cập nhật bài viết
export const mutationUpdatePost = () => {
    return useMutation({
        mutationKey: ["update-post"],
        mutationFn: ({ id, obj }: { id: number; obj: object }) =>
            updatePost(obj, id),
        onSuccess: () => { },
    });
};

// 🟥 Xóa bài viết
export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deletePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
};
