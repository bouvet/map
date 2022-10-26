import { Navigate, useLocation } from 'react-router-dom';
import { useStateSelector } from '../../../hooks/useRedux';
import { EmailConfirmation } from '../../userRegistration';

// eslint-disable-next-line no-undef
export const CheckAuthState = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, emailIsValid, isRegistering } = useStateSelector((state) => state.auth);

    const location = useLocation();

    if (!isAuthenticated && !emailIsValid && isRegistering) {
        console.log('[CheckAuth] - Navigate to confirm-code');
        return <EmailConfirmation />;
    }

    if (!isAuthenticated && emailIsValid && isRegistering && location.pathname === '/auth') {
        return <Navigate to="/register/personal-info-google" replace />;
    }

    if (isAuthenticated && location.pathname === '/auth') {
        return <Navigate to="/" replace />;
    }

    return children;
};
