import axiosInstance from '@/apis/request';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useDeletePost = (
    postId: string,
    options: UseMutationOptions<unknown, AxiosError<unknown>> = {},
) => {
    const deletePost = async () => {
        const { data } = await axiosInstance.put(`/post/update/${postId}/status/hidden`);
    };

    return useMutation<unknown, AxiosError<unknown>>({
        mutationKey: ['post', 'delete', postId],
        mutationFn: deletePost,
        ...options,
    });
};
