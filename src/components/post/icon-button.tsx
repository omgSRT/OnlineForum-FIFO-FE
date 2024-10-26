import { Button, Space } from 'antd';
import { FC } from 'react';

interface IconButtonProps {
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({ icon, children }) => {
    return (
        <Button type="text" size="small">
            <Space align="center">
                {icon}
                {children}
            </Space>
        </Button>
    );
};
