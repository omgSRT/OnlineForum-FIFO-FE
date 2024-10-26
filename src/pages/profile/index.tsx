import { TabsProps } from 'antd';
import { ProfileInfo } from './components/profile-info';
import { BaseTab } from '@/components/core/tab';
import { PostItem } from '@/components/post/post-item';
import { Medias } from './components/medias';
import { PostStatus } from '@/types/post/post';
import { PostWrapper } from '../post/layout/post-wrapper';

const ProfilePage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Posts',
            children: (
                <PostWrapper>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <PostItem
                            data={{
                                postId: '1',
                                title: 'Title',
                                content: 'Content',
                                createdDate: '2021-09-01',
                                status: PostStatus.PUBLIC,
                                topic: {
                                    name: 'Topic',
                                    topicId: '1',
                                },
                                lastModifiedDate: '2021-09-01',
                            }}
                        />
                    ))}
                </PostWrapper>
            ),
        },
        {
            key: '2',
            label: 'Replies',
            children: <div></div>,
        },
        {
            key: '3',
            label: 'Media',
            children: <Medias />,
        },
    ];

    return (
        <div>
            <ProfileInfo />
            <BaseTab items={items} defaultActiveKey="1" />
        </div>
    );
};

export default ProfilePage;
