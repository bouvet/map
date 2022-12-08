import { Navigate, Outlet } from 'react-router-dom';
import { useStateSelector } from '../hooks';

export const Profile = () => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};
