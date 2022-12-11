import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useStateDispatch } from '../hooks/useRedux';
import { Main } from '../components/Layout';
import { authServices } from '../services';

const googleState = process.env.REACT_APP_GOOGLE_STATE;

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useStateDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const stateFromQuery = params.get('state');
        const code = params.get('code');

        if (googleState === stateFromQuery && code) {
            dispatch(
                authServices.authenticateWithGoogle(code, (navigationUri) => {
                    navigate(navigationUri);
                }),
            );
        } else {
            navigate('/auth/login');
        }
    }, [location, dispatch, navigate]);

    return (
        <Main style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress color="primary" size={80} />
        </Main>
    );
};

export default Auth;
