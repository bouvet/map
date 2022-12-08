import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FullPageSpinner } from '../components/UI';
import { useStateDispatch } from '../hooks';
import { userServices } from '../services';

export const ConfirmEmail = () => {
    const dispatch = useStateDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            dispatch(
                userServices.confirmEmail(() => {
                    navigate('/login');
                }),
            );
        }
    }, [location, dispatch, navigate]);

    return <FullPageSpinner />;
};
