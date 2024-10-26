import { UserInfo } from '@/components/user/user-info';
import {
    Button,
    Card,
    Flex,
    Form,
    Input,
    message,
    Select,
    Space,
    Upload,
    UploadFile,
    UploadProps,
    Image,
    Modal,
    GetProp,
} from 'antd';
import GallerySvg from '/public/gallery.svg';
import EmojiSvg from '/public/emoji.svg';
import { OnAction } from '@/types';
import { FC, useEffect, useState } from 'react';
import { useCreatePost } from '@/hooks/mutate/post/use-create-post';
import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from '@/consts/factory/post';
import { CreatePostPayload } from '@/types/post/post';
import { useMessage } from '@/hooks/use-message';
import { useCreateDraftPost } from '@/hooks/mutate/post/use-create-draft-post';
import { useSearchParams } from 'react-router-dom';
import { useUploadFile } from '@/hooks/use-upload-file';
import { TopicListingParams, useTopicsListing } from '@/hooks/query/topic/use-topics-listing';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { useTagsListing } from '@/hooks/query/tag/use-tags-listing';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { useDispatch } from 'react-redux';
import { setPost } from '@/stores/post';

interface CreatePostProps {
    onCancel: OnAction;
}

const initialParams: TopicListingParams = {
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PAGE_SIZE,
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

export const CreatePost: FC<CreatePostProps> = ({ onCancel }) => {
    const [form] = Form.useForm();

    const { type, open } = useSelector((state: RootState) => state.post.modal);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const { success } = useMessage();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const { imgUrl, imgUrlList, setImgUrlList, uploadFile } = useUploadFile();

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const { data: topics, isLoading: isLoadingTopics } = useTopicsListing({ params: initialParams });
    const { data: tags, isLoading: isLoadingTags } = useTagsListing({ params: initialParams });
    const { mutate: createPost, isPending: isPendingCreatePost } = useCreatePost();
    const { mutate: createDraftPost, isPending: isPendingCreateDraftPost } = useCreateDraftPost();

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const onFinish = (values: CreatePostPayload) => {
        createPost(
            {
                ...values,
                ...(fileList.length > 0 && {
                    imageUrlList: fileList.map(file => ({
                        url: file.url as string,
                    })),
                }),
            },
            {
                onSuccess: () => {
                    success('Post created successfully!');
                    queryClient.invalidateQueries({
                        queryKey: postKeys.listing(),
                    });
                    onCancel && onCancel();
                    form.resetFields();
                    setImgUrlList([]);
                },
                onError: error => {
                    message.error(error.message);
                },
            },
        );
    };

    const handleSaveDraft = () => {
        if (!form.getFieldValue('title')) {
            onCancel && onCancel();
            form.resetFields();
            return;
        }

        createDraftPost(
            {
                ...form.getFieldsValue(),
                ...(fileList.length > 0 && {
                    imageUrlList: fileList.map(file => ({
                        url: file.url as string,
                    })),
                }),
            },
            {
                onSuccess: () => {
                    success('Post saved as draft successfully!');
                    queryClient.invalidateQueries({
                        queryKey: postKeys.listing(),
                    });
                    onCancel && onCancel();
                    form.resetFields();
                },
                onError: error => {
                    message.error(error.message);
                },
            },
        );
    };

    const onChangeFile: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onRemoveFile = (file: UploadFile) => {
        const index = fileList.indexOf(file);
        if (index > -1) {
            const newImgUrlList = imgUrlList.slice();
            newImgUrlList.splice(index, 1);
            setImgUrlList(newImgUrlList);
            setFileList(fileList.filter(item => item.uid !== file.uid));
        }
    };

    useEffect(() => {
        const appendFieldFileList = fileList.map((file, index) => {
            return {
                ...file,
                url: imgUrlList[index],
            };
        });
        setFileList(appendFieldFileList);
    }, [imgUrlList]);

    const handleCloseModal = () => {
        handleSaveDraft();
    };

    const handleOpenDraft = () => {
        dispatch(setPost({ modal: { open: true, type: 'draft' } }));
    };

    return (
        <Modal
            title={
                <Flex justify="space-between">
                    Create Post
                    <Button onClick={handleOpenDraft}>Drafts</Button>
                </Flex>
            }
            open={type === 'create' && open}
            onCancel={handleCloseModal}
            footer={null}
            width={'80vw'}
        >
            <Card>
                <Flex vertical gap={10}>
                    <UserInfo />

                    <Form<CreatePostPayload> layout="vertical" form={form} name="createPost" onFinish={onFinish}>
                        <Form.Item<CreatePostPayload>
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please enter post title!' }]}
                        >
                            <Input size="large" placeholder="Post title goes here..." />
                        </Form.Item>

                        <Form.Item<CreatePostPayload>
                            name="topicId"
                            label="Topic"
                            rules={[{ required: true, message: 'Please select a topic!' }]}
                        >
                            <Select
                                size="large"
                                loading={isLoadingTopics}
                                placeholder="Select a topic"
                                options={topics?.map(topic => ({
                                    label: topic.name,
                                    value: topic.topicId,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item<CreatePostPayload>
                            name="tagId"
                            label="Tags"
                            rules={[{ required: true, message: 'Please select a tag!' }]}
                        >
                            <Select
                                size="large"
                                loading={isLoadingTags}
                                placeholder="Select tags"
                                options={tags?.map(tag => ({
                                    label: tag.name,
                                    value: tag.tagId,
                                }))}
                            />
                        </Form.Item>

                        <Form.Item<CreatePostPayload>
                            name="content"
                            label="Description"
                            rules={[{ required: true, message: 'Please add some description!' }]}
                        >
                            <Input.TextArea
                                size="large"
                                rows={5}
                                placeholder="Let's share what going on your mind..."
                            />
                        </Form.Item>
                    </Form>

                    <Flex gap={10} wrap>
                        <Upload listType="picture-card" fileList={fileList} onRemove={onRemoveFile} />
                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: visible => setPreviewOpen(visible),
                                    afterOpenChange: visible => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Flex>

                    <Flex align="center" justify="space-between">
                        <Space size="large">
                            <Upload
                                accept="image/*"
                                customRequest={uploadFile}
                                onChange={onChangeFile}
                                onRemove={onRemoveFile}
                                showUploadList={false}
                                fileList={fileList}
                            >
                                <Button type="text" icon={<img src={GallerySvg} />} />
                            </Upload>
                            <Button type="text" icon={<img src={EmojiSvg} />} />
                        </Space>

                        <Button
                            disabled={isPendingCreateDraftPost}
                            loading={isPendingCreatePost}
                            form="createPost"
                            type="primary"
                            htmlType="submit"
                        >
                            Post
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        </Modal>
    );
};
