import BaseMenu from '@/components/core/menu';
import Icon from '@ant-design/icons';
import { Flex, GetProp, MenuProps, Typography } from 'antd';
import AppleSvg from '/public/apple.svg';
import AndroidSvg from '/public/android.svg';
import ChatbotSvg from '/public/chatbot.svg';
import ToolKitSvg from '/public/toolkit.svg';
import { FC } from 'react';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const PopularMenu = () => {
    const items: MenuItem[] = [
        {
            key: '1',
            icon: <Icon component={() => <img src={AppleSvg} alt="apple" />} />,
            label: <Label label="JavaScript" subLabel="82,645 Posted by this tag" />,
        },
        {
            key: '2',
            icon: <Icon component={() => <img src={AndroidSvg} alt="android" />} />,
            label: <Label label="HTML/CSS" subLabel="65,523 Posted • Trending" />,
        },
        {
            key: '3',
            icon: <Icon component={() => <img src={ChatbotSvg} alt="chatbot" />} />,
            label: <Label label="Python" subLabel="65,523 Posted • Trending" />,
        },
        {
            key: '4',
            icon: <Icon component={() => <img src={ToolKitSvg} alt="chatbot" />} />,
            label: <Label label="NodeJS" subLabel="51,354 • Trending in Bangladesh" />,
        },
    ];

    return (
        <>
            <BaseMenu items={items} />
        </>
    );
};

interface LabelProps {
    label: string;
    subLabel: string;
}

const Label: FC<LabelProps> = ({ label, subLabel }) => {
    return (
        <Flex vertical justify="space-between">
            <Typography.Text strong>{label}</Typography.Text>
            <Typography.Text
                style={{
                    fontSize: 10,
                }}
                type="secondary"
                ellipsis
            >
                {subLabel}
            </Typography.Text>
        </Flex>
    );
};
