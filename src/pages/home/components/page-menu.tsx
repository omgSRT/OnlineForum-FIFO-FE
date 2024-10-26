import BaseMenu from '@/components/core/menu';
import Icon from '@ant-design/icons';
import { GetProp, MenuProps } from 'antd';
import HomeSvg from '/public/home.svg';
import BookMarkSvg from '/public/android.svg';
import ExploreSvg from '/public/explore.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PATHS } from '@/utils/paths';
import { RootState } from '@/stores';
import { setAccountState } from '@/stores/account';

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const PageMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedKeys = useSelector((state: RootState) => state.account.selectedKeys);

    const items: MenuItem[] = [
        {
            key: PATHS.HOME,
            icon: <Icon component={() => <img src={HomeSvg} alt="home" />} />,
            label: 'Home',
        },
        {
            key: 'bookmark',
            icon: <Icon component={() => <img src={BookMarkSvg} alt="bookmark" />} />,
            label: 'Bookmark',
        },
        {
            key: 'explore',
            icon: <Icon component={() => <img src={ExploreSvg} alt="explore" />} />,
            label: 'Explore',
        },
    ];

    const onChangeSelectedKey = (path: string) => {
        dispatch(setAccountState({ selectedKeys: [path] }));
    };

    const onMenuClick = (path: string) => {
        onChangeSelectedKey(path);
        navigate(path);
    };

    return (
        <>
            <BaseMenu items={items} selectedKeys={selectedKeys} onSelect={k => onMenuClick(k.key)} />
        </>
    );
};
