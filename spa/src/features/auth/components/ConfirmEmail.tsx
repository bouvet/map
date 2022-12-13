import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FullPageSpinner } from '../../../components/Common';
import { useStateDispatch } from '../../../hooks';
import { userServices } from '../../../services';

const ConfirmEmail = () => {
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
                    navigate('/auth/login');
                }),
            );
        }
    }, [location, dispatch, navigate]);

    return <FullPageSpinner />;
};

export default ConfirmEmail;
