import { useEffect } from 'react';
import Moment from 'react-moment';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Navigation';
import { CustomizedSnackbars } from './components/Snackbar/Snackbar';
import { useStateDispatch } from './hooks/useRedux';
import { userServices } from './services';
import { authActions } from './store/state/auth.state';

Moment.globalLocale = 'no';
Moment.globalFormat = 'DD.MM.YYYY';

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

    return (
        <>
            <Outlet />
            <Sidebar />
            <CustomizedSnackbars />
        </>
    );
};
