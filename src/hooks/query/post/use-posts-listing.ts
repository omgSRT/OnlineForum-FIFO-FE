import axiosInstance, { request } from '@/apis/request';
import { postKeys } from '@/consts/factory/post';
import { PaginationParams, Response } from '@/types';
import { Post, PostStatus } from '@/types/post/post';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type PostListingParams = PaginationParams & {
    topicId?: string;
    tagId?: string;
    statuses?: PostStatus[];
};

type PostListingProps = {
    params: PostListingParams;
};

export const usePostsListing = ({ params }: PostListingProps) => {
    const fetchPosts = async (): Promise<Post[]> => {
        const { entity } = await request<Post[]>('get', '/post/getall', params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity;
    };

    return useQuery<Post[]>({
        queryKey: postKeys.listing(params),
        queryFn: fetchPosts,
        placeholderData: keepPreviousData,
    });
};
