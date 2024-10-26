import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { PaginationParams } from '@/types';
import { PostWrapper } from '../layout/post-wrapper';
import { PostItem } from '@/components/post/post-item';
import { PostStatus } from '@/types/post/post';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

export const HomePostList = () => {
    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const tagId = useSelector((state: RootState) => state.post.tagId)

    const { data } = usePostsListing({
        params: {
            ...initialParams,
            tagId
        },
    });

    if (!data || data.length === 0) {
        return <Empty />;
    }

    return (
        <PostWrapper>
            {data.map(post => (
                <PostItem data={post} key={post.postId} />
            ))}
        </PostWrapper>
    );
};
