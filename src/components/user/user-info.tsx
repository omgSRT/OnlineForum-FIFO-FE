import { RootState } from '@/stores';
import { Avatar, Flex, Typography } from 'antd';
import { useSelector } from 'react-redux';

export const UserInfo = () => {
    const { accountInfo } = useSelector((state: RootState) => state.account);

    return (
        <Flex align="center">
            <Avatar size={40} shape="circle" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Flex vertical>
                <Typography.Text>{accountInfo?.username}</Typography.Text>
                <Typography.Text type="secondary">@{accountInfo?.username?.toLowerCase()}</Typography.Text>
            </Flex>
        </Flex>
    );
};
