import { Navigate, Outlet } from 'react-router-dom';
import { useStateSelector } from '../../../hooks/useRedux';

export const RequireAuth = () => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
