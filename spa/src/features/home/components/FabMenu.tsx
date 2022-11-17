import { FC } from 'react';
import { useStateSelector } from '../../../hooks/useRedux';
import { AdminMenu, GuestMenu, UserMenu } from './FabButtons';

export const FabMenu: FC = () => {
    const { isAuthenticated, isAdmin } = useStateSelector((state) => state.auth);

    return (
        <>
            {!isAuthenticated && <GuestMenu />}
            {isAuthenticated && <UserMenu />}
            {isAdmin && <AdminMenu />}
        </>
    );
};
