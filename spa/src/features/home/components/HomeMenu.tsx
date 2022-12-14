import React from 'react';

import styled from 'styled-components';
import { useStateDispatch, useStateSelector } from '../../../hooks/useRedux';
import { userActions } from '../../../store';
import { authActions } from '../../../store/state/auth.state';
import { FabSubMenuButton } from './FabSubMenuButton';

interface Props {
    showMenu: boolean;
}

export const HomeMenu: React.FC<Props> = ({ showMenu }) => {
    const { isAuthenticated, isAdmin } = useStateSelector((state) => state.auth);

    const dispatch = useStateDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logOut());
        dispatch(userActions.resetState());
    };

    return (
        <Menu>
            <ul>
                {isAuthenticated && <FabSubMenuButton endpoint="/profile" icon="person" visible={showMenu} />}
                {isAdmin && <FabSubMenuButton endpoint="/admin" icon="admin_panel_settings" visible={showMenu} />}
                <FabSubMenuButton endpoint="/add-location" icon="add_location_alt" visible={showMenu} />
                {isAuthenticated && <FabSubMenuButton endpoint="/my-sessions" icon="fitness_center" visible={showMenu} />}
                {isAuthenticated && <FabSubMenuButton icon="logout" visible={showMenu} onClickHandler={logoutHandler} />}
                {!isAuthenticated && <FabSubMenuButton endpoint="/auth/login" icon="login" visible={showMenu} />}
            </ul>
        </Menu>
    );
};

const Menu = styled.nav`
    position: absolute;
    bottom: 5.7rem;
    right: 0;
    width: 56px;
`;
