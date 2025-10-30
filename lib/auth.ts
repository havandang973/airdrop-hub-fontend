import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { callApi } from "@/lib/http";
import { login } from "./api/auth/login";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (body: { email: string; password: string }) => login(body),
        onSuccess: async () => {
            // ✅ Sau khi login thành công, refetch lại thông tin user
            await queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            await callApi.post("/auth/logout");
        },
        onSuccess: () => {
            queryClient.setQueryData(["me"], null);
        },
    });
};

export const useMe = (enabled = true) => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const { data } = await callApi.get("/auth/me");
            return data;
        },
        enabled,
    });
};
