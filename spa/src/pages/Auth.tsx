import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useStateDispatch } from '../hooks/useRedux';
import { googleAuthServices } from '../services/googleAuth.services';
// import { mapServices } from '../features/map';
import { PageContainer } from '../components/UI';

const googleState = process.env.REACT_APP_GOOGLE_STATE;

export const Auth: FC = () => {
    const location = useLocation();

    const dispatch = useStateDispatch();

    // dispatch(mapServices.getLocations());

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const stateFromQuery = params.get('state');
        const code = params.get('code');

        if (googleState === stateFromQuery && code) {
            dispatch(googleAuthServices.authenticate(code));
        }
    }, [location, dispatch]);

    return (
        <PageContainer>
            <CircularProgress color="primary" size={80} />
        </PageContainer>
    );
};
