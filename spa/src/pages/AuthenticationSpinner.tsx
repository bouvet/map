import { FC, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { useStateDispatch, useStateSelector } from '../hooks/useRedux';

import { googleAuthServices } from '../services/googleAuth.services';
import { userServices } from '../features/userRegistration/services/user.services';
import { authActions } from '../store/state/auth.state';
import { mapServices } from '../features/map';
import { PageContainer } from '../components/UI';

const googleState = process.env.REACT_APP_GOOGLE_STATE;

export const AuthenticationSpinner: FC = () => {
    const location = useLocation();

    const { isAuthenticated, isRegistering, emailIsValid } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();

    dispatch(mapServices.getLocations());

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const stateFromQuery = params.get('state');
        const code = params.get('code');

        if (googleState === stateFromQuery && code) {
            dispatch(googleAuthServices.authenticate(code));
        }
    }, [location, dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');
            const parsedUser = localStorage.getItem('user');
            let user: any | null = null;
            if (parsedUser) {
                user = JSON.parse(parsedUser);
            }
            if (user && token) {
                dispatch(userServices.getInfo(user.id));
            } else {
                dispatch(authActions.setLoading(false));
            }
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch]);

    useEffect(() => {
        location.state = 'Have loaded';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    if (!emailIsValid && location.state === 'Have Loaded') {
        location.state = null;
        return <Navigate replace to="/register/confirm-code" />;
    }

    if (isRegistering) {
        return <Navigate replace to="/register/personal-info-google" />;
    }

    return (
        <PageContainer>
            <CircularProgress color="primary" size={80} />
        </PageContainer>
    );
};
