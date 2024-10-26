import { FC } from 'react';
import { Empty, Spin } from 'antd';
import { CategoryListingParams, useCategoriesListing } from '@/hooks/query/category/use-category-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { PostSummary } from './components/post-summary';
import { PostWrapper } from './layout/post-wrapper';

const initialParams : CategoryListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE
}

const HomePage: FC = props => {
    const { data, isLoading } = useCategoriesListing({ params: initialParams });

    if (!data || data.length === 0) {
        return <Empty />;
    }

    return (
        <Spin spinning={isLoading}>
            <PostWrapper>
                {data.map(category => (
                    <PostSummary key={category.categoryId} data={category} />
                ))}
            </PostWrapper>
        </Spin>
    );
};

export default HomePage;
