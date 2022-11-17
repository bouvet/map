import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomizedSnackbars } from './components/Snackbar/Snackbar';
import { PageContainer } from './components/UI';
import { userServices } from './features/userRegistration/services/user.services';
import { useStateDispatch } from './hooks/useRedux';
import { authActions } from './store/state/auth.state';

export const App = () => {
    const dispatch = useStateDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');
            const parsedUser = localStorage.getItem('user');
            let user: any | null = null;
            if (parsedUser) {
                user = JSON.parse(parsedUser);
            }
            if (user && token) {
                dispatch(userServices.getInfo(user.id));
            } else {
                dispatch(authActions.setLoading(false));
            }
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch]);
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
        return () => {
            document.body.style.overflowX = 'auto';
        };
    }, []);

    return (
        <PageContainer>
            <Outlet />
            <CustomizedSnackbars />
        </PageContainer>
    );
};
