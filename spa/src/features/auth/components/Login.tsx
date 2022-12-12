import React from 'react';
import { Navigate } from 'react-router-dom';

import { useStateSelector } from '../../../hooks/useRedux';

import { Main, Section } from '../../../components/Layout';
import { Header } from '../../../components/Navigation';
import { GoogleLoginLink } from './GoogleLoginLink';
import { DivideLine } from './DivideLine';
import { LoginForm } from './LoginForm';

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
                    <DivideLine />
                    <LoginForm />
                </Section>
            </Main>
        </>
    );
};

export default Login;
