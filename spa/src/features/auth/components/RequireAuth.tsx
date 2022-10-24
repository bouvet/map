import { Navigate } from 'react-router-dom';
import { useStateSelector } from '../../../hooks/useRedux';

// eslint-disable-next-line no-undef
export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useStateSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};
