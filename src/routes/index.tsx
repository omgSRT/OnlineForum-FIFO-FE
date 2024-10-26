import { lazy, type FC } from 'react';
import type { RouteObject } from 'react-router';

import { historyNavigation } from '@/utils/common';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import WrapperRouteComponent from './config';
import { PATHS } from '@/utils/paths';
import MainLayout from '@/layout/main-layout';
import { RootState } from '@/stores';
import { title } from 'process';

const SignInPage = lazy(() => import('@/pages/auth/signin'));
const SignUpPage = lazy(() => import('@/pages/auth/signup'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const CreateNewPasswordPage = lazy(() => import('@/pages/auth/create-new-password'));
const OTPVerificationPage = lazy(() => import('@/pages/auth/otp'));
const HomePage = lazy(() => import('@/pages/home'));
const PostPage = lazy(() => import('@/pages/post'));
const ProfilePage = lazy(() => import('@/pages/profile'));
const NotFoundPage = lazy(() => import('@/pages/404'));
const WalletPage = lazy(() => import('@/pages/wallet'))
const NotificationPage = lazy(() => import('@/pages/notification'))

const routes: RouteObject[] = [
    {
        path: PATHS.HOME,
        element: <WrapperRouteComponent element={<MainLayout />} title="" />,
        children: [
            {
                path: PATHS.HOME,
                element: <WrapperRouteComponent element={<HomePage />} title="Homepage" />,
            },
            {
                path: PATHS.POSTS,
                element: <WrapperRouteComponent element={<PostPage />} title="Posts Page" />,
            },
            {
                path: PATHS.PROFILE,
                element: <WrapperRouteComponent element={<ProfilePage />} title="Profile Page" />,
            },
            {
                path: PATHS.WALLET,
                element: <WrapperRouteComponent element={<WalletPage />} title="Wallet" />,
            },
            {
                path: PATHS.NOTIFICATION,
                element: <WrapperRouteComponent element={<NotificationPage />} title='Notification' />
            }
        ],
    },
    {
        path: PATHS.SIGNIN,
        element: <WrapperRouteComponent element={<SignInPage />} title="Signin Page" />,
    },
    {
        path: PATHS.SIGNUP,
        element: <WrapperRouteComponent element={<SignUpPage />} title="Signup Page" />,
    },
    {
        path: PATHS.FORGOT_PASSWORD,
        element: <WrapperRouteComponent element={<ForgotPasswordPage />} title="Forgot password" />,
    },
    {
        path: PATHS.CREATE_NEW_PASSWORD,
        element: <WrapperRouteComponent element={<CreateNewPasswordPage />} title="Create new password" />,
    },
    {
        path: PATHS.OTP_VERIFICATION,
        element: <WrapperRouteComponent element={<OTPVerificationPage />} title="OTP Verification" />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

const RenderRouter: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logged } = useSelector((state: RootState) => state.account);

    historyNavigation.navigate = useNavigate();
    historyNavigation.location = useLocation();

    const element = useRoutes(routes);
    return element;
};

export default RenderRouter;
