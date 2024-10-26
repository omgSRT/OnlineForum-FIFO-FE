import { Avatar, Button, Flex, Image, Space, Typography } from 'antd';
import BackgroundPlaceholder from '/public/background-placeholder.svg';
import AvatarPlaceholder from '/public/avatar-placeholder.svg';

export const ProfileInfo = () => {
    return (
        <Flex vertical gap={92}>
            <div style={{ position: 'relative' }}>
                <Image
                    src={BackgroundPlaceholder}
                    alt="logo"
                    width="100%"
                    height={260}
                    style={{ objectFit: 'cover' }}
                />
                <Avatar
                    shape="circle"
                    size={136}
                    src={AvatarPlaceholder}
                    style={{ position: 'absolute', top: 200, left: 20 }}
                />

                <Button variant="outlined" style={{ position: 'absolute', top: 280, right: 20 }}>
                    Edit Profile
                </Button>
            </div>
            <Flex vertical gap={8}>
                <Typography.Title level={4}>John Doe</Typography.Title>
                <Typography.Text type="secondary">@johndoe</Typography.Text>
                <Typography.Text>#Beingnobody_goingnowhere.</Typography.Text>
                <Flex gap={24}>
                    <Space size="small">
                        <Typography.Text>100</Typography.Text>
                        <Typography.Text type="secondary">Followings</Typography.Text>
                    </Space>

                    <Space>
                        <Typography.Text>118</Typography.Text>
                        <Typography.Text type="secondary">Followers</Typography.Text>
                    </Space>
                </Flex>
            </Flex>
        </Flex>
    );
};
