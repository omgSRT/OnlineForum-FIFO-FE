import { themeConfig } from '@/consts/token';
import { useProfile } from '@/hooks/query/auth/use-profile';
import { useWallet } from '@/hooks/query/auth/use-wallet';
import { CardMenu } from '@/pages/home/components/card-menu';
import { EventList } from '@/pages/home/components/events-list';
import { PageMenu } from '@/pages/home/components/page-menu';
import { PopularMenu } from '@/pages/home/components/popular-menu';
import { RecommendedCreatorList } from '@/pages/home/components/recommended-creator-list';
import { ResourceMenu } from '@/pages/home/components/resource-menu';
import { EventsWrapper } from '@/pages/home/layout/events-wrapper';
import { MenuWrapper } from '@/pages/home/layout/menu-wrapper';
import { PageWrapper } from '@/pages/home/layout/page-wrapper';
import HeaderComponent from '@/pages/layout/header/header';
import { ConfigProvider, Layout } from 'antd';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children = <Outlet /> }) => {
    // load profile
    const { data: profileData, isLoading: isProfileLoading } = useProfile();
    const {data: walletData, isLoading: isWalletLoading} = useWallet();

    return (
        <ConfigProvider theme={themeConfig}>
            <Layout>
                <HeaderComponent
                    collapsed={false}
                    toggle={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                />

                <PageWrapper>
                    <MenuWrapper>
                        <CardMenu>
                            <PageMenu />
                        </CardMenu>

                        <CardMenu title="Popular Topic">
                            <PopularMenu />
                        </CardMenu>

                        <CardMenu title="Resource">
                            <ResourceMenu />
                        </CardMenu>
                    </MenuWrapper>

                    <div style={{ minWidth: 760 }}>{children}</div>

                    <EventsWrapper>
                        <EventList />

                        <RecommendedCreatorList />
                    </EventsWrapper>
                </PageWrapper>
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;
