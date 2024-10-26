import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/consts/common";
import { usePostsListing } from "@/hooks/query/post/use-posts-listing";
import { PaginationParams } from "@/types";
import { PostWrapper } from "../layout/post-wrapper";
import { PostItem } from "@/components/post/post-item";
import { Empty } from "antd";
import { PostStatus } from "@/types/post/post";

export const ExplorePostList = () => {
    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const { data } = usePostsListing({
        params: initialParams,
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
}
