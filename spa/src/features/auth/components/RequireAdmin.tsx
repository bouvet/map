import { Navigate } from 'react-router-dom';
import { useStateSelector } from '../../../hooks/useRedux';

// eslint-disable-next-line no-undef
export const RequireAdmin = ({ children }: { children: JSX.Element }) => {
    const { isAdmin } = useStateSelector((state) => state.auth);

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};
