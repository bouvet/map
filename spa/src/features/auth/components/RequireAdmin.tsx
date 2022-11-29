import { Navigate, Outlet } from 'react-router-dom';
import { useStateSelector } from '../../../hooks/useRedux';

export const RequireAdmin = () => {
    const { isAdmin } = useStateSelector((state) => state.auth);

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
