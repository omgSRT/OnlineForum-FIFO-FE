import React, { FC, useState } from 'react';
import { OnAction, PaginationParams } from '@/types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { Button, Divider, Empty, Flex, Form, Modal } from 'antd';
import { PostItem } from '@/components/post/post-item';
import { PostStatus } from '@/types/post/post';
import { PostWrapper } from '@/pages/home/layout/post-wrapper';
import { sortBy } from 'lodash';
import { useCreateDraftPost } from '@/hooks/mutate/post/use-create-draft-post';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';

interface FormFieldValues {
    post: {
        postId: string;
        checked: boolean;
    };
}

interface DraftListProps {
    onCancel: OnAction;
}

const DraftList: FC<DraftListProps> = ({ onCancel }) => {
    const [form] = Form.useForm();

    const { type, open } = useSelector((state: RootState) => state.post.modal);

    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const [isSelectAll, setIsSelectAll] = useState(false);

    const { data } = usePostsListing({
        params: {
            ...initialParams,
            statuses: [PostStatus.DRAFT],
        },
    });
    const { mutate: createDraftPost, isPending: isPendingCreateDraftPost } = useCreateDraftPost();

    if (!data || data.length === 0) {
        return <Empty />;
    }

    const toggleSelectAll = () => {
        setIsSelectAll(prev => !prev);
    };

    const handleSelectAll = () => {
        toggleSelectAll();
        form.setFieldValue(
            'post',
            sortBy(data, 'createdDate').map(post => ({
                postId: post.postId,
                checked: true,
            })),
        );
    };

    const handleUnselectAll = () => {
        toggleSelectAll();
        form.setFieldValue(
            'post',
            sortBy(data, 'createdDate').map(post => ({
                postId: post.postId,
                checked: false,
            })),
        );
    };

    const onFinish = (values: FormFieldValues) => {
        console.log(values);
    };

    return (
        <Modal
            title={
                <Flex justify="space-between">
                    Drafts List
                    <Button htmlType="submit" form="draft">
                        Done
                    </Button>
                </Flex>
            }
            open={type === 'draft' && open}
            onCancel={onCancel}
            width={'80vw'}
            footer={null}
        >
            <PostWrapper>
                <Form<FormFieldValues>
                    name="draft"
                    form={form}
                    initialValues={{
                        post: sortBy(data, 'createdDate').map(post => ({
                            postId: post.postId,
                        })),
                    }}
                    onFinish={onFinish}
                >
                    <Form.List name="post">
                        {fields => (
                            <PostWrapper>
                                {fields.map((field, index) => (
                                    <PostItem
                                        data={data[index]}
                                        key={field.key}
                                        showActions={false}
                                        showCheckbox
                                        field={field}
                                    />
                                ))}
                            </PostWrapper>
                        )}
                    </Form.List>
                </Form>

                <Divider />

                <Flex justify="space-between">
                    {isSelectAll ? (
                        <Button size="large" type="link" onClick={handleUnselectAll}>
                            Unselect All
                        </Button>
                    ) : (
                        <Button size="large" type="link" onClick={handleSelectAll}>
                            Select All
                        </Button>
                    )}
                    <Button size="large" danger type="link">
                        Delete
                    </Button>
                </Flex>
            </PostWrapper>
        </Modal>
    );
};

export default DraftList;
