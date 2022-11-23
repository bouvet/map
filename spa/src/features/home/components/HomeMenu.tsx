import React from 'react';

import styled from 'styled-components';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { authActions } from '../../../store/state/auth.state';
import { MenuButton } from './MenuButton';

interface Props {
    showMenu: boolean;
}

export const HomeMenu: React.FC<Props> = ({ showMenu }) => {
    const { isAuthenticated, isAdmin } = useStateSelector((state) => state.auth);

    const dispatch = useStateDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logOut());
    };

    return (
        <Menu>
            <ul>
                {isAuthenticated && <MenuButton endpoint="/profile" icon="person" visible={showMenu} />}
                {isAdmin && <MenuButton endpoint="/admin" icon="admin_panel_settings" visible={showMenu} />}
                <MenuButton endpoint="/add-location" icon="add" visible={showMenu} />
                {isAuthenticated && <MenuButton endpoint="/register-workout" icon="fitness_center" visible={showMenu} />}
                {isAuthenticated && <MenuButton icon="logout" visible={showMenu} onClickHandler={logoutHandler} />}
                {!isAuthenticated && <MenuButton endpoint="/login" icon="login" visible={showMenu} />}
            </ul>
        </Menu>
    );
};

const Menu = styled.nav`
    position: absolute;
    bottom: 5.7rem;
    right: 0;
    width: 5.1rem;
`;
