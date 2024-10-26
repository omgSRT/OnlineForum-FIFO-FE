import { Button, Flex, Image, Typography } from 'antd';
import AmdSvg from '/public/amd.svg';
import { PlusOutlined } from '@ant-design/icons';

export const RecommendedItem = () => {
    return (
        <Flex align="flex-start" gap={10}>
            <Image
                style={{
                    borderRadius: 10,
                    width: 58,
                    height: 58,
                    objectFit: 'contain',
                    boxShadow: '0px 3px 4px 0px #FA89240F',
                }}
                src={AmdSvg}
                alt="creator"
                preview={false}
            />

            <Flex gap={10}>
                <Flex vertical style={{ minWidth: 94 }}>
                    <Typography.Text>AMD</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        @AMD
                    </Typography.Text>
                </Flex>

                <Button type="primary" size="small">
                    <PlusOutlined style={{ fontSize: 12 }} />
                    Follow
                </Button>
            </Flex>
        </Flex>
    );
};
