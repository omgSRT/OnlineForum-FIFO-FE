import { apiSignUp } from "@/apis/auth.api";
import { SignUpRequest } from "@/types/auth";
import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const useSignUp = (options: UseMutationOptions<boolean, DefaultError, SignUpRequest> = {}) => {
    const dispatch = useDispatch()

    const signIn = async (payload: SignUpRequest) => {
        const response = await apiSignUp(payload);
        if (response.success && response.entity) {
            return true;
        }

        return false;
    };

    return useMutation<boolean, DefaultError, SignUpRequest>({
        mutationKey: ['auth', 'signup'],
        mutationFn: signIn,
        ...options,
    });
} 