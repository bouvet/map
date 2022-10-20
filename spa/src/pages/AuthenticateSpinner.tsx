import { FC, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';

import { googleAuthServices } from '../services/googleAuth.services';

const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const googleState = process.env.REACT_APP_GOOGLE_STATE;

export const AuthenticateSpinner: FC = () => {
    const location = useLocation();

    const { isAuthenticated, isRegistering, emailIsValid } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const stateFromQuery = params.get('state');
        const code = params.get('code');

        if (googleState === stateFromQuery && code) {
            dispatch(googleAuthServices.authenticate(code));
        }
    }, [location, dispatch]);

    useEffect(() => {
        location.state = 'Have loaded';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    if (isRegistering) {
        return <Navigate replace to="/personal-info-google" />;
    }

    if (!emailIsValid && location.state === 'Have Loaded') {
        location.state = null;
        return <Navigate replace to="/email-confirmation" />;
    }

    return (
        <Wrapper>
            <CircularProgress color="primary" size={80} />
        </Wrapper>
    );
};
