import { Button, Card, Checkbox, Dropdown, Flex, Form, FormListFieldData, Image, Modal, Typography } from 'antd';
import { UserInfo } from '../user/user-info';
import { PostTag } from './post-tag';
import {
    BarChartOutlined,
    CommentOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    EyeInvisibleOutlined,
    GlobalOutlined,
    KeyOutlined,
    LikeOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { IconButton } from './icon-button';
import { useDispatch } from 'react-redux';
import { setPost } from '@/stores/post';
import { useDeletePost } from '@/hooks/mutate/post/use-delete-post';
import { Post } from '@/types/post/post';
import { FC } from 'react';
import dayjsConfig from '@/utils/dayjs';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from '@/consts/factory/post';
import { useMessage } from '@/hooks/use-message';

const { confirm } = Modal;

interface PostItemProps {
    data: Post;
    showActions?: boolean;
    showCheckbox?: boolean;
    field?: FormListFieldData;
}

export const PostItem: FC<PostItemProps> = ({ data, showActions = true, showCheckbox = false, field }) => {
    const { title, content, createdDate, imageList, tag, postId } = data;

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { success } = useMessage();

    const [searchParams] = useSearchParams();

    const { mutate: deletePost, isPending: isPendingDeletePost } = useDeletePost(postId, {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: postKeys.listing(),
            });
            success('Post deleted successfully!');
        },
    });

    const handleUpdate = () => {
        dispatch(setPost({ modal: { open: true, type: 'update' }, id: postId }));
    };

    const handleDelete = () => {
        confirm({
            title: 'Are you sure you want to delete this post?',
            content: 'This action cannot be undone',
            onOk() {
                deletePost();
            },
            okButtonProps: {
                disabled: isPendingDeletePost,
            },
        });
    };

    return (
        <Card>
            <Flex vertical gap={8}>
                <Flex justify="space-between" align="flex-start">
                    <Flex align="center" gap={8}>
                        <UserInfo />
                        {tag && (
                            <PostTag backgroundColor={tag?.backgroundColorHex} textColor={tag?.textColorHex}>
                                {tag?.name}
                            </PostTag>
                        )}
                    </Flex>
                    {showActions && (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        icon: <GlobalOutlined />,
                                        label: <span>Public</span>,
                                        children: [
                                            {
                                                key: '1.1',
                                                icon: <GlobalOutlined />,
                                                label: <span>Public</span>,
                                            },
                                            {
                                                key: '1.2',
                                                icon: <KeyOutlined />,
                                                label: <span>Private</span>,
                                            },
                                            {
                                                key: '1.3',
                                                icon: <EyeInvisibleOutlined />,
                                                label: <span>Hide</span>,
                                            },
                                        ],
                                    },
                                    {
                                        key: '2',
                                        icon: <DeleteOutlined />,
                                        label: <span>Delete post</span>,
                                        onClick: handleDelete,
                                    },
                                    {
                                        key: '3',
                                        icon: <EditOutlined />,
                                        label: <span>Edit post</span>,
                                        onClick: handleUpdate,
                                    },
                                ],
                            }}
                        >
                            <Button type="text" icon={<EllipsisOutlined style={{ fontSize: 20 }} />} />
                        </Dropdown>
                    )}
                    {showCheckbox && field && (
                        <Form.Item name={[field.name, 'checked']} valuePropName="checked">
                            <Checkbox />
                        </Form.Item>
                    )}
                </Flex>

                <Typography.Title
                    level={4}
                    style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}
                >
                    {title}
                </Typography.Title>

                <Typography.Paragraph
                    ellipsis={{
                        rows: 8,
                        expandable: true,
                        symbol: <Button type="link">more</Button>,
                    }}
                >
                    {content}
                </Typography.Paragraph>

                <Flex gap={10} wrap>
                    {imageList?.map(file => (
                        <div className="ant-upload" key={file.imageId}>
                            <Image src={file.url} alt={file.url} width={200} height={200} />
                        </div>
                    ))}
                </Flex>

                <Typography.Text type="secondary">Posted {dayjsConfig(createdDate).fromNow()}</Typography.Text>

                <Flex justify="end" gap={20}>
                    <IconButton icon={<LikeOutlined />} children="Like" />
                    <IconButton icon={<CommentOutlined />} children="Comment" />
                    <IconButton icon={<BarChartOutlined />} children="1.9M" />
                    <IconButton icon={<ShareAltOutlined />} children="Share" />
                </Flex>
            </Flex>
        </Card>
    );
};
