import { FC, useEffect, useState } from 'react';
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

const state = process.env.REACT_APP_GOOGLE_STATE;

export const AuthenticateSpinner: FC = () => {
    const [canceled, setCanceled] = useState(false);
    const location = useLocation();

    const { isAuthenticated, isRegistrering } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.hash);

        const stateFromQuery = location.hash.split('&')[0].split('=')[1];
        const accessToken = params.get('access_token');

        if (stateFromQuery === 'access_denied') {
            setCanceled(true);
        }

        if (state === stateFromQuery && accessToken) {
            dispatch(googleAuthServices.getUserInfo(accessToken));
        }
    }, [location, dispatch]);

    if (canceled) {
        return <Navigate replace to="/login" />;
    }

    if (isRegistrering) {
        return <Navigate replace to="/personal-info" />;
    }

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <Wrapper>
            <CircularProgress color="primary" size={80} />
        </Wrapper>
    );
};
