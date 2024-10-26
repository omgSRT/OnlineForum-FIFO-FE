import axiosInstance, { request } from '@/apis/request';
import { categoryKeys } from '@/consts/factory/category';
import { PaginationParams, Response } from '@/types';
import { Category } from '@/types/category/category';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export type CategoryListingParams = PaginationParams;

type CategoryListingProps = {
    params: CategoryListingParams;
};

export const useCategoriesListing = ({ params }: CategoryListingProps) => {
    const fetchCategories = async (): Promise<Category[]> => {
        const {entity} = await request<Category[]>('get', '/category/getall', params, {
            paramsSerializer: {
                indexes: null,
            },
        });

        return entity
    };

    return useQuery<Category[]>({
        queryKey: categoryKeys.listing(params),
        queryFn: fetchCategories,
        placeholderData: keepPreviousData,
    });
};
