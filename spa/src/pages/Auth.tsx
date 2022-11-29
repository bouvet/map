import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useStateDispatch, useStateSelector } from '../hooks/useRedux';
import { googleAuthServices } from '../services/googleAuth.services';
import { Main } from '../components/Layout';

const googleState = process.env.REACT_APP_GOOGLE_STATE;

export const Auth: React.FC = () => {
    const { shouldNavigate } = useStateSelector((state) => state.ui);

    const location = useLocation();
    const navigate = useNavigate();

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
        if (shouldNavigate) {
            navigate('/');
        }
    }, [shouldNavigate, navigate]);

    return (
        <Main style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" size={80} />
        </Main>
    );
};
