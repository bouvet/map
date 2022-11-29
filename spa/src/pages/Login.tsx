import React from 'react';
import { Navigate } from 'react-router-dom';

import { useStateSelector } from '../hooks/useRedux';

import { Main, Section } from '../components/Layout';
import { Header, Sidebar } from '../components/Navigation';
import { DivideLine, GoogleLoginLink, LoginForm, VippsLoginLink } from '../features/login';

export const Login: React.FC = () => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Header>Verden venter... på deg!</Header>

            <Main>
                <Section>
                    <GoogleLoginLink />
                    <VippsLoginLink />
                    <DivideLine />
                    <LoginForm />
                </Section>
            </Main>

            <Sidebar />
        </>
    );
};
