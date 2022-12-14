import React from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Drawer } from '@mui/material';

import { MyTheme, deviceWidth } from '../../styles/global';

import { useStateDispatch, useStateSelector } from '../../hooks';
import { authActions, uiActions, userActions } from '../../store';
import { PrimaryButton } from '../Common';
import { sleep } from '../../utils';

export const Sidebar: React.FC = () => {
    const { showSidebar } = useStateSelector((state) => state.ui);

    const { isAdmin, isAuthenticated } = useStateSelector((state) => state.auth);
    const dispatch = useStateDispatch();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const closeSidebarHandler = async () => {
        await sleep(100);
        dispatch(uiActions.setShowSidebar(false));
    };

    const logoutHandler = () => {
        dispatch(authActions.logOut());
        dispatch(userActions.resetState());
        dispatch(uiActions.setShowSidebar(false));
        navigate('/');
        dispatch(uiActions.showSnackbar({ message: 'Du er logget ut', severity: 'success' }));
    };

    return (
        <Drawer anchor="right" open={showSidebar}>
            <nav style={{ height: '100%' }}>
                <SidebarHeader>Verden Venter</SidebarHeader>
                <ul
                    style={{
                        height: `calc(100% - 3rem)`,
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

                    <li>
                        <NavLink
                            to="/add-location"
                            className={pathname === '/add-location' ? 'sidebar-link sidebar-link--active' : 'sidebar-link'}
                            onClick={closeSidebarHandler}
                        >
                            Legg til lokasjon
                        </NavLink>
                    </li>

                    {isAdmin && (
                        <>
                            <li>
                                <NavLink
                                    to="/admin"
                                    className={pathname === '/admin' ? 'sidebar-link sidebar-link--active' : 'sidebar-link'}
                                    onClick={closeSidebarHandler}
                                >
                                    Behandle lokasjoner
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/category"
                                    className={pathname === '/admin/category' ? 'sidebar-link sidebar-link--active' : 'sidebar-link'}
                                    onClick={closeSidebarHandler}
                                >
                                    Behandle kategorier
                                </NavLink>
                            </li>
                        </>
                    )}

                    <li>
                        <NavLink to="/" className="sidebar-link" onClick={closeSidebarHandler}>
                            Hjem
                        </NavLink>
                    </li>

                    {!isAuthenticated && (
                        <li style={{ marginBottom: '1rem', marginTop: 'auto' }}>
                            <NavLink to="/auth/login" onClick={closeSidebarHandler}>
                                <PrimaryButton
                                    className="sidebar-link sidebar-link--btn"
                                    sx={{ textTransform: 'none', borderRadius: 0, fontSize: '1rem' }}
                                >
                                    Logg inn
                                </PrimaryButton>
                            </NavLink>
                        </li>
                    )}
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
    height: 3rem;
    background-color: ${MyTheme.colors.accent};
    color: ${MyTheme.colors.lightBase};
    max-width: ${deviceWidth.mobileS};
    padding: 0 1rem;
    display: flex;
    align-items: center;
`;
