import BaseMenu from '@/components/core/menu';
import Icon from '@ant-design/icons';
import { GetProp, MenuProps } from 'antd';
import WarningSvg from '/public/warning.svg';
import QuestionMarkSvg from '/public/question-mark.svg';
import OpenBookSvg from '/public/open-book.svg';
import RewardSvg from '/public/reward.svg';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const ResourceMenu = () => {
    const items: MenuItem[] = [
        {
            key: '1',
            icon: <Icon component={() => <img src={WarningSvg} alt="warning" />} />,
            label: 'About',
        },
        {
            key: '2',
            icon: <Icon component={() => <img src={QuestionMarkSvg} alt="question-mark" />} />,
            label: 'Help',
        },
        {
            key: '3',
            icon: <Icon component={() => <img src={OpenBookSvg} alt="open-book" />} />,
            label: 'Content Policy',
        },
        {
            key: '4',
            icon: <Icon component={() => <img src={RewardSvg} alt="reward" />} />,
            label: 'Reward',
        },
    ];

    return (
        <>
            <BaseMenu items={items} />
        </>
    );
};
