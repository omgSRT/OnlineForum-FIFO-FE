import { apiSignIn } from "@/apis/auth.api";
import { LocalStorageKeys } from "@/consts/local-storage";
import { setAccountState } from "@/stores/account";
import { SignInRequest } from "@/types/auth";
import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useSignIn = (options: UseMutationOptions<boolean, DefaultError, SignInRequest> = {}) => {
    const dispatch = useDispatch()

    const signIn = async (payload: SignInRequest) => {
        const { username } = payload;

        const response = await apiSignIn(payload);

        if (response.success && response.entity) {
            const entity = response.entity;

            localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN_KEY, entity.token);
            localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN_KEY, entity.refreshToken);
            localStorage.setItem(LocalStorageKeys.USERNAME_KEY, username);

            dispatch(
                setAccountState({
                    logged: true,
                }),
            );

            return true;
        }

        return false;
    };

    return useMutation<boolean, DefaultError, SignInRequest>({
        mutationKey: ['auth', 'signin'],
        mutationFn: signIn,
        ...options,
    });
} 