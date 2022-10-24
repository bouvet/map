import { Navigate, useLocation } from 'react-router-dom';
import { useStateSelector } from '../../../hooks/useRedux';
import { AuthenticationSpinner } from '../../../pages';

// eslint-disable-next-line no-undef
export const CheckAuthState = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, loading } = useStateSelector((state) => state.auth);

    const location = useLocation();

    if (loading) {
        return <AuthenticationSpinner />;
    }

    if (!isAuthenticated && location.pathname === '/register') {
        return <Navigate to="/register/email" replace />;
    }

    if (isAuthenticated && location.pathname === '/register') {
        return <Navigate to="/" replace />;
    }

    if (isAuthenticated && location.pathname === '/auth') {
        return <Navigate to="/" replace />;
    }

    if (isAuthenticated && location.pathname === '/login') {
        return <Navigate to="/" replace />;
    }

    return children;
};
