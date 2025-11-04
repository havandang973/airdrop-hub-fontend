import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { callApi } from "@/lib/http";
import { login } from "./api/auth/login";
import { logout } from "./api/auth/logout";
import { getMe } from "./api/auth/getMe";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (body: { email: string; password: string }) => login(body),
        onSuccess: async () => {
            // ✅ Sau khi login thành công, refetch lại thông tin user
            await queryClient.refetchQueries({ queryKey: ["me"] });
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: () => logout(),
    });
};

export const useMe = (enabled = true) => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => getMe(),
        enabled,
    });
};
