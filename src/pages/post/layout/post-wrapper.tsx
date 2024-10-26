import { SecondaryButton } from '@/components/core/secondary-button';
import { Avatar, Breadcrumb, Button, Card, Divider, Dropdown, Flex, Input, Modal, Space, Tag } from 'antd';
import React, { FC, useState } from 'react';
import { CreatePost } from '../components/create-post';
import { CaretDownFilled, RightOutlined } from '@ant-design/icons';
import { TagListingParams, useTagsListing } from '@/hooks/query/tag/use-tags-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PostModalType, setPost } from '@/stores/post';
import { RootState } from '@/stores';
import TagXSvg from '/public/tag-x.svg';
import { Link, useNavigate } from 'react-router-dom';
import { UpdatePost } from '../components/update-post';
import DraftList from '../components/draft-list';

interface PostWrapperProps {
    children: React.ReactNode;
}

const initialParams: TagListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

export const PostWrapper: FC<PostWrapperProps> = ({ children }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { type, open } = useSelector((state: RootState) => state.post.modal);

    const [history, setHistory] = useState<string>('');
    const [openDraft, setOpenDraft] = useState<boolean>(false);

    const { data: tagsData, isLoading: loadingTags } = useTagsListing({ params: initialParams });
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return {
            path: url,
            breadcrumbName: (
                <Link to={url} onClick={() => setHistory(location.pathname)}>
                    {url.split('/').splice(-1)?.[0]}
                </Link>
            ),
        };
    });

    const breadcrumbItems = [
        {
            ...(location.pathname.split('/').length > 1 && {
                path: '-1',
                breadcrumbName: (
                    <Button
                        size="small"
                        type="text"
                        icon={<img src={TagXSvg} alt="tag-x" />}
                        onClick={() => {
                            setHistory(location.pathname);
                            navigate(-1);
                        }}
                    />
                ),
            }),
        },
        ...extraBreadcrumbItems,
        {
            ...(location.pathname.length < history.length &&
                history.includes(location.pathname) && {
                    path: '1',
                    breadcrumbName: <RightOutlined onClick={() => navigate(history)} />,
                }),
        },
    ];

    const handleCancel = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: false, type } }));
    };

    const handleOpen = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: true, type } }));
    };

    const handleSelectTag = (id: string | undefined) => {
        dispatch(setPost({ tagId: id }));
    };

    const handleOpenDraft = () => {
        setOpenDraft(true);
    };

    return (
        <Flex vertical gap={10}>
            <Card>
                <Breadcrumb>
                    {breadcrumbItems.map(item => (
                        <React.Fragment key={item.path}>
                            <Breadcrumb.Item>{item.breadcrumbName}</Breadcrumb.Item>
                        </React.Fragment>
                    ))}
                </Breadcrumb>

                <Divider />

                <Flex gap={10} style={{ width: '100%' }} align="center">
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: (
                                        <Space align="center">
                                            <Tag
                                                style={{
                                                    minHeight: 32,
                                                    minWidth: 100,
                                                    fontSize: 14,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                All
                                            </Tag>
                                        </Space>
                                    ),
                                    onClick: () => handleSelectTag(undefined),
                                },
                                ...(tagsData?.map(tag => ({
                                    key: tag.tagId,
                                    label: (
                                        <Space align="center">
                                            <Tag
                                                style={{
                                                    minHeight: 32,
                                                    minWidth: 100,
                                                    fontSize: 14,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: tag.backgroundColorHex,
                                                    color: tag.textColorHex,
                                                }}
                                            >
                                                {tag.name}
                                            </Tag>
                                        </Space>
                                    ),
                                    onClick: () => handleSelectTag(tag.tagId),
                                })) || []),
                            ],
                        }}
                    >
                        <SecondaryButton icon={<CaretDownFilled />} loading={loadingTags}>
                            Tags
                        </SecondaryButton>
                    </Dropdown>
                    <Flex gap={6} flex={1} align="center">
                        <Avatar
                            size={48}
                            shape="circle"
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        />
                        <Input
                            size="large"
                            placeholder="Let's share what going on your mind..."
                            onClick={() => handleOpen('create')}
                            readOnly
                        />
                        <SecondaryButton onClick={() => handleOpen('create')}>Create Post</SecondaryButton>
                    </Flex>
                </Flex>
            </Card>

            <Divider />

            <Flex vertical gap={20}>
                {children}
            </Flex>

            <CreatePost onCancel={() => handleCancel('create')} />

            <UpdatePost onCancel={() => handleCancel('update')} />

            <DraftList onCancel={() => handleCancel('draft')} />

            <Modal
                title={
                    <Flex justify="space-between">
                        Drafts List
                        <Button htmlType="submit" form="draft">
                            Done
                        </Button>
                    </Flex>
                }
                open={openDraft}
                onCancel={() => setOpenDraft(false)}
                width={'80vw'}
                footer={null}
            ></Modal>
        </Flex>
    );
};
