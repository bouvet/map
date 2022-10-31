import { FC } from 'react';
import { useStateSelector } from '../../../hooks/useRedux';
import { AdminMenu, GuestMenu, UserMenu } from './FabButtons';

export const FabMenu: FC = () => {
    const { user } = useStateSelector((state) => state.auth);
    let userRole = '';
    user?.roles?.forEach((x) => {
        userRole = x.name;
    });

    return (
        <>
            {userRole === '' && <GuestMenu />}
            {userRole === 'User' && <UserMenu />}
            {userRole === 'Administrator' && <AdminMenu />}
        </>
    );
};
