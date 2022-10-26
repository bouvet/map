import { FC } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useStateSelector } from '../hooks/useRedux';
import { DivideLine, GoogleLoginLink, LoginForm, VippsLoginLink } from '../features/login';
import { PageContainer, SectionContainer, PageTitle, PageSubtitle, BackButton } from '../components/UI';

export const Login: FC = () => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <SectionContainer>
            <BackButton onClick={() => navigate('/')} />
            <PageTitle>Login</PageTitle>
            <PageSubtitle>Verden venter... på deg!</PageSubtitle>
            <GoogleLoginLink />
            <VippsLoginLink />
            <DivideLine />
            <LoginForm />
        </SectionContainer>
    );
};
