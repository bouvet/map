import React from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Drawer } from '@mui/material';

import { MyTheme, deviceWidth } from '../../styles/global';

import { useStateDispatch, useStateSelector } from '../../hooks';
import { authActions, uiActions, userActions } from '../../store';
import { PrimaryButton } from '../Common';

export const Sidebar: React.FC = () => {
    const { showSidebar } = useStateSelector((state) => state.ui);

    const { isAdmin, isAuthenticated } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const closeSidebarHandler = () => {
        dispatch(uiActions.toggleShowSidebar());
    };

    const logoutHandler = () => {
        dispatch(authActions.logOut());
        dispatch(userActions.resetState());
        dispatch(uiActions.toggleShowSidebar());
        navigate('/');
        dispatch(uiActions.showSnackbar({ message: 'Du er logget ut', severity: 'success' }));
    };

    return (
        <Drawer anchor="right" open={showSidebar} onClose={closeSidebarHandler}>
            <nav style={{ height: '100%' }}>
                <SidebarHeader />
                <ul
                    style={{
                        height: `calc(100% - ${MyTheme.size.header.height.mobileS})`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.3rem',
                        paddingTop: '1rem',
                    }}
                >
                    {isAuthenticated && (
                        <li>
                            <NavLink
                                to="/profile"
                                className={pathname === '/profile' ? 'sidebar-link sidebar-link--active' : 'sidebar-link'}
                                onClick={closeSidebarHandler}
                            >
                                Profil
                            </NavLink>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <NavLink
                                to="/admin"
                                className={pathname === '/admin' ? 'sidebar-link sidebar-link--active' : 'sidebar-link'}
                                onClick={closeSidebarHandler}
                            >
                                Behandle lokasjoner
                            </NavLink>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <NavLink
                                to="/admin/category"
                                className={pathname === '/admin/category' ? 'sidebar-link sidebar-link--active' : 'sidebar-link'}
                                onClick={closeSidebarHandler}
                            >
                                Behandle kategorier
                            </NavLink>
                        </li>
                    )}
                    {!isAuthenticated && (
                        <li>
                            <NavLink
                                to="/auth/login"
                                className={pathname === '/auth/login' ? 'sidebar-link sidebar-link--active' : 'sidebar-link'}
                                onClick={closeSidebarHandler}
                            >
                                Logg inn
                            </NavLink>
                        </li>
                    )}

                    <li>
                        <NavLink to="/" className="sidebar-link" onClick={closeSidebarHandler}>
                            Hjem
                        </NavLink>
                    </li>
                    {isAuthenticated && (
                        <li style={{ marginBottom: '1rem', marginTop: 'auto' }}>
                            <PrimaryButton
                                className="sidebar-link sidebar-link--btn"
                                onClick={logoutHandler}
                                sx={{ textTransform: 'none', borderRadius: 0, fontSize: '1rem' }}
                            >
                                Logg ut
                            </PrimaryButton>
                        </li>
                    )}
                </ul>
            </nav>
        </Drawer>
    );
};

const SidebarHeader = styled.div`
    width: 75vw;
    height: ${MyTheme.size.header.height.mobileS};
    background-color: ${MyTheme.colors.accent};
    max-width: ${deviceWidth.mobileS};
`;
